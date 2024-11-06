import React from 'react'
import ValueCard from './ValueCard'

const Values = () => {
    return (
        <div className='mt-20'>
            <p className='font-font1 text-4xl font-semibold text-center mb-8'>Our Values</p>
            <div className='flex flex-row justify-center gap-4'>
                <ValueCard
                    title='Ease Of Use'
                    txt='With Our User friendly Website we have made it super easy for even a non technical person to take advantage of Our Professional Services without any Fuss.'></ValueCard>
                <ValueCard
                    title='Quality Management'
                    txt='We are devoted to upholding the highest quality in EMS with top industry standards and certification. We always make certain with our QC Checks at every step'></ValueCard>
                <ValueCard
                    title='Dedicated Expert Team'
                    txt='We have a dedicated Proficient Team for all departments to ensure top class quality and service with years of experience in the industry. We Also provide Consultancy for the needy Clients.'></ValueCard>
                <ValueCard
                    title='Timely Fast Delivery'
                    txt=' Our streamlined logistics and efficient supply chain management ensure that your orders arrive on time, every time. we aim to exceed your expectations and foster long-lasting relationships built on trust and reliability. '></ValueCard>
            </div>
        </div>
    )
}

export default Values