import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "Do you provide a complete design style?",
      answer:
        "Pretium ac auctor quis urna orci feugiat. Vulputate tellus velit tellus orci auctor vel nulla facilisi ut.",
    },
    {
      question: "Do you have any terms & conditions?",
      answer: "Here are our terms and conditions in detail.",
    },
    {
      question: "How to apply Saturn to our project?",
      answer: "You can integrate Saturn by following our documentation.",
    },
    {
      question: "How to apply Saturn to our project?",
      answer: "You can integrate Saturn by following our documentation.",
    },
    {
      question: "How was the Terms & Condition?",
      answer: "Our terms and conditions are straightforward and user-friendly.",
    },
    {
      question: "How much we can buy this product?",
      answer: "You can purchase this product at an affordable price.",
    },
    {
      question: "How much we can buy this product?",
      answer: "You can purchase this product at an affordable price.",
    },
    {
      question: "How was the license?",
      answer: "Our license is flexible and designed for various needs.",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-center text-4xl font-bold mb-8">
        <span className="text-orange-500">You ask?</span> We{" "}
        <span className="italic">answer</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 shadow-sm ${
              activeIndex === index ? "bg-orange-100" : "bg-white"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h3
                className={`text-lg font-semibold ${
                  activeIndex === index ? "text-orange-500" : "text-gray-800"
                }`}
              >
                {item.question}
              </h3>
              <span
                className={`text-2xl ${
                  activeIndex === index ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
