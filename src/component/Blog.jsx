import React from "react";
import { motion } from "framer-motion";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "How Lost and Found Platforms Help Reunite People",
      date: "December 22, 2024",
      author: "Misti",
      excerpt:
        "Lost and found platforms have become increasingly popular in helping people reunite with their lost belongings. In this post, we’ll explore how these platforms work and their impact.",
      imgSrc:
        "https://images.pexels.com/photos/12786869/pexels-photo-12786869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Tips for Creating an Effective Lost and Found System",
      date: "December 18, 2024",
      author: "Misti",
      excerpt:
        "Creating an effective lost and found system is crucial for organizations. Learn some useful tips and tools that can make the process smoother and more efficient.",
      imgSrc:
        "https://images.unsplash.com/photo-1523623169910-dad45c0fd21c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "How Technology is Revolutionizing Lost and Found Services",
      date: "December 15, 2024",
      author: "Misti",
      excerpt:
        "Technology is making lost and found services more efficient and accessible. From mobile apps to AI-powered solutions, this post covers the latest trends in the industry.",
      imgSrc:
        "https://media.istockphoto.com/id/1549561564/photo/asian-older-man-finding-something-that-he-forgot-it-in-drawers.webp?a=1&b=1&s=612x612&w=0&k=20&c=J-Fn2Gbfuv2OcPM76YvitWMqKJiZocPMmBtzseLGOuU=",
    },
    {
      id: 4,
      title: "Best Practices for Managing Lost and Found Items in Public Spaces",
      date: "December 12, 2024",
      author: "Misti",
      excerpt:
        "Managing lost and found items in public spaces requires organization and clear communication. We’ll discuss some of the best practices for handling these items in large venues.",
      imgSrc:
        "https://media.istockphoto.com/id/1550901370/photo/magnifying-success-powerful-red-wooden-businessman-leading-way-human-resource-empowering.webp?a=1&b=1&s=612x612&w=0&k=20&c=4VoZ2yR26RG9uHTl9VM0_BhuwfoNakW2c0C8VHiMBBY=",
    },
    {
      id: 5,
      title: "Legal Aspects of Lost and Found: What You Need to Know",
      date: "December 8, 2024",
      author: "Misti",
      excerpt:
        "Understanding the legal aspects of lost and found items is essential. This post outlines the key legal considerations and what you need to know when handling lost property.",
      imgSrc:
        "https://media.istockphoto.com/id/1972284700/photo/digital-search-icon-on-future-tech-background-search-engine-evolution-futuristic-search-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=xUurRaqulosQPS5cgJvWPY4eIp1Nt1tdpp2KApNyZV0=",
    },
    {
      id: 6,
      title: "How to Build a Community-Driven Lost and Found Platform",
      date: "December 5, 2024",
      author: "Misti",
      excerpt:
        "Building a community-driven lost and found platform can help local communities stay connected. This post offers insights on how to create such a platform and the benefits it offers.",
      imgSrc:
        "https://media.istockphoto.com/id/1334949135/photo/top-view-of-women-use-computer-laptop-to-find-what-they-are-interested-in-searching.webp?a=1&b=1&s=612x612&w=0&k=20&c=XdjlT37uCQcZdi_277jqmBu3FcylkxRQDEXmxGudWF8=",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
        Latest Lost and Found Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={post.imgSrc}
              alt={post.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{post.date} by {post.author}</p>
              <p className="text-gray-600 mt-4">{post.excerpt}</p>
              <button className="mt-6 text-orange-600 hover:underline">Read more</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
