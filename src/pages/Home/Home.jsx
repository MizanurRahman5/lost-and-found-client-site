import React from "react";
import NavBar from "../../component/NavBar";
import Banner from "../../component/Banner";
import LatestLostAndFound from "../../component/LatestLostAndFound";
import SuccessStories from "../../component/SuccessStories";
import FAQ from "../../component/Faq";
import Blog from "../../component/Blog";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title> {/* Dynamic title */}
        
      </Helmet>
      <Banner />
      <LatestLostAndFound />
      <Blog />
      <FAQ />
      <SuccessStories />
    </div>
  );
};

export default Home;
