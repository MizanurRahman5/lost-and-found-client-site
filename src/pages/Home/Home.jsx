import React from 'react';
import NavBar from '../../component/NavBar';
import Banner from '../../component/Banner';
import LatestLostAndFound from '../../component/LatestLostAndFound';

const Home = () => {
    return (
        <div>
           <Banner/>
           <LatestLostAndFound/>
        </div>
    );
};

export default Home;