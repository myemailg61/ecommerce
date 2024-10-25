import React, { useState } from 'react'

const ContactPage = () => {
    const [data, setData] = useState({
        name: "",
        mobile: "",
        email: "",
        message: "",
    })

    const hndSubmit = (e) => {
        e.preventDefault();

        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-16 mb-16'>
            <p className='text-center mt-24 text-4xl font-font1 font-semibold'>Get In Touch</p>

            <p className='ml-8 mt-12 font-font1 text-2xl font-semibold'>Write us a letter</p>
            <p className='ml-8 mb-8 font-font1 text-lg'>We’d Love to Hear from You!</p>

            <div className='flex flex-row justify-center gap-20 mx-8'>
                <div className='flex-1'>


                    <form onSubmit={hndSubmit} className='flex flex-col'>
                        <input type='text' placeholder='Name' className='border border-solid border-gray-400 mb-8 h-12 pl-4 rounded'></input>
                        <input type='number' placeholder='Mobile' className='border border-solid border-gray-400 mb-8 h-12 pl-4 rounded'></input>
                        <input type='email' placeholder='Email' className='border border-solid border-gray-400 mb-8 h-12 pl-4 rounded'></input>
                        <textarea placeholder='Message' className='border border-solid border-gray-400 mb-8 pl-4 rounded'></textarea>
                        <button type='submit' className='bg-blue-300 text-xl font-semibold h-12 rounded'>Submit</button>
                    </form>
                </div>

                <div className='flex-1'>
                    <div className='flex flex-row  gap-24 mb-12'>
                        <div>
                            <p className='text-xl font-semibold font-font1'>Address:</p>
                            <p className='font-font1'>A, Shree Sadgurunivas Society., 16/5/1 Hingane Khurd,
                                Near Manik Baugh, Sinhgad Road, Pune : 411051 (India)</p>

                        </div>

                        <div>
                            <p className='text-xl font-semibold font-font1'>Email US:</p>
                            <p className='font-font1'>support@example.com</p>
                            <p className='font-font1'>info@example.com</p>
                        </div>
                    </div>

                    <div className='flex flex-row gap-24 mb-12'>
                        <div>
                            <p className='text-xl font-semibold font-font1'>Contacts:</p>
                            <p className='font-font1'>+ 91 9850588864</p>

                        </div>

                        <div>
                            <p className='text-xl font-semibold font-font1'>Working Hours:</p>
                            <p className='font-font1'>Open: 8:00AM – Close: 18:00PM</p>
                            <p className='font-font1'>Saturday – Sunday: Close</p>
                        </div>
                    </div>

                    <div className='flex flex-row gap-24'>
                        <div>
                            <p className='text-xl font-semibold font-font1'>Follow Us:</p>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContactPage;