import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FeaturedList = () => {
    const [data, setData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getFeaturedProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/user/featuredP")
                console.log(res.data)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }

        }

        getFeaturedProducts()
    }, [])

    const cardClkHnd = (id) => {
        navigate(`/details/${id}`)
    }

    return (
        <div>
            <p className='text-center font-font1 text-3xl font-semibold'>Featured Products</p>

            <div className='flex flex-row  justify-center gap-4 flex-wrap'>
                {data?.map((item, index) => {
                    return <div key={index} onClick={() => { cardClkHnd(item.id) }} className='mt-4 w-3/12 border border-solid border-gray-300 py-4 px-8 rounded-lg'>
                        <div className='w-full h-32'>
                            <div className='h-full w-full transform transition-transform duration-300 hover:scale-110 bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${item.prodImages})` }}></div>
                        </div>
                        <p className='mt-2 font-font1 text-lg text-center font-semibold'>{item.name}</p>
                        <p className='font-font1 mb-2 text-lg text-center font-medium'>price:{item.price}.00</p>

                        <div className='flex  flex-row justify-center'>
                            <button className='font-font1 text-lg bg-rose-300 py-2 px-4 font-medium rounded-md hover:bg-rose-500'>Add To Cart</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default FeaturedList;