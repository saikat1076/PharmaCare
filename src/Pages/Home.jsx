import React from 'react';
import Swiper from '../Components/Swiper';
import MedicineMarquee from '../Components/Marquee/MedicineMarquee';
import CategoryCard from '../Components/Category/CategoryCard';
import DiscountedMedicines from '../Components/Discount.jsx/DiscountedMedicines';
import ContactUsSection from '../Components/ContactUsSection';
import { Helmet } from 'react-helmet';
import ReviewSection from '../Components/ReviewSection';
import DownloadAppSection from '../Components/DownloadApp';
import FAQSection from '../Components/FQSSection';


const Home = () => {
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>PharmaCare | Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <div>
           <div> <Swiper></Swiper></div>
           <CategoryCard></CategoryCard>
           <DiscountedMedicines></DiscountedMedicines>
           <MedicineMarquee></MedicineMarquee>
           <ReviewSection></ReviewSection>
           <FAQSection></FAQSection>
           <DownloadAppSection></DownloadAppSection>
           <ContactUsSection></ContactUsSection>
        </div></>
        
    );
};

export default Home;