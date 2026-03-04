import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

function Contact({ onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);
      form.append("access_key", "72e5aab6-9072-4d19-a165-14fea5a42c82");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setResult("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResult(`Error: ${data.message}`);
      }
    } catch {
      setResult("Something went wrong!");
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-5 left-0 max-w-xs w-full bg-white shadow-2xl rounded-2xl overflow-y-auto z-40">
      {/* Header */}
      <div className="bg-green-700 text-white px-4 py-2 text-md font-semibold rounded-tl-2xl flex justify-between items-center">
        <div>
          City General Store
          <p className="text-[12px] opacity-80">We usually respond in a few hours</p>
        </div>
        <button onClick={onClose} className="text-white text-[22px] leading-none cursor-pointer hover:text-red-500"><Icon icon={'mdi:close'} /></button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-1">
        <div>
          <label className="block font-medium mb-1 text-green-800">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-green-800">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-green-800">Your Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="4"
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
        >
          Submit
        </button>

        {result && (
          <p className="text-center text-sm text-green-700 mt-2">{result}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
