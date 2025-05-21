import React from "react";
import BlogCard from "../components/BlogCard.jsx";

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      image: "https://via.placeholder.com/600x400",
      title: "The Ultimate Guide to Warduro Hoodies",
      excerpt: "Discover the comfort and style of our premium hoodies...",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/600x400",
      title: "How to Style Hoodies for Every Season",
      excerpt: "Learn how to style your favorite Warduro hoodies...",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/600x400",
      title: "Why Warduro Hoodies Stand Out",
      excerpt: "Explore the premium fabrics and modern designs...",
    },
  ];

  const handleReadMore = (id) => {
    console.log(`Navigate to blog details for ID: ${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-16 md:mt-20 lg:mt-20 xl:mt-20">
      {/* Header Section */}
      <header className="bg-black text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold uppercase text-[#FFAA00]">
            Warduro Blog
          </h1>
          <p className="text-gray-300 mt-2">
            Discover the latest updates, styling tips, and trends in hoodies.
          </p>
        </div>
      </header>

      {/* Blog Cards Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              image={blog.image}
              title={blog.title}
              excerpt={blog.excerpt}
              onReadMore={() => handleReadMore(blog.id)}
            />
          ))}
        </div>
      </section>

      {/* Full Blog Details */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 lg:w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">
            Featured Blog: The Ultimate Guide to Warduro Hoodies
          </h2>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Featured Blog"
            className="w-full h-64 object-cover mb-6 rounded-lg"
          />
          <p className="text-gray-700 leading-relaxed mb-4">
            At Warduro, we believe hoodies are more than just clothing; they’re
            a statement of comfort, style, and individuality. Our hoodies are
            crafted with premium fabrics to ensure durability and unmatched
            comfort. Whether you're styling for a casual day out or layering for
            the winter season, Warduro hoodies provide the perfect balance of
            warmth and fashion.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Explore our collection today and redefine your wardrobe with
            Warduro's exclusive designs. From oversized fits to sleek modern
            cuts, we have a hoodie for every style preference.
          </p>
        </div>
      </section>

      
    </div>
  );
}
