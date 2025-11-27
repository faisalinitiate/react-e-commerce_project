// import React, { useState } from "react";
// import { Star } from "lucide-react";

// // Sample reusable component
//  function ProductDetails({ product }) {
//   const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

//   return (
//     <div className="min-h-screen bg-white px-6 lg:px-16 py-10">
//       {/* Breadcrumb */}
//       <div className="text-sm text-gray-500 mb-6">
//         HOME / SHOP / MEN /{" "}
//         <span className="text-gray-800 font-medium">{product.title}</span>
//       </div>

//       {/* Main Product Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Left: Images */}
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Thumbnails */}
//           <div className="flex md:flex-col gap-3 justify-center">
//             {product.images.map((src, i) => (
//               <img
//                 key={i}
//                 src={src}
//                 alt={`Thumbnail ${i + 1}`}
//                 className="w-20 h-24 object-cover rounded-lg cursor-pointer border hover:border-gray-400 transition"
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="flex-1">
//             <img
//               src={product.mainImage}
//               alt={product.title}
//               className="w-full rounded-2xl shadow-md"
//             />
//           </div>
//         </div>

//         {/* Right: Product Info */}
//         <div className="flex flex-col justify-center space-y-6">
//           <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-snug">
//             {product.title}
//           </h1>

//           {/* Price and Discount */}
//           <div className="flex items-center gap-4">
//             <span className="text-gray-500 line-through text-lg">
//               ${product.originalPrice}
//             </span>
//             <span className="text-red-600 text-2xl font-bold">
//               ${product.discountedPrice}
//             </span>
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={18}
//                 className={
//                   i < product.rating
//                     ? "text-yellow-500 fill-yellow-500"
//                     : "text-gray-300"
//                 }
//               />
//             ))}
//             <span className="text-gray-600 text-sm ml-2">
//               ({product.reviewsCount})
//             </span>
//           </div>

//           {/* Short Description */}
//           <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//             {product.shortDescription}
//           </p>

//           {/* Size Selection */}
//           <div>
//             <h3 className="text-gray-700 font-semibold mb-2">Select Size</h3>
//             <div className="flex gap-3 flex-wrap">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 border rounded-md text-sm font-medium ${
//                     selectedSize === size
//                       ? "bg-gray-900 text-white"
//                       : "bg-white text-gray-700 hover:bg-gray-100"
//                   } transition`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Add to Cart */}
//           <button className="mt-4 bg-red-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-red-700 transition">
//             ADD TO CART
//           </button>

//           {/* Category & Tags */}
//           <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
//             <p>
//               <span className="font-semibold text-gray-700">Category:</span>{" "}
//               {product.category.join(", ")}
//             </p>
//             <p>
//               <span className="font-semibold text-gray-700">Tags:</span>{" "}
//               {product.tags.join(", ")}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Extended Content Section */}
//       <div className="mt-16 space-y-16">
//         {/* Product Details */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Product Details
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             {product.longDescription}
//           </p>
//         </section>

//         {/* Specifications */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Specifications
//           </h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             {product.specs.map((spec, i) => (
//               <div key={i} className="flex justify-between border-b pb-2">
//                 <span className="text-gray-700 font-medium">{spec.label}</span>
//                 <span className="text-gray-600">{spec.value}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Customer Reviews */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Customer Reviews
//           </h2>
//           <div className="space-y-6">
//             {product.reviews.map((review, i) => (
//               <div key={i} className="border-b pb-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-gray-700">{review.user}</h3>
//                   <div className="flex gap-1">
//                     {[...Array(5)].map((_, j) => (
//                       <Star
//                         key={j}
//                         size={15}
//                         className={
//                           j < review.rating
//                             ? "text-yellow-500 fill-yellow-500"
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mt-2">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Related Products */}
//         <section>
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Related Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {product.relatedProducts.map((item, i) => (
//               <div
//                 key={i}
//                 className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-medium text-gray-800 truncate">
//                     {item.name}
//                   </h3>
//                   <p className="text-red-600 font-semibold">${item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Bottom Large Image Section */}
//         <div className="mt-10">
//           <img
//             src={product.bottomBanner}
//             alt="Product showcase banner"
//             className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }





// const sampleProduct = {
//   title: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//   originalPrice: 120,
//   discountedPrice: 82,
//   rating: 4,
//   reviewsCount: 122,
//   shortDescription:
//     "A lightweight, usually knitted pullover shirt, close-fitting with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//   longDescription:
//     "Crafted from high-quality cotton blend fabric, this bomber jacket combines comfort with style. The slim fit ensures a modern silhouette, while the zippered closure and elastic cuffs provide practicality. Ideal for layering during spring and autumn, it pairs perfectly with jeans or joggers.",
//   category: ["Men", "T-Shirt", "Crop Top"],
//   tags: ["Modern", "Latest"],
//   sizes: ["S", "M", "L", "XL", "XXL"],
//   images: [
//     "/images/jacket1.png",
//     "/images/jacket2.png",
//     "/images/jacket3.png",
//     "/images/jacket4.png",
//   ],
//   mainImage: "/images/jacket-main.png",
//   bottomBanner: "/images/jacket-bottom-banner.png",
//   specs: [
//     { label: "Material", value: "Cotton Blend" },
//     { label: "Fit", value: "Slim Fit" },
//     { label: "Closure", value: "Zipper" },
//     { label: "Occasion", value: "Casual Wear" },
//     { label: "Wash Care", value: "Machine Wash" },
//   ],
//   reviews: [
//     {
//       user: "John Doe",
//       rating: 5,
//       comment: "Great quality and fits perfectly!",
//     },
//     {
//       user: "Alex R.",
//       rating: 4,
//       comment: "Color is slightly different but overall nice jacket.",
//     },
//   ],
//   relatedProducts: [
//     {
//       name: "Men Black Bomber Jacket",
//       image: "/images/jacket-black.png",
//       price: 95,
//     },
//     {
//       name: "Men Navy Blue Hoodie",
//       image: "/images/hoodie-blue.png",
//       price: 72,
//     },
//     {
//       name: "Men Grey Sweatshirt",
//       image: "/images/sweatshirt-grey.png",
//       price: 60,
//     },
//     {
//       name: "Men Olive Windbreaker",
//       image: "/images/jacket-olive.png",
//       price: 88,
//     },
//   ],
// };

// export default function Home() {
//   return <ProductDetails product={sampleProduct} />;
// }





import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import casualwear from "../assets/casualwear.jpg";
import newsale from "../assets/newsale.jpg";
import bannerone from  "../assets/bannerone.jpg";
import bannertwo from  "../assets/bannertwo.jpg";
import bannerthree from  "../assets/bannerthree.jpg";
import bag from "../assets/bag.jpg";
import jeans from "../assets/jeans.jpg";
import perfume from "../assets/perfume.jpg";
import cosmetics from "../assets/cosmetics.jpg";
import sneakers from "../assets/sneakers.jpg";
import skincare from "../assets/skincare.jpg";

import { Star } from "lucide-react";
import { FaClock, FaShippingFast, FaHeadset, FaTag } from "react-icons/fa";
import "../index.css";


const slides = [
    {
      id: 1,
      img: bannerone,
      title: "Premium Fashion Collection",
      subtitle: "Explore the latest arrivals",
    },
    {
      id: 2,
      img: bannertwo,
      title: "Modern Trends",
      subtitle: "Style that makes you confident",
    },
    {
      id: 3,
      img: bannerthree,
      title: "Season Sale",
      subtitle: "Up to 50% off on selected items",
    }
  ];

export  function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    cssEase: "ease-in-out",
  };

  

  return (
    <div className="w-full relative overflow-hidden my-10">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[80vh]">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* CONTENT OVERLAY */}
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white text-lg md:text-2xl mt-3 drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}



// Optimized Hero Slider component


export default function Home() {
  const categories = [
    { name: "Jeans", img: jeans },
    { name: "Perfume", img: perfume },
    { name: "Sneakers", img: sneakers},
    { name: "Cosmetics", img: cosmetics },
    { name: "Bags", img: bag },
    { name: "Skin Care", img: skincare }
    // { name: "Skin Care", img: "/assets/images/featured-categorie/7.png" },
    // { name: "Jewelry", img: "/assets/images/featured-categorie/8.png" },
  ];
  const ITEMS = [
  { title: "Wireless Headphones", price: 120, old: 200, tag: "New", reviews: 130 },
  { title: "Blue Bag with Lock", price: 160, old: 180, tag: "Sale", reviews: 120 },
  { title: "Stylish Pink Top", price: 150, old: 200, tag: "New", reviews: 150 },
  { title: "Brown Com Boots", price: 120, old: 150, tag: "Sale", reviews: 120 },
  { title: "Winter Sweater", price: 110, old: 130, tag: "New", reviews: 160 },
  { title: "Blue Kids Shoes", price: 180, old: 200, tag: "Sale", reviews: 130 },
  { title: "Stylish Bag", price: 170, old: 200, tag: "New", reviews: 120 },
  { title: "Finger Rings", price: 100, old: 130, tag: "Sale", reviews: 120 }
];

function Stars({ value }) {
  return (
    <div className="flex items-center text-yellow-500 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < Math.round(value) ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      {/* ===== Optimized HERO SLIDER ===== */}
      <HeroSlider slides={HeroSlider} />

      {/* ===== FEATURED PRODUCTS (Exclusive Design) ===== */}

<section className="container mx-auto mt-10 px-4 py-10">
      {/* ======================= FEATURED CATEGORIES ======================= */}
      <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-10">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center font-bold bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="size-38 object-contain mb-2"
            />
            <span className="text-sm text-gray-800">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* ======================= EXCITING OFFERS ======================= */}
      <section>
<h2 className="text-2xl font-semibold mt-12 mb-6">Exciting Offers</h2>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* LEFT CARD — Stylish Coat */}
<div
className="relative rounded-xl overflow-hidden bg-cover bg-center flex items-center justify-center"
style={{ backgroundImage: `url(${casualwear})` }}
>
<div className="bg-black/20 absolute inset-0"></div>


<div className="relative p-8 text-white max-w-sm text-center">
<h3 className="text-3xl font-bold mb-2">Stylish Coat</h3>


<div className="text-2xl font-bold text-green-300">
$80 <span className="line-through text-gray-200 text-lg ml-2">$150</span>
</div>


{/* Countdown */}
<div className="flex justify-center gap-3 mt-5">
{["Days", "Hours", "Mins", "Secs"].map((label, i) => (
<div
key={i}
className="text-center border border-white/50 rounded-md px-3 py-2"
>
<div className="text-xl font-bold">00</div>
<div className="text-xs">{label}</div>
</div>
))}
</div>


<button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md">
Shop Now
</button>
</div>
</div>


{/* RIGHT CARD — New Year Sale */}
<div
className="relative rounded-xl overflow-hidden bg-cover bg-center flex items-center justify-center"
style={{ backgroundImage: `url(${newsale})` }}
>
<div className="bg-black/20 absolute inset-0"></div>


<div className="relative p-8 text-white max-w-sm text-center">
<h3 className="text-4xl font-bold mb-2">New Year Sale</h3>
<p className="text-xl font-medium mb-4">Up To 70% Off</p>


<button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md">
Shop Now
</button>
</div>
</div>
</div>
</section>
    </section>

{/* ***Product Grid*** */}
  <h1 className="text-3xl font-semibold ml-12 mt-12 mb-6">Trending Products</h1>
<div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 
  {ITEMS.map((item, i) => (
    <div key={i} className="bg-white border rounded-lg shadow p-4 flex flex-col items-center text-center">
     
      <div className="relative w-68 h-28 flex items-center justify-center overflow-hidden">
        <img src={"../assets/wintersweater.jpg"} alt={item.title} className="object-cover h-full" />
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold text-white ${
            item.tag === "New" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {item.tag}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-800">{item.title}</h3>

      <div className="mt-2">
        <span className="block font-bold text-gray-900">${item.price.toFixed(2)}</span>
        <span className="text-xs line-through text-gray-400">${item.old.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-center space-x-2 mt-3">
        <Stars value={4} />
        <span className="text-xs text-gray-500">{item.reviews}</span>
      </div>

      <button className="mt-4 w-full border border-gray-300 rounded py-2 text-sm hover:bg-gray-100">
        Shop Now
      </button>
    </div>
  ))}
</div>

  

      <Footer />
    </div>
  );
}
