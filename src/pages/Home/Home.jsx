import React from 'react';
import NavBar from '../../component/NavBar';
import Banner from '../../component/Banner';
import LatestLostAndFound from '../../component/LatestLostAndFound';
import SuccessStories from '../../component/SuccessStories';
import FAQ from '../../component/Faq';
import Blog from '../../component/Blog';

const Home = () => {
    return (
        <div>
           <Banner/>
           <LatestLostAndFound/>
           <Blog/>
           <FAQ/>
           <SuccessStories/>
        </div>
    );
};

export default Home;