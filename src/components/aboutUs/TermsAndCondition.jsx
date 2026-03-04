import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#fffaf4] text-[#2c2c2c] py-12 px-6 md:px-12 lg:px-24 leading-relaxed">
      
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-[#003d29]">
        Terms & Conditions
      </h1>

      <p className="mb-8">
        Welcome to <strong>City General Store</strong>, located at 
        <strong> Diuliya Dhala, Narkatiaganj</strong>, owned and managed by 
        <strong> Afzal Haroon</strong>. 
        By placing an order or using our services, you agree to the following 
        terms and conditions.
      </p>

      <div className="space-y-8">

        {/* Product Policy */}
        <div>
          <h2 className="text-xl font-bold mb-2">1. 🛒 Products & Availability</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All grocery and household products are subject to availability.</li>
            <li>Prices may change without prior notice.</li>
            <li>We strive to provide accurate product details, but minor variations may occur.</li>
          </ul>
        </div>

        {/* Orders & Payments */}
        <div>
          <h2 className="text-xl font-bold mb-2">2. 💳 Orders & Payments</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Orders are confirmed only after successful payment confirmation (for online payments).</li>
            <li>Cash on Delivery (COD) may be available within delivery areas.</li>
            <li>City General Store reserves the right to cancel any suspicious or incomplete orders.</li>
          </ul>
        </div>

        {/* Delivery Policy */}
        <div>
          <h2 className="text-xl font-bold mb-2">3. 🚚 Delivery Policy</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Home delivery is available in <strong>Diuliya, Madarsa Diuliya, and Pipra</strong>.</li>
            <li>Minimum order value for delivery is <strong>₹699</strong>.</li>
            <li>Delivery timing may vary depending on order volume and weather conditions.</li>
            <li>If the customer is unavailable at the time of delivery, redelivery may be rescheduled.</li>
          </ul>
        </div>

        {/* Return Policy */}
        <div>
          <h2 className="text-xl font-bold mb-2">4. 🔁 Return & Refund Policy</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Returns are accepted only if the product is damaged or incorrect.</li>
            <li>Issues must be reported within 24 hours of delivery.</li>
            <li>Refunds will be processed after product verification.</li>
            <li>No returns will be accepted for opened or used products.</li>
          </ul>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-xl font-bold mb-2">5. 📊 Pricing & Offers</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All prices are in INR (₹).</li>
            <li>Special offers and discounts are time-limited.</li>
            <li>Offers cannot be applied after order confirmation.</li>
          </ul>
        </div>

        {/* Responsibility */}
        <div>
          <h2 className="text-xl font-bold mb-2">6. ⚠ Customer Responsibility</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Please provide correct address and contact details.</li>
            <li>Ensure someone is available to receive the order.</li>
            <li>Verify items at the time of delivery.</li>
          </ul>
        </div>

        {/* Governing Law */}
        <div>
          <h2 className="text-xl font-bold mb-2">7. ⚖ Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall 
            fall under the jurisdiction of courts in Bihar.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-2">8. 📞 Contact Information</h2>
          <p>
            For any queries or concerns, please visit us at:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>🏬 City General Store, Diuliya Dhala, Narkatiaganj</li>
            <li>👤 Owner: Afzal Haroon</li>
            <li>📍 Delivery Areas: Diuliya, Madarsa Diuliya, Pipra</li>
          </ul>
        </div>

      </div>

      <p className="mt-10 text-sm text-[#6a6a6a]">
        By placing an order with City General Store, you confirm that you have 
        read, understood, and agreed to these Terms & Conditions.
      </p>

    </section>
  );
};

export default TermsAndConditions;