import React from 'react'
import Banner from '../Home/Banner';
import Categories from '../Home/Categories';

import Num from '../Home/Num';

const HomePage = () => {
    return (
        <div className='mt-20 mx-4 mb-80'>
            <div className=' '>
                <Banner></Banner>
                <Categories></Categories>
                <Num></Num>

            </div>
        </div>
    )
}

export default HomePage;