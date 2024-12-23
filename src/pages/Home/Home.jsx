import React from 'react';
import NavBar from '../../component/NavBar';
import Banner from '../../component/Banner';
import LatestLostAndFound from '../../component/LatestLostAndFound';
import SuccessStories from '../../component/SuccessStories';

const Home = () => {
    return (
        <div>
           <Banner/>
           <LatestLostAndFound/>
           <SuccessStories/>
        </div>
    );
};

export default Home;