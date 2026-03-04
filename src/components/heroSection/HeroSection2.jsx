import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Truck } from "lucide-react";
import HeroVideo from "../../assets/HeroVideo.mp4";
import { Link } from "react-router-dom";

const HeroSection2 = () => {
  const img1 =
    "https://t4.ftcdn.net/jpg/06/27/63/87/360_F_627638766_fCZnNxHMqJ5lWHyecnibX4aznMWS82yQ.jpg";
  const img2 =
    "https://newwmartgroup.com/wp-content/uploads/2023/09/4-1024x512.jpg";
  const img3 =
    "https://static.vecteezy.com/system/resources/previews/065/579/495/non_2x/millennial-family-couple-shopping-groceries-in-supermarket-buying-food-walking-with-trolley-in-grocery-shop-indoor-cheerful-customers-buy-supply-essentials-standing-near-shelves-in-store-aisle-photo.jpg";
  const img4 =
    "https://www.shutterstock.com/image-photo/young-woman-buying-diary-product-600nw-2136267049.jpg";
  return (
    <section className="relative bg-[#e6f7f0] overflow-hidden py-8 sm:py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 z-10"
        >
          <div className="flex items-center text-sm text-green-700 font-semibold gap-2 mb-2">
            <ShoppingCart className="w-4 h-4" />
            TRUSTED LOCAL GROCERY STORE
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#006b3c] mb-4 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent">
              City General Store
            </span>
            <br />
            Fresh Groceries
          </h1>

          <p className="text-md text-gray-700 mb-6 max-w-md">
            “Quality groceries, fair prices, and fast delivery service in
            <span className="font-semibold">
              {" "}
              Diuliya, Madarsa Diuliya & Pipra
            </span>
            .”
          </p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-green-800 font-medium">
              <ShoppingCart className="w-4 h-4" />
              Daily Essential Items
            </div>
            <div className="flex items-center gap-2 text-green-800 font-medium">
              <Truck className="w-4 h-4" />
              Free Delivery Above ₹699
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/allproducts">
              <button className="cursor-pointer bg-[#006b3c] hover:bg-[#004d2a] text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300">
                Shop Groceries 🛒
              </button>
            </Link>

            <Link to="/about">
              <button className="border cursor-pointer border-green-700 text-green-700 hover:bg-green-100 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-[#ccefe050]">
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div className="flex-1 z-10 flex justify-center relative">
          {/* ================= MOBILE VIEW (Slider) ================= */}
          <div className="w-full overflow-hidden md:hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "linear",
              }}
            >
              {[img1, img2, img3, img4, img1, img2].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="shop"
                  className="w-40 rounded-xl shadow-lg"
                />
              ))}
            </motion.div>
          </div>

          {/* ================= DESKTOP VIEW (Floating) ================= */}
          <div className="hidden md:block relative h-[400px] w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex-1 z-10 flex justify-center relative h-[400px]"
            >
              {/* Image 1 */}
              <motion.img
                src={img1}
                alt="Shop 1"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute w-40 md:w-56 rounded-2xl shadow-xl top-0 left-10 hover:scale-105 transition duration-300"
              />

              {/* Image 2 */}
              <motion.img
                src={img2}
                alt="Shop 2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute w-40 md:w-56 rounded-2xl shadow-xl bottom-0 left-32 hover:scale-105 transition duration-300"
              />

              {/* Image 3 */}
              <motion.img
                src={img3}
                alt="Shop 3"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute w-40 md:w-56 rounded-2xl shadow-xl top-10 right-10 hover:scale-105 transition duration-300"
              />

              {/* Image 4 */}
              <motion.img
                src={img4}
                alt="Shop 4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute w-40 md:w-56 rounded-2xl shadow-xl bottom-10 right-20 hover:scale-105 transition duration-300"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection2;
