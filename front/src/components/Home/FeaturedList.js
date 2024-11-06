import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { getFeaturedProducts } from '../../redux/slices/featuredSlice';

const FeaturedList = () => {
    //const [data, setData] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()
    const { data } = useSelector(state => state.featuredProducts)

    const updatedData = data?.map((product => ({
        ...product,
        quantity: 1
    })))
    console.log(updatedData, "fProd")

    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = () => {

            //dispatch an action to fetch prod
            dispatch(getFeaturedProducts())


            // try {
            //     const res = await axios.get("http://localhost:8000/user/featuredP")
            //     console.log(res.data)
            //     setData(res.data)
            // } catch (err) {
            //     console.log(err)
            // }

        }

        getProducts()
    }, [])

    const cardClkHnd = (id) => {
        navigate(`/details/${id}`)
    }

    const cartHnd = async (item) => {
        //const tkn = localStorage.getItem('token')

        const tkn = Cookies.get('token2')


        if (!tkn) {
            navigate('/login')
        } else {
            setIsSubmitting(true)
            dispatch(addToCart(item))
            try {
                const res = await axios.post("http://localhost:8000/user/addToCart", {
                    productId: item.id
                }, { withCredentials: true })

                if (res.status == 200) {
                    setIsSubmitting(false)
                    alert("Product added to cart")
                }

            } catch (err) {
                setIsSubmitting(false)
                alert(`${err.message}`)
                console.log(err)
            }

        }
    }

    return (
        <div className='mt-2'>
            <p className='text-center font-font1 text-3xl font-semibold'>Featured Products</p>

            <div className='flex flex-row justify-center gap-4 flex-wrap'>
                {updatedData?.map((item, index) => {
                    return <div key={index} className='mt-4 w-3/12 border border-solid border-gray-300 py-4 shadow-lg px-8 rounded-lg hover:shadow-xl hover:bg-sky-100'>
                        <div onClick={() => { cardClkHnd(item.id) }} className='w-full h-32'>
                            <div className='h-full w-full transform transition-transform duration-300 hover:scale-110 bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${item.prodImages})` }}></div>
                        </div>
                        <div onClick={() => { cardClkHnd(item.id) }}>
                            <p className='mt-2 font-font1 text-lg text-center font-semibold'>{item.name}</p>
                            <p className='font-font1 mb-2 text-lg text-center font-medium'>price:{item.price}.00</p>
                        </div>

                        <div className='flex  flex-row justify-center'>
                            <button disabled={isSubmitting} onClick={() => { cartHnd(item) }} className='font-font1 text-lg bg-rose-300 py-2 px-4 font-medium rounded-md hover:bg-rose-500'>{isSubmitting ? "Wait..." : "Add To Cart"}</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default FeaturedList;