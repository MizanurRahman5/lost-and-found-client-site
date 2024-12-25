import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      id : 1,
      image: "https://img.freepik.com/free-photo/young-child-playing-with-microscope_23-2147770370.jpg?ga=GA1.1.548603604.1723527155&semt=ais_hybrid",
      title: "Lost Item Found",
      subtitle: "Help us reunite lost items with their owners!",
    },
    {
      id : 2,
      image: "https://img.freepik.com/premium-photo/man-headphones-engages-educational-programs-audio-tours-using-map-understan_470400-3461.jpg?ga=GA1.1.548603604.1723527155&semt=ais_hybrid",
      title: "Found Something?",
      subtitle: "Browse through lost items and report your found items.",
    },
    {
      id : 3,
      image: "https://img.freepik.com/free-photo/asian-woman-tourist-wearing-face-mask-coronavirus-flu-virus-travel-concept_1150-45023.jpg?ga=GA1.1.548603604.1723527155&semt=ais_hybrid",
      title: "Community Support",
      subtitle: "Join the community to make a difference.",
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
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
                <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
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
