import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import logo from "../../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");

  async function handleSubscribe() {
    if (!user) {
      toast.warning("Please login to subscribe.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const subscribersRef = collection(firebaseDB, "subscribers");
      const q = query(subscribersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.warning("This email is already subscribed.");
        return;
      }

      await addDoc(subscribersRef, {
        email,
        subscribedAt: Timestamp.now(),
      });

      setEmail("");
      toast.success("Thank you for subscribing!");
    } catch (error) {
      console.error("Error adding email:", error);
      toast.error("Failed to subscribe. Please try again later.");
    }
  }

  return (
    <footer className="bg-[#003d29] text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + Description */}
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <img src={logo} width={25} alt="logo" />
            <span>City General Store</span>
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            Fresh groceries, household essentials, and daily needs — 
            all available at affordable prices. Serving Diuliya Dhala, 
            Narkatiaganj with trust and quality.
          </p>

          <div className="flex space-x-3">
            {[
              { icon: FaInstagram, link: "#" },
              { icon: FaFacebookF, link: "#" },
              { icon: FaTwitter, link: "#" },
            ].map((Con, index) => (
              <div
                key={index}
                className="group w-9 h-9 flex items-center justify-center bg-green-800 rounded-full cursor-pointer hover:scale-110 transition"
              >
                <a href={Con.link} target="_blank" rel="noopener noreferrer">
                  <Con.icon className="text-white text-lg group-hover:text-yellow-400" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:underline cursor-pointer hover:text-yellow-400"
              onClick={() => navigate("about")}
            >
              About Us
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-yellow-400"
              onClick={() => navigate("allproducts")}
            >
              All Products
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-yellow-400"
              onClick={() => navigate("return-policy")}
            >
              Return Policy
            </li>
            <li
              className="hover:underline cursor-pointer hover:text-yellow-400"
              onClick={() => navigate("contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail />
              <a href="mailto:citygeneralstore@gmail.com">
                citygeneralstore@gmail.com
              </a>
            </li>

            <li className="flex items-center gap-2">
              <MdPhone />
              <a href="tel:+917518202507">+91-7518202507</a>
            </li>

            <li className="flex items-center gap-2">
              <MdLocationOn />
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Diuliya Dhala, Narkatiaganj
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">
            Get latest grocery offers and special discounts directly to your email.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-green-700 bg-transparent text-white placeholder-white mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={handleSubscribe}
            className="w-full bg-green-600 hover:bg-green-700 font-medium py-2 rounded-md transition hover:text-yellow-300"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="mb-4 md:mb-0">
          © 2026 City General Store. All rights reserved.
        </p>

        <div className="flex space-x-6">
          <span
            onClick={() => navigate("privacy-policy")}
            className="hover:underline cursor-pointer hover:text-yellow-400"
          >
            Privacy Policy
          </span>

          <span
            onClick={() => navigate("terms&condition")}
            className="hover:underline cursor-pointer hover:text-yellow-400"
          >
            Terms & Conditions
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;