import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import bin from '../../components/asset/bin.png'

const ProductsList = () => {
    const [data, setData] = useState()
    const [dummy, setDummy] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/getProducts')
                console.log(res.data)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }

        }

        getData()
    }, [dummy])

    const featureHnd = async (id, num) => {

        try {
            const res = await axios.post("http://localhost:8000/admin/chgFeatured", { id, num })
            if (res.status == 200) {
                setDummy(!dummy)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const activateHnd = async (id, num) => {
        try {
            const res = await axios.post("http://localhost:8000/admin/chgActive", { id, num })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='mt-4'>
            <p className='text-center font-font1 text-xl font-semibold mb-2'>Products List</p>

            <div className='flex flex-row justify-center gap-4 flex-wrap'>
                {data?.map((product, index) => {
                    return <div key={index} className='border border-solid border-gray-400 py-4 px-4 rounded-xl'>
                        <button className='mx-auto block font-font1 mb-2 rounded px-2  hover:bg-rose-200'>
                            <img src={bin} className='w-6'></img>
                        </button>

                        <p className='font-font1 font-medium text-center'>Name: {product.name}</p>
                        <p className='font-font1 font-medium text-center'>Price: {product.price}</p>
                        <p className='font-font1 font-medium text-center'>Quantity: {product.quantity}</p>

                        <div className='flex flex-row justify-center gap-2'>
                            <Link to={`/productEdit/${product.id}`}><button className='bg-rose-300 font-font1 py-2 rounded px-4 hover:bg-rose-500'>Edit</button></Link>
                            <button onClick={() => { activateHnd(product.id, product.active) }} className={`${product.active == '0' ? 'bg-rose-300' : 'bg-rose-500'} font-font1 py-2 rounded px-4 hover:bg-rose-500`}>{product.active == '0' ? 'Enable' : 'Disable'}</button>
                            <button onClick={() => { featureHnd(product.id, product.featured) }} className={`${product.featured === '1' ? "bg-rose-500" : "bg-rose-300"} font-font1 py-2 rounded px-4 hover:bg-rose-500`}>{product.featured === '1' ? 'unFeature' : "Featured"}</button>

                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ProductsList