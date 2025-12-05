// Header.jsx
import React, { useState } from "react";
import { ChevronDown, ShoppingBag, User, RefreshCcw } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Usecart } from "./UseCart";

const menuLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Products", link: "/products" },
  { id: 3, name: "Faq", link: "/faq" },
  { id: 4, name: "About", link: "/about" },
  { id: 5, name: "Contact", link: "/contact" },
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cartCount, toggleCart } = Usecart();

  const categories = [
    "Feature Product",
    "Best Sellers",
    "Offers On Sale"
  ];

  const handleCategoryClick = (cat) => {
    navigate(`/?section=${encodeURIComponent(cat)}`);
    setOpen(false);
  };

  const handleCategorySelect = (e) => {
    const value = e.target.value;
    if (value === "All Category") {
      navigate("/products");
    } else {
      navigate(`/products?category=${value}`);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-5">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center text-blue-600 font-bold text-2xl tracking-wide uppercase space-x-2">
              <FaShoppingBag className="text-3xl" />
              <span>SHOPZEN</span>
            </a>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 mx-8 max-w-3xl">
            <div className="flex items-center bg-amber-50 border border-amber-200 rounded-full shadow-inner overflow-hidden">
              <select
                onChange={handleCategorySelect}
                className="bg-transparent px-4 py-3 text-gray-700 border-r outline-none cursor-pointer"
              >
                <option>All Category</option>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>

              <input
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700"
                placeholder="What are you looking for?"
              />

              <button className="px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-50 text-white font-semibold shadow rounded-full">
                🔍
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6 text-gray-700">

            {/* LOGIN */}
            <Link
              to="/login"
              className="flex items-center gap-2 hover:text-emerald-600 transition"
            >
              <User size={18} />
              <span>Login</span>
            </Link>

            {/* CART */}
            <button
              className="relative hover:text-emerald-600 transition"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-1.5 rounded-full shadow">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* NAVBAR */}
        <nav className="bg-white">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">

            {/* CATEGORY DROPDOWN */}
            <div className="relative inline-block">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 font-medium text-gray-800 hover:text-emerald-600 transition"
              >
                Shop By Category
                <ChevronDown size={18} className={`${open ? "rotate-180" : ""} transition-transform`} />
              </button>

              {open && (
                <div className="absolute left-0 mt-3 w-60 bg-white shadow-lg rounded-lg z-50 border border-gray-200">
                  <ul className="py-3">
                    {categories.map((cat, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryClick(cat)}
                        className="px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition rounded"
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* NAV LINKS */}
            <ul className="hidden lg:flex items-center gap-6">
              {menuLinks.map((item) => (
                <li key={item.id}>
                  <a
                    className="text-gray-600 hover:text-blue-600 transition font-medium"
                    href={item.link}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-gray-700">
              <RefreshCcw size={16} />
              <span className="text-sm">Recently Viewed</span>
            </div>

          </div>
        </nav>
      </header>
    </>
  );
}



// import React, { useState } from 'react';
// import { IoMdSearch } from 'react-icons/io';
// import { FaShoppingBag } from 'react-icons/fa';
// import { HiMenuAlt3, HiX } from 'react-icons/hi';
// import { ShoppingCart } from 'lucide-react';
// import { Usecart } from './Usecart';
// import '../index.css';

// const menuLinks = [
//   { id: 1, name: 'Home', link: '/' },
//   { id: 2, name: 'Products', link: '/products' },
//   { id: 3, name: 'Faq', link: '/faq' },
//   { id: 4, name: 'About', link: '/about' },
//   { id: 5, name: 'Contact', link: '/contact' }
// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartSidebarOpen, setCartSidebarOpen] = useState(false);

//   // Destructure all needed functions & state from Usecart
//   const { cartCount, cartItems, removeFromCart } = Usecart();

//   return (
//     <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       {/* ===== Main Header ===== */}
//       <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <a
//           href="#"
//           className="flex items-center text-blue-600 font-bold text-2xl tracking-wide uppercase space-x-2"
//         >
//           <FaShoppingBag className="text-3xl" />
//           <span>SHOPZEN</span>
//         </a>

//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex items-center gap-6">
//           {menuLinks.map((item) => (
//             <li key={item.id}>
//               <a
//                 href={item.link}
//                 className="text-gray-600 hover:text-blue-600 transition font-medium"
//               >
//                 {item.name}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Actions */}
//         <div className="flex items-center gap-4">
//           {/* Hover Search */}
//           <div className="relative group hidden sm:block">
//             <IoMdSearch className="text-xl text-gray-600 cursor-pointer" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 opacity-0 group-hover:w-64 group-hover:opacity-100 transition-all duration-300 bg-white border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none"
//             />
//           </div>

//           {/* Cart Icon */}
//           <div
//             className="relative cursor-pointer"
//             onClick={() => setCartSidebarOpen(true)}
//           >
//             <ShoppingCart className="text-gray-700" size={24} />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
            
            
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="text-2xl text-gray-700 lg:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
//           </button>
//         </div>
//       </div>

//       {/* ===== Mobile Menu ===== */}
//       {mobileMenuOpen && (
//         <ul className="bg-white px-5 py-4 lg:hidden shadow-md space-y-3">
//           {menuLinks.map((item) => (
//             <li key={item.id}>
//               <a
//                 href={item.link}
//                 className="block text-gray-600 hover:text-blue-600 transition font-medium"
//               >
//                 {item.name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* ===== Cart Sidebar ===== */}
//       <div
//         className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//           cartSidebarOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-xl font-bold">Shopping Cart</h2>
//           <button
//             onClick={() => setCartSidebarOpen(false)}
//             className="text-xl font-bold"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Sidebar Content */}
//         <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">
//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-4 items-center border-b pb-2"
//               >
//                 <img
//                   src={item.mainImage}
//                   alt={item.title}
//                   className="w-16 h-20 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium text-gray-800">{item.title}</h3>
//                   <p className="text-gray-500 text-sm">Size: {item.size || 'N/A'}</p>
//                   <p className="text-red-600 font-semibold">${item.discountedPrice}</p>
//                   <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 font-bold text-lg"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Sidebar Footer */}
//         {cartItems.length > 0 && (
//           <div className="p-4 border-t">
//             <p className="font-semibold text-gray-800">
//               Total: $
//               {cartItems.reduce(
//                 (total, item) => total + item.discountedPrice * item.quantity,
//                 0
//               )}
//             </p>
//             <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
//               Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }



// import React, { useState } from 'react'
// import { FaShoppingBag } from 'react-icons/fa';


// const menuLinks = [
//   { id: 1, name: 'Home', link: '/' },
//   { id: 2, name: 'Products', link: '/products' },
//   { id: 3, name: 'Purchase', link: '/purchase' },
//   { id: 4, name: 'About', link: '/about' },
//   { id: 5, name: 'Contact', link: '/contact' }

// ];

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   return (
//    <header className='fixed top-0 left-0 w-full z-50'>
//       <div className='max-w-7xl mx-auto flex justify-between items-center'>
//          <a href="" className='flex items-center text-2xl text-blue-700 uppercase'>
//           <FaShoppingBag className='text-3xl'/>
//           <span>Shopzen</span>
//          </a>
//       </div>

//       <ul className='hidden lg:flex items-center'>
//         {menuLinks.map((item) => (
//           <li key={item.id}>
//             <a href={item.link} className='font-medium text-gray-400 hover:text-blue-800'>
//               {item.name}
//             </a>
//           </li>
//         ))}

//       </ul>
//    </header>
//   )
// }