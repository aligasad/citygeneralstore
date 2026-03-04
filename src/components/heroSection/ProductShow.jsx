import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const tabs = ["Product Details", "Storage Info", "Reviews"];

const content = {
  "Product Details": [
    {
      title: "Premium Quality",
      desc: "Long grain, aromatic and high-quality basmati rice.",
      percent: "5 Kg Pack",
    },
    {
      title: "Fresh Stock",
      desc: "Directly sourced from trusted suppliers.",
      percent: "New Arrival",
    },
    {
      title: "High Nutrition",
      desc: "Rich in carbohydrates and essential nutrients.",
      percent: "100% Natural",
    },
    {
      title: "No Artificial Polish",
      desc: "Maintains natural texture and taste.",
      percent: "Pure",
    },
  ],

  "Storage Info": [
    "Store in a cool and dry place",
    "Keep away from direct sunlight",
    "Close the pack tightly after use",
    "Best before 12 months from packaging date",
  ],

  Reviews: [
    {
      name: "Jawed Alam",
      text: "Very good quality rice. Fragrance is amazing and cooking result is perfect.",
    },
    {
      name: "Asad Alam",
      text: "Price is reasonable compared to market. Will purchase again.",
    },
    {
      name: "Shahbaz Bhaijaan",
      text: "Delivery was fast and product was properly packed. Highly recommended!",
    },
  ],
};

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ProductShow = () => {
  const [activeTab, setActiveTab] = useState("Product Details");

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 space-y-4">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            src="https://t4.ftcdn.net/jpg/08/27/71/43/360_F_827714300_7pTBq2s243ECauhWjQDyDZaTSMXFkjSA.jpg"
            alt="Basmati Rice"
            className="rounded-xl shadow-lg w-full sm:h-[310px] object-top object-cover "
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-5 rounded-xl shadow space-y-3">

            <div className="flex gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                🛒 Grocery Item
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Best Seller
              </span>
            </div>

            <h2 className="text-2xl font-bold text-green-900">
              Premium Basmati Rice (5 Kg)
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-sm text-gray-600">(324 reviews)</span>
            </div>

            <p className="text-3xl font-bold text-green-800">₹499</p>

            <button className="w-full cursor-pointer bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition">
              Shop Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2">

        {/* Tabs */}
        <div className="flex mb-4 gap-2 bg-gray-100 p-1 rounded">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 rounded transition-all ${
                activeTab === tab
                  ? "bg-white text-green-700 font-semibold shadow"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="space-y-4"
          >

            {/* Product Details */}
            {activeTab === "Product Details" &&
              content[activeTab].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-4 shadow rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-green-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                  <span className="text-green-700 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
                    {item.percent}
                  </span>
                </motion.div>
              ))}

            {/* Storage Info */}
            {activeTab === "Storage Info" &&
              content[activeTab].map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-green-50 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </motion.div>
              ))}

            {/* Reviews */}
            {activeTab === "Reviews" &&
              content[activeTab].map((review, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-4 shadow rounded-xl"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-green-800">
                        {review.name}
                      </p>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <FaCheckCircle size={12} /> Verified
                      </span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductShow;