import React from 'react';
import Swiper from '../Components/Swiper';
import MedicineMarquee from '../Components/Marquee/MedicineMarquee';
import CategoryCard from '../Components/Category/CategoryCard';
import DiscountedMedicines from '../Components/Discount.jsx/DiscountedMedicines';

const Home = () => {
    return (
        <div>
           <div> <Swiper></Swiper></div>
           <CategoryCard></CategoryCard>
           <DiscountedMedicines></DiscountedMedicines>
           <MedicineMarquee></MedicineMarquee>
        </div>
        
    );
};

export default Home;