import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
    const cartItem = useSelector(state => state.cart)
    const totalPrice = cartItem.map(item => Number(item.price)).reduce((acc, item) => acc + item)

    const minusHnd = (item) => {
        console.log(item, "minus")
    }

    const plusHnd = () => { }

    return (
        <div className='mt-24 mb-20'>
            <p className='mb-4 font-font1 text-center text-xl font-medium'>My Cart</p>

            <div className='flex flex-row gap-4 bg-gray-100'>
                <div className='w-7/12'>
                    {cartItem.map((item, index) => {
                        return <div key={index} className='bg-white flex flex-row gap-4  border border-solid border-gray-300 rounded-md mb-4'>
                            <div className='w-3/12 h-32 my-2'>
                                <div className='h-full w-full transform transition-transform duration-300 hover:scale-110 bg-cover bg-center' style={{ backgroundImage: `url(http://localhost:8000/banner/${item.prodImages})` }}></div>
                            </div>
                            <div>
                                <p className='font-font1 text-xl '>{item.name}</p>
                                <p className='font-font1 text-xl font-medium'>Rs. {item.price}</p>

                                <div>
                                    <div className='flex flex-row gap-2'>
                                        <button onClick={() => { minusHnd(item) }} className='font-medium w-8 h-8 rounded-full border border-solid border-gray-400'>-</button>
                                        <input min={1} readOnly defaultValue={item.quantity} className='border border-solid border-gray-400 w-12 text-center'></input>
                                        <button onClick={plusHnd} className='font-medium w-8 h-8 rounded-full border border-solid border-gray-400'>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {/* cards div */}

                {/* total div */}

                <div className='w-4/12 bg-white rounded-md font-font1 border border-solid border-gray-300 shadow'>
                    <p className='text-xl text-gray-600 font-medium m-4'>Price Details</p>
                    <p className='ml-4 text-xl font-medium'>Total Amount: Rs.{totalPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default Cart;