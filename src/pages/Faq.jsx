// src/pages/Faq.jsx
import React, { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import slidertwo from "../assets/slidertwo.jpg";
import { FaChevronDown } from "react-icons/fa";

const faqList = [
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return window for all unused products in original packaging. Refunds are processed within 3–5 business days.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 3-7 business days. Express shipping options are available at checkout.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship worldwide. Shipping times and costs vary based on destination.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you will receive a tracking link via email and SMS.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. We use encrypted and PCI-compliant payment gateways to ensure your security.",
  },
];

export default function Purchase() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      <Header />

      {/* HERO SECTION */}
          {/* Banner */}
         <div
              className="relative  h-68 pt-3"
              style={{
              
                  backgroundImage: `url(${slidertwo})`,
                  backgroundPosition: "center",
                  backgroundSize: "auto",
                  backgroundRepeat: "no-repeat"
          
         
              }}
            >
       
        
        </div>

      {/* FAQ CONTENT */}
      <main className="container mx-auto px-6 py-14">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 transition"
            >
              {/* FAQ HEADER */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <h2 className="text-lg font-semibold text-gray-800">{item.q}</h2>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-amber-600" : "rotate-0 text-gray-500"
                  }`}
                />
              </button>

              {/* FAQ ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT SUPPORT */}
        <div className="max-w-3xl mx-auto mt-14 bg-white p-8 rounded-xl border shadow-sm text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Still can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mt-2">
            Contact our support team and we'll get back to you within 24 hours.
          </p>
          <button className="mt-5 px-6 py-3 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition font-medium">
            Contact Support
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// import React, { useState } from "react";
// import Header from "../common/Header";
// import Footer from "../common/Footer";
// import purchase from "../assets/purchase.jpg";
// import "../index.css";


// export default function Purchase() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     cardNumber: "",
//     expiry: "",
//     cvc: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Order placed successfully!");
//   };

//   return (
//         <div className="bg-gray-50 min-h-screen flex flex-col">
//           {/* Header Component */}
//           <Header />
//             <div className="bg-gray-50 min-h-screen">
//       {/* Banner */}
//       <div
//         className="relative h-96 bg-cover bg-center"
//         style={{
              
//                 backgroundImage: `url(${purchase})`,
             
//         }}
//       >
    
//       </div>

//       {/* Checkout Form */}
//       <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
//         {/* Billing Info */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-8 rounded-xl shadow-lg space-y-6"
//         >
//           <h2 className="text-2xl font-bold mb-4">Billing Information</h2>

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//             required
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Street Address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//             required
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//               required
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//               required
//             />
//           </div>
//           <input
//             type="text"
//             name="country"
//             placeholder="Country"
//             value={formData.country}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//             required
//           />

//           <h2 className="text-2xl font-bold mt-8">Payment Information</h2>
//           <input
//             type="text"
//             name="cardNumber"
//             placeholder="Card Number"
//             value={formData.cardNumber}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//             required
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="expiry"
//               placeholder="MM/YY"
//               value={formData.expiry}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//               required
//             />
//             <input
//               type="text"
//               name="cvc"
//               placeholder="CVC"
//               value={formData.cvc}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Place Order
//           </button>
//         </form>

//         {/* Order Summary */}
//         <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Summer Tee</span> <span>$39</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Urban Hoodie</span> <span>$79</span>
//             </div>
//             <div className="flex justify-between font-semibold">
//               <span>Subtotal</span> <span>$118</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span> <span>$5</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold">
//               <span>Total</span> <span>$123</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     {/* Footer Component */}
//          <Footer />
// </div>
    
//   );
// }