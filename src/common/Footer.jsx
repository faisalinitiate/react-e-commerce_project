import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { ShoppingBag } from "lucide-react";
import '../index.css';

const socialLinks = [
  { id: 1, icon: <FaFacebookF />, url: '#', hover: 'hover:text-blue-600' },
  { id: 2, icon: <FaTwitter />, url: '#', hover: 'hover:text-blue-400' },
  { id: 3, icon: <FaInstagram />, url: '#', hover: 'hover:text-pink-500' },
  { id: 4, icon: <FaLinkedinIn />, url: '#', hover: 'hover:text-blue-500' },
];

const FooterColumn = ({ title, items }) => (
  <div>
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    <ul className="space-y-3 text-sm">
      {items.map((item, idx) => (
        <li key={idx}>
          <a href={item.link} className="hover:text-blue-600 transition">
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Join Our Newsletter</h4>
      <p className="text-sm mb-4">Subscribe to receive updates, exclusive offers and more.</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:w-auto px-4 py-2 rounded-full bg-white 
                     border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
        >
          Subscribe
        </button>
      </form>

      {submitted && (
        <p className="text-green-600 text-sm mt-3">Thanks for subscribing!</p>
      )}
    </div>
  );
};

export default function Footer() {
  const companyName = 'ShopZen';

  const usefulLinks = [
    { name: 'About Us', link: '#' },
    { name: 'Contact', link: '#' },
    { name: 'Privacy Policy', link: '#' },
    { name: 'Terms & Conditions', link: '#' },
  ];

  const categories = [
    { name: "Men's Fashion", link: '#' },
    { name: "Women's Fashion", link: '#' },
    { name: 'Electronics', link: '#' },
    { name: 'Home Appliances', link: '#' },
  ];

  return (
    <div className="bg-[#14324A] text-white py-16 font-[Inter] pt-14 pb-10 px-5 sm:px-10 lg:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="text-3xl text-yellow-400" />
            <h3 className="text-2xl font-bold ">{companyName}</h3>
          </div>

          <p className="text-sm leading-6 mb-4">
            {companyName} is your one-stop online store offering a wide range
            of quality products with fast delivery and seamless service.
          </p>

          <div className="flex items-center space-x-4 mt-5">
            {socialLinks.map((social) => (
              <a key={social.id} href={social.url} className={`transition ${social.hover}`}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Useful Links" items={usefulLinks} />
        <FooterColumn title="Categories" items={categories} />
        <Newsletter />
      </div>

      {/* Bottom Strip */}
      <div className="border-t mt-10 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </div>
    </div>
  );
}
