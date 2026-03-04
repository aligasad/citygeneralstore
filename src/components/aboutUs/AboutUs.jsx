import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#fefdfb] py-20 px-6 text-[#2b2b2b]">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#006b3c] to-[#003d29] bg-clip-text text-transparent mb-4">
            About City General Store
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#4a4a4a]">
            Your trusted grocery partner at Diuliya Dhala, Narkatiaganj.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-[17px] md:text-lg leading-relaxed text-justify">
          <p>
            <strong className="text-[#006b3c]">City General Store</strong> is
            proudly located at <strong>Diuliya Dhala, Narkatiaganj</strong>.
            Owned and managed by <strong>Afzal Haroon</strong>, our store has
            been serving the local community with dedication, honesty, and
            quality products.
          </p>

          <p>
            We provide a wide range of groceries including daily essentials,
            rice, pulses, oil, spices, snacks, beverages, and household items.
            Our aim is to ensure that every family gets quality products at
            reasonable prices.
          </p>

          <p>
            Customer satisfaction is our top priority. We believe in building
            long-term trust with our customers by offering genuine products and
            friendly service.
          </p>
        </div>

        {/* Delivery Section */}
        <div className="mt-12 bg-gradient-to-r from-[#e6f7f0] to-[#ffffff] p-8 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-semibold text-[#003d29] mb-4">
            🚚 Home Delivery Service
          </h2>
          <p className="text-lg leading-relaxed">
            We offer home delivery in <strong>Diuliya, Madarsa Diuliya,
            and Pipra</strong> for orders above <strong>₹699</strong>.
            Now enjoy hassle-free shopping from home and get groceries
            delivered directly to your doorstep.
          </p>
        </div>

        {/* Shop Images Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#003d29] mb-8">
            Our Shop Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src="https://jsdl.in/RSL-SEP1772655903"
              alt="City General Store Interior"
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            />
            <img
              src="/images/shop2.jpg"
              alt="Grocery Products"
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            />
            <img
              src="/images/shop3.jpg"
              alt="Store Front View"
              className="rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-[#003d29] mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[#444]">
              <li>✅ Wide range of grocery products</li>
              <li>✅ Affordable & fair pricing</li>
              <li>✅ Trusted local store</li>
              <li>✅ Friendly customer service</li>
              <li>✅ Fast home delivery</li>
            </ul>
          </div>

          <div className="flex items-center bg-[#f9f9f9] p-6 rounded-2xl shadow-lg border">
            <p className="text-lg italic text-[#2d2d2d]">
              "Serving our community with trust, quality, and convenience —
              City General Store is always here for you."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;