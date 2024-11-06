import React from 'react'
import blue from '../asset/blue2.jpg'

const ValueCard = ({ title, txt }) => {
    return (
        <div className='pb-4 w-3/12 rounded-xl bg-cover bg-center mx-2'
            style={{ backgroundImage: `url(${blue})` }}>
            <p className='text-white my-4 font-font1 text-center text-2xl font-semibold'>{title}</p>
            <p className='text-white text-justify text-lg font-font1 mx-4'>{txt}</p>
        </div>
    )
}

export default ValueCard