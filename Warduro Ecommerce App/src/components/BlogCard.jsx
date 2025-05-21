import React from "react";

export default function BlogCard({ image, title, excerpt, onReadMore }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
        <button
          onClick={onReadMore}
          className="bg-[#FFAA00] hover:bg-black text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
