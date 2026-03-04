import React from "react";
import { motion } from "framer-motion";

const infoCards = [
  {
    icon: "💯",
    title: "Quality Guaranteed",
    description: "Fresh and quality-checked grocery products for your family.",
  },
  {
    icon: "🚚",
    title: "Fast Local Delivery",
    description: "Quick home delivery in Diuliya, Madarsa Diuliya & Pipra.",
  },
  {
    icon: "💰",
    title: "Affordable Prices",
    description: "Best market rates so everyone can shop comfortably.",
  },
  {
    icon: "🏪",
    title: "Trusted Local Store",
    description: "Serving the community with honesty and reliability.",
  },
];

const TransformSection = () => {
  return (
    <div className="bg-green-700 text-white py-20 px-6 md:px-16 text-center">
      
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Ready to Shop <br /> Daily Essentials?
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-green-100 mt-4 max-w-2xl mx-auto">
        City General Store is your trusted grocery partner in Diuliya Dhala,
        Narkatiaganj. Fresh products, fair pricing, and reliable service —
        everything your family needs in one place.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition">
          🛒 Shop Now
        </button>

        <button className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
          View All Products
        </button>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-sm">
        {infoCards.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-green-600 text-white rounded-xl p-6 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className="text-base font-bold mb-1">{title}</h3>
        <p className="text-sm text-green-100">{description}</p>
      </div>
    </motion.div>
  );
};

export default TransformSection;