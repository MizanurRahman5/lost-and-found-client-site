import React from "react";


const SuccessStories = () => {
    const stories = [
        {
          "id": 1,
          "name": "John Doe",
          "message": "I lost my wallet at Central Park, and within two days, someone reported finding it. Thank you, Lost and Found!",
          "location": "Central Park, NYC",
          "date": "December 10, 2024",
          "image": "https://media.istockphoto.com/id/1015448410/photo/theres-confident-and-then-theres-military-confident.jpg?s=612x612&w=0&k=20&c=o_KDcJKb2PQuK8ZXq93DQKuOQsfBjsX-WpSeHNQAPqA"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "message": "Thanks to this platform, I was able to recover my lost phone. Highly recommend it!",
          "location": "Union Square, NYC",
          "date": "November 15, 2024",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5CPz89vwuDB4H5EsXhkpKz0_koS-0HK0Yg&s"
        },
        {
          "id": 3,
          "name": "Alice Johnson",
          "message": "I found my missing dog with the help of this website. I'm forever grateful!",
          "location": "Brooklyn, NYC",
          "date": "October 20, 2024",
          "image": "https://st3.depositphotos.com/3776273/31836/i/450/depositphotos_318367382-stock-photo-portrait-of-a-handsome-young.jpg"
        },
        {
          "id": 4,
          "name": "Michael Brown",
          "message": "I lost my backpack, and someone returned it within hours. This is amazing!",
          "location": "Manhattan, NYC",
          "date": "September 5, 2024",
          "image": "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg"
        },
        {
          "id": 5,
          "name": "Sarah Davis",
          "message": "This platform helped me reconnect with my lost pet parrot. Thank you so much!",
          "location": "Queens, NYC",
          "date": "August 15, 2024",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQffVXFgYxENiH-VLaMIoiIgkDilyO2hA9VIw&s"
        }
      ];
      

  return (
    <section className="bg-gray-100 py-10">
      <div className="px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Success Stories
        </h2>
        <div className="overflow-hidden">
          <div className="success-marquee">
            {stories.concat(stories).map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold">{story.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{story.location}</p>
                <p className="text-gray-400 text-xs mb-4">{story.date}</p>
                <p className="text-gray-600 italic">"{story.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
