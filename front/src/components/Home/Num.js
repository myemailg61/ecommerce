import React from 'react'
import power from '../asset/power.png'

const Num = () => {
    return (
        <div className='mt-16 text-white bg-blue-900 py-8'>
            <div className='flex flex-row justify-center gap-24'>
                <div className=' border-solid border-blue-200 border-4 px-4 py-4'>
                    <p className='font-font1 text-center'><span className='text-9xl font-semibold'>25</span> YEARS</p>
                    <p className='font-font1 text-center text-2xl'>Leading The Way Ahead</p>
                </div>
                <div>
                    <img src={power} className='w-16 mb-4 mx-auto block'></img>
                    <p className='font-font1 text-center text-5xl font-semibold'>450+</p>
                    <p className='font-font1 text-center text-xl'>Clients</p>
                </div>
                <div>
                    <img src={power} className='w-16 mb-4 mx-auto block'></img>
                    <p className='font-font1 text-center text-5xl font-semibold'>500+</p>
                    <p className='font-font1 text-center text-xl'>Range Of Products</p>
                </div>
                <div>
                    <img src={power} className='w-16 mb-4 mx-auto block'></img>
                    <p className='font-font1 text-center text-5xl font-semibold'>90% +</p>
                    <p className='font-font1 text-center text-xl'>Customer Satisfaction</p>
                </div>
            </div>
        </div>
    )
}

export default Num