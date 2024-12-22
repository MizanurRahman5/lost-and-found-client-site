import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      image: "https://media.istockphoto.com/id/1129543842/photo/electronic-circuit-and-futuristic-technology-concept.jpg?s=612x612&w=0&k=20&c=kak1vN4GSZCehO5p6MsWfLBUClv21PC6woFF73uua0g=",
      title: "Alien Horde: Filming Complete!",
      subtitle: "Help Fund the Final Edits",
    },
    {
      image: "https://media.istockphoto.com/id/1163243581/photo/kpi-key-performance-indicator-for-business-concept.jpg?s=612x612&w=0&k=20&c=LAI6F4mWup3edbMnGKa3h5hNC42eJtN6Yf4FEIJpaH4=",
      title: "Crowdfund Your Next Big Idea",
      subtitle: "Join millions to make dreams come true",
    },
    {
      image: "https://ibles-content.tinkercad.com/static/tinkercad/marketing/home/feature-video-poster.jpg?width=600&auto=webp",
      title: "Explore Tech Innovations",
      subtitle: "Discover the future, today",
    },
  ];

  return (
    <div className="mt-15">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000, // Delay before changing slides
          disableOnInteraction: false, // Autoplay continues even after interaction
        }}
        speed={1000} // Transition speed
        loop
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "800px",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-base">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
