import express from 'express'
import jwt from 'jsonwebtoken'


import {
    login2F, getBannerF, getCategoryF, getSubCatF,
    prodDetailsF, featuredPF, addToCartF
} from '../controllers/user.js';

const app = express.Router();

const JWT_SECRET = 'secrET_ly@11';

const verifyUser = (req, res, next) => {
    // const token = req.headers['token']
    const token = req.cookies.token;
    console.log(token, " tknUser")

    if (!token) {
        return res.status(403).send({ message: "No token Provided" })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        console.log(decoded, " middleware")
        console.log(decoded.id, " middle id")
        req.cid = decoded.id;
        next();
    });
}


app.post('/login2', login2F)

app.get('/getBanner', getBannerF)

app.get('/getCategory', getCategoryF)

app.get('/getSubCat', getSubCatF)

app.get('/prodDetails/:id', prodDetailsF)

app.get("/featuredP", featuredPF)

app.post('/addToCart', verifyUser, addToCartF)



export default app;