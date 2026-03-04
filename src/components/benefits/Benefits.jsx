import React from "react";
import { motion } from "framer-motion";
import { 
  FaShoppingBasket, 
  FaTruck, 
  FaRupeeSign, 
  FaStore, 
  FaClock, 
  FaSmile 
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaShoppingBasket className="text-green-600 w-8 h-8" />,
    title: "Wide Range of Groceries",
    description: "All daily essential items available at one place for your convenience.",
  },
  {
    icon: <FaTruck className="text-blue-500 w-8 h-8" />,
    title: "Fast Home Delivery",
    description: "Quick delivery service in Diuliya, Madarsa Diuliya & Pipra for orders above ₹699.",
  },
  {
    icon: <FaRupeeSign className="text-yellow-500 w-8 h-8" />,
    title: "Affordable Prices",
    description: "Fair and competitive pricing so every family can shop comfortably.",
  },
  {
    icon: <FaStore className="text-green-800 w-8 h-8" />,
    title: "Trusted Local Store",
    description: "Serving the community of Diuliya Dhala, Narkatiaganj with honesty and trust.",
  },
  {
    icon: <FaClock className="text-purple-500 w-8 h-8" />,
    title: "Quick Service",
    description: "Fast billing and friendly customer support for smooth shopping experience.",
  },
  {
    icon: <FaSmile className="text-pink-500 w-8 h-8" />,
    title: "Customer Satisfaction",
    description: "Our priority is happy customers and long-term relationships.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-green-50 via-white to-green-100">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 text-green-700 mb-4">
            <FaStore className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
            Why Shop From <span className="block text-green-600">City General Store?</span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted grocery partner in Diuliya Dhala, Narkatiaganj — 
            offering quality products, fair prices, and reliable service.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md border hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full shadow-sm">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-green-800">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        <motion.div
          className="mt-16 text-center grid grid-cols-2 md:grid-cols-4 gap-6 text-green-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-bold">100%</div>
            <p className="text-sm text-gray-500">Quality Products</p>
          </div>

          <div>
            <div className="text-3xl font-bold">₹699+</div>
            <p className="text-sm text-gray-500">Free Delivery</p>
          </div>

          <div>
            <div className="text-3xl font-bold">3+</div>
            <p className="text-sm text-gray-500">Delivery Areas</p>
          </div>

          <div>
            <div className="text-3xl font-bold">Trusted</div>
            <p className="text-sm text-gray-500">Local Store</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Benefits;