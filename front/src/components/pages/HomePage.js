import React from 'react'
import Banner from '../Home/Banner';
import Categories from '../Home/Categories';
import FeaturedList from '../Home/FeaturedList';

import Num from '../Home/Num';
import Values from '../Home/Values';

const HomePage = () => {
    return (
        <div className='mt-16 mb-80'>
            <div className='flex flex-row justify-center mx-4 '>

                {/* 30% */}
                <div className="w-1/4 border-2 flex justify-center">
                    <Categories></Categories>
                </div>


                {/* 70% */}
                <div className="w-3/4">
                    <Banner></Banner>
                    <hr className='border-1 border-gray-400'></hr>
                    <FeaturedList></FeaturedList>
                </div>


            </div>
            <Num></Num>
            <Values></Values>
        </div>
    )
}

export default HomePage;