import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import TrendingDetails from "./pages/TrendingDeatils";

import Header from "./common/Header.jsx";
import Footer from "./common/Footer.jsx";
import CartSideBar  from "./common/CartSideBar.jsx";
import { CartProvider } from "./common/Usecart.jsx"; // ⬅ IMPORTANT




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "faq",
    element: <Faq />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/trending/:id",
    element: <TrendingDetails />,   // ⬅ ADD THIS
  },
  { 
    path: "/login", 
    element: <Login /> 
  },

]);


export default function App() {
  return (
    <CartProvider>
      {/* Global Layout */}
   

      {/* Sidebar must stay mounted globally */}
      <CartSideBar/>

      {/* Page Content */}
      <RouterProvider router={router} />

 
    </CartProvider>
  );
}


// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Home from "./pages/Home";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,

//   },

// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

// import React, { useState } from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import './index.css';

// const socialLinks = [
//   { id: 1, icon: <FaFacebookF />, url: '#', hover: 'hover:text-blue-600' },
//   { id: 2, icon: <FaTwitter />, url: '#', hover: 'hover:text-blue-400' },
//   { id: 3, icon: <FaInstagram />, url: '#', hover: 'hover:text-pink-500' },
//   { id: 4, icon: <FaLinkedinIn />, url: '#', hover: 'hover:text-blue-500' },
// ];

// const FooterColumn = ({ title, items }) => (
//   <div>
//     <h4 className="text-lg font-semibold mb-4">{title}</h4>
//     <ul className="space-y-3 text-sm">
//       {items.map((item, idx) => (
//         <li key={idx}>
//           <a href={item.link} className="hover:text-blue-600 transition">
//             {item.name}
//           </a>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const Newsletter = () => {
//   const [email, setEmail] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) return;
//     setSubmitted(true);
//     setTimeout(() => {
//       setEmail('');
//       setSubmitted(false);
//     }, 3000);
//   };

//   return (
//     <div>
//       <h4 className="text-lg font-semibold mb-4">Join Our Newsletter</h4>
//       <p className="text-sm mb-4">Subscribe to receive updates, exclusive offers and more.</p>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3"
//       >
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
//         >
//           Subscribe
//         </button>
//       </form>
//       {submitted && (
//         <p className="text-green-600 text-sm mt-3">Thanks for subscribing!</p>
//       )}
//     </div>
//   );
// };

// export default function App() {
//   const companyName = 'Eshopify';
//   const usefulLinks = [
//     { name: 'About Us', link: '#' },
//     { name: 'Contact', link: '#' },
//     { name: 'Privacy Policy', link: '#' },
//     { name: 'Terms & Conditions', link: '#' },
//   ];

//   const categories = [
//     { name: "Men's Fashion", link: '#' },
//     { name: "Women's Fashion", link: '#' },
//     { name: 'Electronics', link: '#' },
//     { name: 'Home Appliances', link: '#' },
//   ];

//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-14 pb-10 px-5 sm:px-10 lg:px-24">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

//         {/* Column 1: About + Social Icons */}
//         <div>
//           <h3 className="text-2xl font-bold text-blue-600 mb-4">{companyName}</h3>
//           <p className="text-sm">
//             {companyName} is your one-stop online store offering a wide range of quality products with fast delivery and seamless service.
//           </p>
//           <div className="flex items-center space-x-4 mt-5">
//             {socialLinks.map((social) => (
//               <a key={social.id} href={social.url} className={`transition ${social.hover}`}>
//                 {social.icon}
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Column 2: Useful Links */}
//         <FooterColumn title="Useful Links" items={usefulLinks} />

//         {/* Column 3: Categories */}
//         <FooterColumn title="Categories" items={categories} />

//         {/* Column 4: Newsletter */}
//         <Newsletter />
//       </div>

//       {/* Bottom Strip */}
//       <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
//         © {new Date().getFullYear()} {companyName}. All rights reserved.
//       </div>
//     </div>
//   );
// }



// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import React from 'react'
// import Home from "./pages/Home.jsx";
// import Shop from "./pages/Shop.jsx";

// const router = createBrowserRouter([
//   {
//   path: '/', 
//   element: '</Home>'
//   },
//   {
//   path: '/', 
//   element: '</Shop>'
//   },


// ])



// export default function App() {
//   return (
//     <RouterProvider router = {router}/>
//   )
// }



// // import React from 'react'
// // import './index.css'

// // export default function App() {
// //   return (
// //     <div className='w-[90%] bg-yellow-400 mx-auto'>
// //       <div className='bg-blue-800 text-white text-center'>App</div>
// //     </div>
    
// //   )
// // }


// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App
