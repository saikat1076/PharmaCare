import React from 'react';
import Swiper from '../Components/Swiper';
import MedicineMarquee from '../Components/Marquee/MedicineMarquee';
import CategoryCard from '../Components/Category/CategoryCard';

const Home = () => {
    return (
        <div>
           <div> <Swiper></Swiper></div>
           <CategoryCard></CategoryCard>
           <MedicineMarquee></MedicineMarquee>
        </div>
        
    );
};

export default Home;