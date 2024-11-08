import mysql from 'mysql'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sun"
})

const bannerF = (req, res) => {
    const q = "SELECT * FROM banner WHERE status=1"

    db.query(q, (err, data) => {
        if (err) {
            res.status(400).send('error')
            console.log(err)
        } else {
            res.status(200).send(data)
        }

    })
}

const postBannerF = (req, res) => {
    if (!req.files || !req.files['profile']) {
        return res.status(400).send('No files were uploaded.');
    }
    const value = [req.files['profile'].map((file) => file.filename).join(','),]

    const q = "INSERT INTO banner (`name`) VALUES (?)"

    db.query(q, [value], (err, data) => {
        if (err) {
            res.status(400).send('Network error')
        } else {
            //console.log(data)
            res.status(200).send('success')
        }
    })
}

const newProductF = (req, res) => {
    const {
        productName, productCategory, productSubCategory1, productSubCategory2,
        price, manufacturerName, description, quantity, gst, minPurchase, documentLinks,
        location, shipping, weight, dimensions, faqs, options
    } = req.body;

    if (
        !productName || !productCategory || !productSubCategory1 || !productSubCategory2 ||
        price === undefined || !manufacturerName || !description ||
        quantity === undefined || gst === undefined || minPurchase === undefined ||
        !documentLinks || !location || !shipping ||
        weight === undefined || dimensions === undefined || !faqs || !options
    ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const productImgs = req.files['prodImg'].map((file) => file.filename).join(',')
    const faqStr = Array.isArray(faqs) || typeof faqs === 'object' ? JSON.stringify(faqs) : faqs;
    const optionsStr = Array.isArray(options) || typeof options === 'object' ? JSON.stringify(options) : options;
    const dimensionStr = JSON.stringify(dimensions)


    // Prepare the values array
    const values = [
        productName,
        productCategory,
        productSubCategory1,
        productSubCategory2,
        price,
        manufacturerName,
        documentLinks,
        description,
        quantity,
        location,
        shipping,
        weight,
        dimensionStr,
        gst,
        minPurchase,
        productImgs,
        faqStr,
        optionsStr
    ];

    //console.log(values, " newVal")

    // Use individual placeholders for each value
    const q = "INSERT INTO products (`name`, `category`, `subCategory1`,`subCategory2`,`price`,`manufacturerName`,`docLinks`,`description`,`quantity`,`location`,`shipping`,`prodWeight`,`dimensions`,`gst`,`minPurchase`,`prodImages`, `faq`,`options`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log(data);
            res.status(201).send("success");
        }
    });

};

const editProductDataF = (req, res) => {
    const { id, name, category, subCategory1, subCategory2, price, manufacturerName, description,
        quantity, gst, minPurchase, docLinks, location, shipping, prodWeight, dimensions,
        faqs, options, oldPics
    } = req.body

    const productImgs = req.files['prodImages']?.map((file) => file.filename).join(',')
    const faqStr = Array.isArray(faqs) || typeof faqs === 'object' ? JSON.stringify(faqs) : faqs;
    const optionsStr = Array.isArray(options) || typeof options === 'object' ? JSON.stringify(options) : options;
    const dimensionStr = JSON.stringify(dimensions);

    const pics = productImgs ? productImgs : oldPics

    const values = [
        name,
        category,
        subCategory1,
        subCategory2,
        price,
        manufacturerName,
        docLinks,
        description,
        quantity,
        location,
        shipping,
        prodWeight,
        dimensionStr,
        gst,
        minPurchase,
        pics,
        faqStr,
        optionsStr,
    ]

    const q = "UPDATE products SET `name`=?,`category`=?,`subCategory1`=?,`subCategory2`=?,`price`=?,`manufacturerName`=?,`docLinks`=?,`description`=?,`quantity`=?,`location`=?,`shipping`=?,`prodWeight`=?,`dimensions`=?,`gst`=?,`minPurchase`=?,`prodImages`=?,`faq`=?,`options`=? WHERE id=?";

    db.query(q, [...values, id], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({ error: err.message })
        } else {
            console.log(data)
            res.status(200).send("success")
        }
    })

    console.log(values, " editProd")

}



const getProductsF = (req, res) => {
    const q = "SELECT * FROM products"
    // const q = "WITH Subcategories AS (SELECT category,subCategory1,subCategory2 FROM products ORDER BY category, subCategory1, subCategory2) SELECT category,GROUP_CONCAT(DISTINCT subCategory1 ORDER BY subCategory1 SEPARATOR ', ') AS subCategories1,GROUP_CONCAT(DISTINCT subCategory2 ORDER BY subCategory2 SEPARATOR ', ') AS subCategories2 FROM Subcategories GROUP BY category";


    db.query(q, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send("internal server error")
        } else {
            console.log(data, " getP")
            res.status(200).send(data)
        }
    })
};

const chgFeaturedF = (req, res) => {
    const { id, num } = req.body
    const featuredValue = num == 1 ? '0' : '1'
    const q = "UPDATE products SET `featured`=? WHERE id=?"


    db.query(q, [featuredValue, id], (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message: "success" })
        }
    })

};

const chgActiveF = (req, res) => {
    const { id, num } = req.body
    const activeValue = num == 1 ? '0' : '1'
    const q = "UPDATE products SET `active`=? WHERE id=?"

    db.query(q, [activeValue, id], (err, data) => {
        if (err) {
            console.log(err)
            //res.status(500).send({message:err.message})
        } else {
            console.log(data)
            //res.status(200).send({message:"success"})
        }
    })
};


const editProductF = (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM products WHERE id=?"

    db.query(q, [id], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send(data)
        }
    })

    console.log(id, " edit")
};






export {
    bannerF, postBannerF, newProductF, getProductsF, chgFeaturedF,
    chgActiveF, editProductF, editProductDataF
}