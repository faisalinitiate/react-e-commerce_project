

import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white ">
      {/* Header Component */}
      <Header />

      {/* Top Info Boxes */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto py-16 px-4 md:px-8 lg:px-16">
        <div className="rounded-2xl shadow-md p-6 flex flex-col justify-center items-center border-gray-100">
          <IoHomeOutline className="text-slate-400  text-4xl mb-3"/>          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
          <p className="text-gray-600">
            7 Green Lake Street Crawfordsville,<br />IN 47933
          </p>
        </div>

        <div className="rounded-2xl shadow-md p-6 flex flex-col justify-center items-center border-gray-100">
          <AiOutlineMail className="text-slate-400  text-4xl mb-3"/> 
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
          <p className="text-gray-600">
            themart@gmail.com<br />themart@gmail.com
          </p>
        </div>

        <div className="rounded-2xl shadow-md p-6 flex flex-col justify-center items-center border-gray-100">
          <FaPhone  className="text-slate-400  text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Now</h3>
          <p className="text-gray-600">
            +1 800 123 456 789<br />+1 800 123 654 987
          </p>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Have Any Question?</h2>
        <p className="text-gray-500 text-sm">
          It is a long established fact that a reader will be distracted
          content of a page when looking.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-16">
        <form className="space-y-6">

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name*"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email*"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none"
            />

            <select className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none">
              <option>Services</option>
              <option>Product Inquiry</option>
              <option>Order Support</option>
              <option>Technical Help</option>
            </select>
          </div>

          {/* Message Box */}
          <textarea
            placeholder="Message..."
            rows="6"
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-200 outline-none"
          ></textarea>

          {/* Submit Button */}
          <div className="flex justify-center"> 

               <button
            type="submit"
            className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md border"
          >
            Submit Now
          </button>
          </div>
       
        </form>
      </div>

      {/* 🌍 Google Map (Under Form, Above Footer) */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            title="store-location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.007948327938!2d-86.917857!3d40.042836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88131d6b7c3537cd%3A0x2aeea1ddb5e7ab16!2sCrawfordsville%2C%20IN%2047933!5e0!3m2!1sen!2sus!4v1700000000000"
          ></iframe>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}



  