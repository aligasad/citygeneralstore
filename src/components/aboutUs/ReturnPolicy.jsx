import React, { useEffect } from "react";

const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[#fffaf4] text-[#2c2c2c] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#006b3c]">
          Return & Refund Policy
        </h2>

        <p className="text-lg mb-6 leading-relaxed">
          At <span className="font-semibold">City General Store</span>, located at 
          <span className="font-semibold"> Diuliya Dhala, Narkatiaganj</span>, 
          owned by <span className="font-semibold">Afzal Haroon</span>, we aim 
          to provide quality grocery products and reliable service.  
          Please read our return and refund policy carefully before placing an order.
        </p>

        {/* Eligibility */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#003d29]">
            🧾 Eligibility for Return/Refund:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>
              <span className="font-medium">Damaged Product:</span> If the product 
              is damaged during delivery.
            </li>
            <li>
              <span className="font-medium">Wrong Item Delivered:</span> If you 
              receive a different item than ordered.
            </li>
            <li>
              The issue must be reported within{" "}
              <span className="font-medium">24 hours of delivery</span>.
            </li>
          </ul>
        </div>

        {/* Non-Returnable */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#003d29]">
            ❌ Non-Returnable Items:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>Opened or used grocery products.</li>
            <li>Perishable goods (milk, bread, vegetables, etc.).</li>
            <li>Products damaged after delivery.</li>
            <li>Items purchased during special discounts or offers (unless damaged).</li>
          </ul>
        </div>

        {/* Return Procedure */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#003d29]">
            📝 Return Procedure:
          </h3>
          <p className="mb-2">
            To request a return, please contact us within 24 hours of delivery
            with your Order ID and details of the issue.
          </p>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Provide clear photos of the damaged or incorrect item.</li>
            <li>Keep the product unused and in original packaging.</li>
          </ul>
          <p className="mt-2">
            After verification, our team will guide you regarding replacement or refund.
          </p>
        </div>

        {/* Refund Process */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#003d29]">
            💸 Refund Process:
          </h3>
          <p className="mb-2">
            Once approved, refunds will be processed within{" "}
            <span className="font-medium">3–7 business days</span> to the 
            original payment method.
          </p>
          <p>
            For Cash on Delivery (COD) orders, refunds will be transferred to 
            your bank account after confirmation.
          </p>
        </div>

        {/* Delivery Note */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-[#003d29]">
            🚚 Delivery Note:
          </h3>
          <p className="leading-relaxed">
            Home delivery is available in <strong>Diuliya, Madarsa Diuliya, and Pipra</strong> 
            for orders above <strong>₹699</strong>. Please ensure correct address 
            and contact details to avoid delivery issues.
          </p>
        </div>

        {/* Contact */}
        <div className="border-t pt-6 text-base">
          <p className="font-semibold mb-2">
            For any assistance, please visit:
          </p>
          <p>🏬 City General Store, Diuliya Dhala, Narkatiaganj</p>
          <p>👤 Owner: Afzal Haroon</p>
        </div>

      </div>
    </section>
  );
};

export default ReturnPolicy;