import React from "react";
 // নতুন CSS ফাইল

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "John Doe",
      message:
        "I lost my wallet at Central Park, and within two days, someone reported finding it. Thank you, Lost and Found!",
      location: "Central Park, NYC",
      date: "December 10, 2024",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      message:
        "Thanks to this platform, I was able to recover my lost phone. Highly recommend it!",
      location: "Union Square, NYC",
      date: "November 15, 2024",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Alice Johnson",
      message:
        "I found my missing dog with the help of this website. I'm forever grateful!",
      location: "Brooklyn, NYC",
      date: "October 20, 2024",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Michael Brown",
      message:
        "I lost my backpack, and someone returned it within hours. This is amazing!",
      location: "Manhattan, NYC",
      date: "September 5, 2024",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Sarah Davis",
      message:
        "This platform helped me reconnect with my lost pet parrot. Thank you so much!",
      location: "Queens, NYC",
      date: "August 15, 2024",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
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
