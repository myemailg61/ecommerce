import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProdEdit = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()
    const [pic, setPic] = useState(null)

    useEffect(() => {
        const getData = async () => {

            try {
                const res = await axios.get(`http://localhost:8000/admin/editProduct/${id}`)

                if (res.status == 200) {
                    console.log(res.data, " edit")

                    let dim = JSON.parse(res.data[0].dimensions)
                    let opt = JSON.parse(res.data[0].options)
                    let faqs = JSON.parse(res.data[0].faq)

                    res.data[0].dimensions = dim
                    res.data[0].options = opt
                    res.data[0].faq = faqs
                    setPic(res.data[0].prodImages)
                    setData(res.data[0])
                    //let dim = res.data[0].dimensions
                    //setDimensions(JSON.parse(dim))

                }

            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }


        }

        getData()
    }, [])

    const chgHnd1 = (e) => {
        const { name, value } = e.target;
        console.log(name, value, " chg")

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const nestedChgHnd1 = (subKey, value) => {
        setData(prevState => ({
            ...prevState,
            dimensions: {
                ...prevState.dimensions,
                [subKey]: value,
            }
        }))
    }

    const handleInputChg = (index, e) => {
        const { name, value } = e.target
        console.log(name, value, " chg")
        const newFaq = data.faq
        newFaq[index][name] = value;
        setData(prevData => ({
            ...prevData,
            faq: [...newFaq]
        }))
    }

    const removeFAQ = (index) => {
        const newFaqs = data.faq.filter((_, i) => i != index)

        setData(prevData => ({
            ...prevData,
            faq: [...newFaqs]
        }))
    }

    const addFAQ = () => {
        setData(prevData => ({
            ...prevData,
            faq: [
                ...prevData.faq,
                { question: "", answer: "" }
            ]
        }))
    }

    const productImageHnd = (e) => {
        const { name } = e.target
        setData(prevData => ({
            ...prevData,
            [name]: e.target.files
        }))
        //console.log(e.target.files)
    }

    const optionChgHnd = (index, e) => {
        const { name, value } = e.target
        const newOptions = data.options
        newOptions[index][name] = value

        setData(prevData => ({
            ...prevData,
            options: [...newOptions]
        }))
    }

    const removeOption = (index) => {
        const opt = data.options.filter((_, i) => i != index)

        setData(prevData => ({
            ...prevData,
            options: [...opt]
        }))
    }

    const addOption = () => {
        let opt = data.options
        let newOpt = [...opt, { name: "", price: "", quantity: "", stock: "", weight: "" }]

        setData(prevData => ({
            ...prevData,
            options: [...newOpt]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data, " sbt")

        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('category', data.category)
        formData.append('subCategory1', data.subCategory1)
        formData.append('subCategory2', data.subCategory2)
        formData.append('price', data.price)
        formData.append('manufacturerName', data.manufacturerName)
        formData.append('description', data.description)
        formData.append('quantity', data.quantity)
        formData.append('gst', data.gst)
        formData.append('minPurchase', data.minPurchase)
        formData.append('docLinks', data.docLinks)
        formData.append('location', data.location)
        formData.append('shipping', data.shipping)
        formData.append('prodWeight', data.prodWeight)
        formData.append('oldPics', data.prodImages)

        // Append each property of the dimensions object
        Object.entries(data.dimensions).forEach(([key, value]) => {
            formData.append(`dimensions[${key}]`, value);
        });
        // formdata.append('faq', formData.faq)
        data?.faq.forEach((faq, index) => {
            formData.append(`faqs[${index}][question]`, faq.question);
            formData.append(`faqs[${index}][answer]`, faq.answer);
        });

        //options
        data?.options.forEach((option, index) => {
            formData.append(`options[${index}][name]`, option.name);
            formData.append(`options[${index}][quantity]`, option.quantity);
            formData.append(`options[${index}][stock]`, option.stock);
            formData.append(`options[${index}][price]`, option.price);
            formData.append(`options[${index}][weight]`, option.weight);
        });
        //   imgs
        for (let i = 0; i < data.prodImages?.length; i++) {
            formData.append('prodImages', data.prodImages[i]);
        }


        try {
            const res = await axios.post("http://localhost:8000/admin/editProductData", formData)
            console.log(res.data)

        } catch (err) {
            console.log(err)
        }

    }

    if (isLoading) {
        return <p className='mt-20 font-font1 text-center text-2xl font-semibold'>Loading...</p>
    }

    return (
        <div className='mt-20 mb-8'>
            <p className='font-font1 text-2xl font-semibold text-center'>Edit: {data.name} </p>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col font-font1 mx-4 mt-8'>
                        <div className='flex flex-row justify-start gap-12'>
                            <section>
                                <label className='mr-4'>Name:</label>
                                <input onChange={chgHnd1} name='name' type='text' defaultValue={data.name}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Category:</label>
                                <input onChange={chgHnd1} name='category' type='text' defaultValue={data.category}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Sub Category 1:</label>
                                <input onChange={chgHnd1} name='subCategory1' type='text' defaultValue={data.subCategory1}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>
                        </div>

                        {/* line 2 */}
                        <div className='mt-8 flex flex-row justify-start gap-12'>
                            <section>
                                <label className='mr-4'>Sub Category 2:</label>
                                <input onChange={chgHnd1} name='subCategory2' type='text' defaultValue={data.subCategory2}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Price:</label>
                                <input onChange={chgHnd1} name='price' type='text' defaultValue={data.price}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Manufacturer Name:</label>
                                <input onChange={chgHnd1} name='manufacturerName' type='text' defaultValue={data.manufacturerName}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>
                        </div>

                        {/* line 3 */}
                        <div className='mt-8 flex flex-row justify-start gap-12'>
                            <section>
                                <label className='mr-4'>Quantity:</label>
                                <input onChange={chgHnd1} name='quantity' type='number' defaultValue={data.quantity}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Location:</label>
                                <input onChange={chgHnd1} name='location' type='text' defaultValue={data.location}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Shipping:</label>
                                <input onChange={chgHnd1} name='shipping' type='text' defaultValue={data.shipping}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>
                        </div>

                        {/* line 4 */}
                        <div className='mt-8 flex flex-row justify-start gap-12'>
                            <section>
                                <label className='mr-4'>Product Weight:</label>
                                <input onChange={chgHnd1} name='prodWeight' type='number' defaultValue={data.prodWeight}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>GST:</label>
                                <input onChange={chgHnd1} name='gst' type='text' defaultValue={data.gst}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>minPurchase:</label>
                                <input onChange={chgHnd1} name='minPurchase' type='text' defaultValue={data.minPurchase}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>
                        </div>

                        {/* line 5 */}
                        <div className='mt-8 flex flex-row justify-start gap-12'>
                            <section>
                                <label className='mr-4'>Featured:</label>
                                <input onChange={chgHnd1} name='featured' type='number' defaultValue={data.featured}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Enabled:</label>
                                <input onChange={chgHnd1} name='active' type='text' defaultValue={data.active}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Dimensions (length):</label>
                                <input onChange={(e) => { nestedChgHnd1('length', e.target.value) }} name='length' type='text' defaultValue={data.dimensions?.length}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>


                        </div>

                        {/* line 6 */}
                        <div className='mt-8 flex flex-row justify-start gap-12'>
                            <section>
                                <label className='mr-4'>Dimensions (breadth):</label>
                                <input onChange={(e) => { nestedChgHnd1('breadth', e.target.value) }} name='breadth' type='number' defaultValue={data.dimensions?.breadth}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>

                            <section>
                                <label className='mr-4'>Dimensions (height):</label>
                                <input onChange={(e) => { nestedChgHnd1('height', e.target.value) }} name='height' type='text' defaultValue={data.dimensions?.height}
                                    className='border border-solid text-lg border-gray-500 rounded-md px-2'></input>
                            </section>


                        </div>
                        <hr className='border-t-2 mt-8 border-black'></hr>

                        {/* line 1 */}
                        <p className='font-font1 text-center text-2xl mt-1 font-semibold'>FAQs</p>
                        <div className='mt-8 flex flex-col justify-start gap-12'>
                            {data?.faq.map((item, index) => {
                                return <div className='flex flex-row justify-center'>
                                    <input name='question' defaultValue={item.question} onChange={(e) => { handleInputChg(index, e) }} className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4'></input>
                                    <input name='answer' defaultValue={item.answer} onChange={(e) => { handleInputChg(index, e) }} className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4'></input>
                                    <button onClick={() => { removeFAQ(index) }} type='button' className='bg-red-500 mr-4 py-2 px-2 rounded-md'>Remove</button>
                                    <button onClick={addFAQ} type='button' className='bg-green-500 py-2 px-2 rounded-md'>Add</button>
                                </div>
                            })}


                        </div>

                        <hr className='border-t-2 mt-8 border-black'></hr>
                        {/* doc links */}
                        <p className='font-font1 text-center text-2xl mt-1 font-semibold'>Product Images</p>

                        <div>
                            <div className='w-full flex flex-row justify-center'>
                                {pic?.split(",")?.map((pic, index) => {
                                    return <div key={index} className='h-40 w-40 bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${pic})` }}></div>

                                })}

                            </div>
                            <div className='flex flex-row justify-center mt-4'>
                                <label className="font-semibold mb-1 mr-4 font-font1" htmlFor="productImage">Add Product Images</label>
                                <input
                                    onChange={productImageHnd}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    name="prodImages"
                                />
                            </div>
                        </div>

                        {/* options */}
                        <hr className='border-t-2 mt-8 border-black'></hr>
                        <p className='font-font1 text-center text-2xl mt-1 font-semibold'>Options</p>

                        <div>
                            {data.options.map((item, index) => {
                                return <div key={index} >
                                    <div className='flex flex-row '>
                                        <input onChange={(e) => optionChgHnd(index, e)} type='text' name='name' placeholder='name' className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4 font-font1' defaultValue={item.name}></input>
                                        <input onChange={(e) => optionChgHnd(index, e)} type='text' name='price' placeholder='price' className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4 font-font1' defaultValue={item.price}></input>
                                        <input onChange={(e) => optionChgHnd(index, e)} type='text' name='quantity' placeholder='quantity' className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4 font-font1' defaultValue={item.quantity}></input>
                                        <input onChange={(e) => optionChgHnd(index, e)} type='text' name='stock' placeholder='stock' className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4 font-font1' defaultValue={item.stock}></input>
                                        <input onChange={(e) => optionChgHnd(index, e)} type='text' name='weight' placeholder='weight' className='border border-solid text-lg border-gray-500 rounded-md px-2 mr-4 font-font1' defaultValue={item.weight}></input>
                                    </div>
                                    <div className='flex flex-row mt-2 justify-center mb-8'>
                                        <button onClick={() => { removeOption(index) }} type='button' className='bg-red-500 mr-4 py-2 px-2 rounded-md'>Remove</button>
                                        <button onClick={addOption} type='button' className='bg-green-500 py-2 px-2 rounded-md'>Add</button>
                                    </div>
                                </div>
                            })}
                        </div>


                    </div>

                    <button className='bg-green-700 mx-auto block mt-12 px-12 text-white font-font1 text-xl font-semibold py-3 rounded-md hover:bg-green-800'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default ProdEdit;