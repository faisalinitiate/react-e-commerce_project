import React, { useMemo, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";



export default function Product() {





  const SIDEBAR_IMG = "https://placehold.co/80x80?text=F"; // sidebar icon
  // --- Helper lists ---
  const ALL_COLORS = ["Green", "Blue", "Red", "Brown", "Yellow", "White", "Black", "Pink"];
  const ALL_SIZES = ["XS", "Small", "Medium", "Large", "XL"];


  const baseProducts = [
    {
      id: 1,
      name: "Men",
      price: 79,
      category: "Men",
      image: "https://placehold.co/600x800?text=T-Shirt",
     
    },
    {
      id: 2,
      name: "Women",
      price: 39,
      category: "Women",
      image: "https://placehold.co/600x800?text=Hoodie",
    
    },
    {
      id: 3,
      name: "Kids",
      price: 119,
      category: "Kids",
      image: "https://placehold.co/600x800?text=T-Shirt",
     
    },
    {
      id: 4,
      name: "Men",
      price: 149,
      category: "Accessories",
      image: "https://placehold.co/1600x500?text=Shop+Collection",
    
    },
    {
      id: 5,
      name: "Women",
      price: 79,
      category: "Women",
      image: "https://placehold.co/600x800?text=T-Shirt",
  
    },
    {
      id: 6,
      name: "Kids",
      price: 39,
      category: "Men",
      image: "https://placehold.co/600x800?text=T-Shirt",
 
    },
    {
      id: 7,
      name: "Accessories",
      price: 119,
      category: "Accessories",
      image: "https://placehold.co/600x800?text=T-Shirt",
     
    },
    {
      id: 8,
      name: "Accessories",
      price: 149,
      category: "Kids",
      image: "https://placehold.co/600x800?text=T-Shirt",
     
    },
  ];

  // --- Map baseProducts into richer PRODUCTS used by the shop UI ---
  const PRODUCTS = useMemo(() => {
    return baseProducts.map((p, idx) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      oldPrice: Math.round(p.price * 1.25), // simple old price
      rating: 50 + ((p.id * 13) % 160), // deterministic-ish rating
      colors: p.category === "Shoes" ? ["White", "Black"] : ["Blue"], // simple mapping
      sizes: p.category === "Hoodies" || p.category === "Jackets" ? ["Small", "Medium", "Large"] : [],
      img: p.image,
      offer: p.offer,
      upcomingOffer: p.upcomingOffer,
    }));
  }, [baseProducts]);

  // --- UI state ---
  const location = useLocation();

// read category from query ?category=Men
const urlParams = new URLSearchParams(location.search);
const categoryFromURL = urlParams.get("category");

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState("default");
const [activeCategory, setActiveCategory] = useState(() => {
  return categoryFromURL || "All";
});

// UPDATE when URL changes
useEffect(() => {
  if (categoryFromURL) {
    setActiveCategory(categoryFromURL);
  }
}, [categoryFromURL]);
  // --- derive categories & counts from PRODUCTS ---
  const categories = useMemo(() => {
    const counts = PRODUCTS.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const list = [{ name: "All", count: PRODUCTS.length }];
    Object.keys(counts)
      .sort()
      .forEach((cat) => list.push({ name: cat, count: counts[cat] }));
    return list;
  }, [PRODUCTS]);

  // --- toggle helpers ---
  function toggleColor(color) {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
    setVisibleCount(12);
  }
  function toggleSize(size) {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    setVisibleCount(12);
  }

  // --- filter & sort logic ---
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.slice();

    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    const min = priceMin === "" ? Number.NEGATIVE_INFINITY : Number(priceMin);
    const max = priceMax === "" ? Number.POSITIVE_INFINITY : Number(priceMax);
    list = list.filter((p) => p.price >= min && p.price <= max);

    if (selectedColors.length > 0) list = list.filter((p) => p.colors && p.colors.some((c) => selectedColors.includes(c)));

    if (selectedSizes.length > 0) list = list.filter((p) => p.sizes && p.sizes.some((s) => selectedSizes.includes(s)));

    if (sortBy === "priceLow") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHigh") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => a.id - b.id);

    return list;
  }, [PRODUCTS, activeCategory, selectedColors, selectedSizes, priceMin, priceMax, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // --- handlers ---
  const gridRef = useRef(null);
  function handleSelectCategory(cat) {
    setActiveCategory(cat);
    setVisibleCount(12);
    if (gridRef.current) gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function handleApplyPrice(e) {
    e && e.preventDefault && e.preventDefault();
    setVisibleCount(12);
  }
  function handleLoadMore() {
    setVisibleCount((v) => Math.min(v + 12, filteredProducts.length));
  }
  function handleClearFilters() {
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceMin("");
    setPriceMax("");
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("default");
    setVisibleCount(12);
  }

  // --- Stars component ---
const Stars = ({ size = 14 }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} size={size} />
    ))}
  </div>
);

  return (
    <div className="min-h-screen w-full">
      <div className="w-full mx-auto">
        <Header />

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
          {/* Sidebar */}
          <aside className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-md p-5">
            <div className="flex items-center gap-3 mb-4">
              <img src={SIDEBAR_IMG} alt="icon" className="w-10 h-10 object-cover rounded-lg shadow-sm" />
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
                <p className="text-xs text-slate-500">Narrow down results</p>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(12); }}
                className="w-full rounded-xl border border-white/40 bg-white/60 placeholder:text-slate-400 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <div className="mb-4 sm:shadow-sm">
              <h3 className="font-semibold text-lg mb-3 border-b-4 border-yellow-400 inline-block pb-1">
  Categories
</h3>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c.name}>
                    <button
                      onClick={() => handleSelectCategory(c.name)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg transition ${activeCategory === c.name ? "bg-amber-50 ring-1 ring-amber-200 text-amber-700" : "hover:bg-white/50"}`}
                    >
                      <span className="font-medium text-sm">{c.name}</span>
                      <span className="text-xs text-slate-500">({c.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 sm:shadow-sm">
             <h3 className="font-semibold text-lg mb-3 border-b-4 border-yellow-400 inline-block pb-1">
  Filter by Price
</h3>
              <form onSubmit={handleApplyPrice} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-lg border border-white/40 bg-white/60 py-2 px-3 text-sm" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                  <input className="rounded-lg border border-white/40 bg-white/60 py-2 px-3 text-sm" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 rounded-lg py-2 text-sm font-semibold bg-amber-500 text-white shadow">Apply</button>
                  <button type="button" onClick={() => { setPriceMin(""); setPriceMax(""); setVisibleCount(12); }} className="flex-1 rounded-lg py-2 text-sm border border-white/40 bg-white/60">Reset</button>
                </div>
              </form>
            </div>

            <div className="mb-4 sm:shadow-sm">
         <h3 className="font-semibold text-lg mb-3 border-b-4 border-yellow-200 inline-block pb-1">
  Color
</h3>
              <ul className="grid grid-cols-2 gap-2">
                {ALL_COLORS.map((color) => (
                  <li key={color}>
                    <label className="flex items-center gap-2 cursor-pointer select-none p-2 rounded-lg hover:bg-white/40">
                      <input type="checkbox" checked={selectedColors.includes(color)} onChange={() => toggleColor(color)} className="h-4 w-4 rounded border-white/40 bg-white/60 text-amber-500 focus:ring-0" />
                      <span className="flex-1 text-sm font-medium text-slate-700">{color}</span>
                      <span className="text-xs text-slate-500">({PRODUCTS.filter(p => p.colors && p.colors.includes(color)).length})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 sm:shadow-sm">
    <h3 className="font-semibold text-lg mb-3 border-b-4 border-yellow-200 inline-block pb-1">
  Size
</h3>
              <ul className="grid grid-cols-3 gap-2">
                {ALL_SIZES.map((size) => (
                  <li key={size}>
                    <label className="flex items-center gap-2 cursor-pointer select-none p-2 rounded-lg hover:bg-white/40">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleSize(size)} className="h-4 w-4 rounded border-white/40 bg-white/60 text-amber-500 focus:ring-0" />
                      <span className="flex-1 text-sm font-medium text-slate-700">{size}</span>
                      <span className="text-xs text-slate-500">({PRODUCTS.filter(p => p.sizes && p.sizes.includes(size)).length})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <button onClick={handleClearFilters} className="w-full rounded-xl py-2 text-sm font-semibold bg-white/70 border border-white/40">Clear all filters</button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">{activeCategory === "All" ? "All Products" : activeCategory}</h2>
                <p className="text-sm text-slate-500">Showing <span className="font-medium text-slate-700">{Math.min(visibleCount, filteredProducts.length)}</span> of <span className="font-medium text-slate-700">{filteredProducts.length}</span> items</p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-500">Sort by</label>
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setVisibleCount(12); }} className="rounded-xl border border-white/40 bg-white/60 py-2 px-3 text-sm">
                  <option value="default">Default</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            <div ref={gridRef} id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((p) => (
                <article key={p.id} className="flex flex-col rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-inner hover:shadow-lg transition overflow-hidden">
                  <Link to={`/products/${p.id}`} className="relative block">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-white/60 to-white/40 flex items-center justify-center">
                      <img src={p.img} alt={p.name} className="object-contain max-h-full max-w-full" />
                    </div>
                    {p.oldPrice - p.price >= 30 && (
                      <div className="absolute top-3 left-3 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-semibold">Sale</div>
                    )}
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-md font-semibold text-slate-800">{p.name}</h3>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Stars />
                      <span className="text-sm text-slate-500">{p.rating}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="text-lg font-extrabold text-slate-800">${p.price.toFixed(2)}</div>
                      <div className="text-sm text-slate-500 line-through">${p.oldPrice.toFixed(2)}</div>
                    </div>

                    <div className="mt-3 text-sm text-slate-600 space-y-1">
                      <div><span className="font-medium text-slate-700">Category:</span> {p.category}</div>
                      {p.colors && p.colors.length > 0 && <div><span className="font-medium text-slate-700">Colors:</span> {p.colors.join(", ")}</div>}
                      {p.sizes && p.sizes.length > 0 && <div><span className="font-medium text-slate-700">Sizes:</span> {p.sizes.join(", ")}</div>}
                                                            
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/30">
                      {/* View Details Link - redirects to ProductDetails.jsx route */}
                      <Link to={`/products/${p.id}`} className="block mt-2 py-2.5 px-6 rounded-xl font-semibold bg-amber-400 text-white transition-all duration-400 hover:bg-yellow-300 hover:shadow-lg hover:-translate-y-1 text-center">
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load more / no results */}
            <div className="flex justify-center">
              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 p-6 text-center text-slate-600">No products match your filters.</div>
              ) : visibleCount < filteredProducts.length ? (
                <button onClick={handleLoadMore} className="rounded-xl py-2 px-6 bg-white/60 border border-white/30 shadow hover:shadow-md">Load More</button>
              ) : null}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}


// import React from 'react';
// import Header from "../common/Header";
// import Footer from "../common/Footer";
// import '../index.css';
// import { Link } from "react-router-dom";

// export default function Products() {

//   // Sample products (unchanged)
//   const products = [
//     {
//       id: 1,
//       name: "Urban Hoodie",
//       price: 79,
//       category: "Hoodies",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//       offer: true,
//       upcomingOffer: false,
//     },
//     {
//       id: 2,
//       name: "Summer Tee",
//       price: 39,
//       category: "T-Shirts",
//       image: "https://placehold.co/600x800?text=Hoodie",
//       offer: false,
//       upcomingOffer: true,
//     },
//     {
//       id: 3,
//       name: "Denim Jacket",
//       price: 119,
//       category: "Jackets",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//       offer: false,
//       upcomingOffer: false,
//     },
//     {
//       id: 4,
//       name: "Street Sneakers",
//       price: 149,
//       category: "Shoes",
//       image: "https://placehold.co/1600x500?text=Shop+Collection",
//       offer: true,
//       upcomingOffer: false,
//     },
//     {
//       id: 5,
//       name: "Urban Hoodie",
//       price: 79,
//       category: "Hoodies",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//       offer: false,
//       upcomingOffer: false,
//     },
//     {
//       id: 6,
//       name: "Summer Tee",
//       price: 39,
//       category: "T-Shirts",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//       offer: true,
//       upcomingOffer: true,
//     },
//     {
//       id: 7,
//       name: "Denim Jacket",
//       price: 119,
//       category: "Jackets",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//       offer: false,
//       upcomingOffer: false,
//     },
//     {
//       id: 8,
//       name: "Street Sneakers",
//       price: 149,
//       category: "Shoes",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//       offer: true,
//       upcomingOffer: false,
//     },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Header />

//       <div className="container mx-auto px-6 py-10">

//         {/* ✔ REMOVED Category Filter + Sorting Section */}

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="
//                 group relative rounded-2xl overflow-hidden shadow-md bg-white 
//                 transition-all duration-500 
//                 hover:shadow-2xl hover:-translate-y-2 
//                 border border-gray-200 hover:border-teal-600
//               "
//             >

//               {/* Soft Background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-teal-50 opacity-70 group-hover:opacity-90 transition"></div>

//               {/* Image */}
//               <Link to={`/products/${product.id}`}>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="
//                     relative z-10 w-full h-72 object-cover 
//                     transition-all duration-500 
//                     group-hover:scale-110 group-hover:brightness-105
//                   "
//                 />
//               </Link>

//               {/* Content */}
//               <div className="relative z-20 p-5 text-center">

//                 {/* Category */}
//                 <span
//                   className="
//                     inline-block mb-3 px-4 py-1 text-sm 
//                     rounded-full bg-sage-200 text-slate-700 
//                     transition-all duration-300 
//                     group-hover:bg-teal-200 group-hover:text-teal-900
//                   "
//                 >
//                   {product.category}
//                 </span>

//                 {/* Name */}
//                 <h2 className="text-lg font-semibold text-slate-800 group-hover:text-teal-700 transition">
//                   {product.name}
//                 </h2>

//                 {/* Extra description */}
//                 <p className="mt-1 text-sm text-gray-500 leading-relaxed">
//                   Premium quality · Sustainable material · Limited edition release
//                 </p>

//                 {/* Price */}
//                 <div className="flex items-center justify-center gap-3 mt-3">
//                   <span className="text-lg font-bold text-yellow-600">
//                     ${product.price}
//                   </span>
//                 </div>

//                 {/* CTA */}
//                 <Link
//                   to={`/products/${product.id}`}
//                   className="
//                     block mt-5 py-2.5 px-6 rounded-xl font-semibold 
//                     bg-teal-600 text-white 
//                     transition-all duration-400
//                     hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-200 
//                     hover:-translate-y-1
//                   "
//                 >
//                   View Details
//                 </Link>

//                 {/* Offer Labels */}
//                 {product.offer && (
//                   <p className="mt-2 text-green-600 text-sm font-semibold">
//                     On Offer!
//                   </p>
//                 )}
//                 {product.upcomingOffer && (
//                   <p className="mt-2 text-orange-500 text-sm font-semibold">
//                     Upcoming Offer
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// import React, { useMemo, useState, useRef } from "react";
// import Header from "../common/Header";
// import Footer from "../common/Footer";
// import { DiJava } from "react-icons/di";

// export default function ShopSingleFileWithFilters() {
//   // --- Image paths from your uploaded files ---
//   const PLACEHOLDER_IMG = "/mnt/data/fproducts.jpg";
//   const SIDEBAR_IMG = "/mnt/data/arrow.jpg";

//   // --- Helper: possible values for colors & sizes ---
//   const ALL_COLORS = ["Green", "Blue", "Red", "Brown", "Yellow", "White", "Black", "Pink"];
//   const ALL_SIZES = ["XS", "Small", "Medium", "Large", "XL"];

//   // --- Full product list (same data as before) ---
//   const PRODUCTS = useMemo(() => [
//     { id: 1, name: "Wireless Headphones", category: "Headphones", price: 120, oldPrice: 200, rating: 130, colors: ["Black"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 2, name: "Blue Bag with Lock", category: "Bags", price: 160, oldPrice: 190, rating: 120, colors: ["Blue"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 3, name: "Stylish Pink Top", category: "Fashion", price: 150, oldPrice: 200, rating: 150, colors: ["Pink"], sizes: ["Small","Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 4, name: "Brown Com Boots", category: "Shoes", price: 120, oldPrice: 150, rating: 120, colors: ["Brown"], sizes: ["Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 5, name: "Winter Sweater", category: "Winter Ware", price: 110, oldPrice: 130, rating: 160, colors: ["Red","White"], sizes: ["Small","Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 6, name: "Blue Kids Shoes", category: "Kids", price: 180, oldPrice: 200, rating: 130, colors: ["Blue"], sizes: ["XS","Small"], img: PLACEHOLDER_IMG },
//     { id: 7, name: "Stylish Bag", category: "Bags", price: 170, oldPrice: 200, rating: 120, colors: ["Brown","White"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 8, name: "Finger Rings", category: "Fashion", price: 100, oldPrice: 130, rating: 120, colors: ["Gold","White"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 9, name: "Pink Baby Shoes", category: "Kids", price: 120, oldPrice: 200, rating: 130, colors: ["Pink"], sizes: ["XS"], img: PLACEHOLDER_IMG },
//     { id: 10, name: "Parple Pant", category: "Fashion", price: 120, oldPrice: 200, rating: 130, colors: ["Purple"], sizes: ["Medium","Large"], img: PLACEHOLDER_IMG },

//     { id: 11, name: "Men's Slim Shirt", category: "Men Fashion", price: 85, oldPrice: 140, rating: 90, colors: ["Blue","White"], sizes: ["Medium","Large","XL"], img: PLACEHOLDER_IMG },
//     { id: 12, name: "Woman Floral Dress", category: "Woman Fashion", price: 130, oldPrice: 210, rating: 200, colors: ["Pink","White"], sizes: ["Small","Medium"], img: PLACEHOLDER_IMG },
//     { id: 13, name: "Classic Watch", category: "Watch", price: 250, oldPrice: 330, rating: 75, colors: ["Black"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 14, name: "Baseball Hat", category: "Hats", price: 25, oldPrice: 40, rating: 35, colors: ["White","Blue"], sizes: ["XS","Small"], img: PLACEHOLDER_IMG },
//     { id: 15, name: "Kids Hoodie", category: "Kids", price: 45, oldPrice: 70, rating: 50, colors: ["Green","Blue"], sizes: ["XS","Small"], img: PLACEHOLDER_IMG },
//     { id: 16, name: "Noise Cancelling Earbuds", category: "Headphones", price: 90, oldPrice: 150, rating: 88, colors: ["White","Black"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 17, name: "Winter Coat", category: "Winter Ware", price: 220, oldPrice: 300, rating: 210, colors: ["Brown","Black"], sizes: ["Medium","Large","XL"], img: PLACEHOLDER_IMG },
//     { id: 18, name: "Leather Boots", category: "Shoes", price: 140, oldPrice: 190, rating: 140, colors: ["Brown","Black"], sizes: ["Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 19, name: "Travel Backpack", category: "Bags", price: 95, oldPrice: 140, rating: 115, colors: ["Green","Blue"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 20, name: "Elegant Necklace", category: "Fashion", price: 200, oldPrice: 320, rating: 180, colors: ["Gold","White"], sizes: [], img: PLACEHOLDER_IMG },

//     { id: 21, name: "Running Sneakers", category: "Shoes", price: 110, oldPrice: 160, rating: 160, colors: ["White","Blue"], sizes: ["Small","Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 22, name: "Sunglasses", category: "Fashion", price: 60, oldPrice: 95, rating: 99, colors: ["Black","White"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 23, name: "Casual Belt", category: "Men Fashion", price: 35, oldPrice: 55, rating: 40, colors: ["Brown","Black"], sizes: ["Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 24, name: "Evening Gown", category: "Woman Fashion", price: 320, oldPrice: 450, rating: 210, colors: ["Pink","Red"], sizes: ["Small","Medium"], img: PLACEHOLDER_IMG },
//     { id: 25, name: "Sport Watch", category: "Watch", price: 180, oldPrice: 250, rating: 140, colors: ["Black","Blue"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 26, name: "Straw Hat", category: "Hats", price: 28, oldPrice: 45, rating: 42, colors: ["Brown"], sizes: ["Small"], img: PLACEHOLDER_IMG },
//     { id: 27, name: "Kids Playset", category: "Kids", price: 55, oldPrice: 80, rating: 60, colors: ["Red","Blue"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 28, name: "Wireless Charger", category: "Accessories", price: 40, oldPrice: 65, rating: 33, colors: ["White","Black"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 29, name: "Formal Shoes", category: "Shoes", price: 150, oldPrice: 220, rating: 125, colors: ["Black","Brown"], sizes: ["Medium","Large"], img: PLACEHOLDER_IMG },
//     { id: 30, name: "Crossbody Bag", category: "Bags", price: 75, oldPrice: 110, rating: 95, colors: ["Pink","Blue"], sizes: [], img: PLACEHOLDER_IMG },

//     { id: 31, name: "Ear Muffs", category: "Winter Ware", price: 20, oldPrice: 30, rating: 20, colors: ["White","Pink"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 32, name: "Fashion Scarf", category: "Fashion", price: 30, oldPrice: 55, rating: 65, colors: ["Red","White"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 33, name: "Kids Cap", category: "Kids", price: 15, oldPrice: 25, rating: 12, colors: ["Blue","Green"], sizes: ["XS"], img: PLACEHOLDER_IMG },
//     { id: 34, name: "Bluetooth Speaker", category: "Accessories", price: 75, oldPrice: 100, rating: 88, colors: ["Black"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 35, name: "Hat Fedora", category: "Hats", price: 45, oldPrice: 70, rating: 58, colors: ["Brown","Black"], sizes: ["Small","Medium"], img: PLACEHOLDER_IMG },
//     { id: 36, name: "Elegant Earrings", category: "Fashion", price: 85, oldPrice: 130, rating: 120, colors: ["Gold","White"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 37, name: "Men's Jacket", category: "Men Fashion", price: 200, oldPrice: 280, rating: 160, colors: ["Black","Brown"], sizes: ["Medium","Large","XL"], img: PLACEHOLDER_IMG },
//     { id: 38, name: "Women's Sandals", category: "Woman Fashion", price: 60, oldPrice: 85, rating: 90, colors: ["Pink","White"], sizes: ["Small","Medium"], img: PLACEHOLDER_IMG },
//     { id: 39, name: "Smart Watch Pro", category: "Watch", price: 330, oldPrice: 420, rating: 210, colors: ["Black"], sizes: [], img: PLACEHOLDER_IMG },
//     { id: 40, name: "Fashion Headband", category: "Fashion", price: 12, oldPrice: 18, rating: 5, colors: ["Pink","White"], sizes: [], img: PLACEHOLDER_IMG },
//   ], [PLACEHOLDER_IMG]);

//   // --- UI state ---
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [selectedColors, setSelectedColors] = useState([]); // multi-select
//   const [selectedSizes, setSelectedSizes] = useState([]); // multi-select
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(12); // show 12 initially
//   const [sortBy, setSortBy] = useState("default"); // default | priceLow | priceHigh | rating

//   // --- derive categories & counts from PRODUCTS ---
//   const categories = useMemo(() => {
//     const counts = PRODUCTS.reduce((acc, p) => {
//       acc[p.category] = (acc[p.category] || 0) + 1;
//       return acc;
//     }, {});
//     const list = [{ name: "All", count: PRODUCTS.length }];
//     Object.keys(counts).sort().forEach(cat => list.push({ name: cat, count: counts[cat] }));
//     return list;
//   }, [PRODUCTS]);

//   // --- handler helpers for checkbox toggles ---
//   function toggleColor(color) {
//     setSelectedColors(prev => prev.includes(color) ? prev.filter(c=>c!==color) : [...prev, color]);
//     setVisibleCount(12); // reset paging
//   }
//   function toggleSize(size) {
//     setSelectedSizes(prev => prev.includes(size) ? prev.filter(s=>s!==size) : [...prev, size]);
//     setVisibleCount(12);
//   }

//   // --- filter logic ---
//   const filteredProducts = useMemo(() => {
//     let list = PRODUCTS.slice();

//     if (activeCategory !== "All") {
//       list = list.filter(p => p.category === activeCategory);
//     }

//     if (searchQuery.trim()) {
//       const q = searchQuery.trim().toLowerCase();
//       list = list.filter(p => p.name.toLowerCase().includes(q));
//     }

//     const min = priceMin === "" ? Number.NEGATIVE_INFINITY : Number(priceMin);
//     const max = priceMax === "" ? Number.POSITIVE_INFINITY : Number(priceMax);
//     list = list.filter(p => p.price >= min && p.price <= max);

//     if (selectedColors.length > 0) {
//       list = list.filter(p => p.colors && p.colors.some(c => selectedColors.includes(c)));
//     }

//     if (selectedSizes.length > 0) {
//       list = list.filter(p => p.sizes && p.sizes.some(s => selectedSizes.includes(s)));
//     }

//     if (sortBy === "priceLow") {
//       list.sort((a,b)=>a.price - b.price);
//     } else if (sortBy === "priceHigh") {
//       list.sort((a,b)=>b.price - a.price);
//     } else if (sortBy === "rating") {
//       list.sort((a,b)=>b.rating - a.rating);
//     } else {
//       list.sort((a,b)=>a.id - b.id);
//     }

//     return list;
//   }, [PRODUCTS, activeCategory, selectedColors, selectedSizes, priceMin, priceMax, searchQuery, sortBy]);

//   const visibleProducts = filteredProducts.slice(0, visibleCount);

//   // --- Handlers ---
//   const gridRef = useRef(null);
//   function handleSelectCategory(cat) {
//     setActiveCategory(cat);
//     setVisibleCount(12);
//     if (gridRef.current) gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
//   function handleApplyPrice(e) {
//     e && e.preventDefault && e.preventDefault();
//     setVisibleCount(12);
//   }
//   function handleLoadMore() {
//     setVisibleCount(v => Math.min(v + 12, filteredProducts.length));
//   }
//   function handleClearFilters() {
//     setSelectedColors([]);
//     setSelectedSizes([]);
//     setPriceMin("");
//     setPriceMax("");
//     setSearchQuery("");
//     setActiveCategory("All");
//     setSortBy("default");
//     setVisibleCount(12);
//   }

//   // --- Stars (SVG) ---
//   const Stars = ({ size = 14 }) => (
//     <div className="flex items-center gap-1" aria-hidden>
//       {Array.from({length:5}).map((_,i)=>(
//         <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
//           <path d="M12 .587l3.668 7.431L23.4 9.75l-5.6 5.46L19.335 24 12 19.897 4.665 24l1.535-8.79L.6 9.75l7.732-1.732L12 .587z" />
//         </svg>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen w-full">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <Header />

//         <div className="grid lg:grid-cols-[320px_1fr] gap-6 bg-gradient-to-b from-slate-50 to-slate-100 py-10 px-4">
//           {/* SIDEBAR (glass card) */}
//           <aside className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-md p-5">
//             <div className="flex items-center gap-3 mb-4">
//               <img src={SIDEBAR_IMG} alt="icon" className="w-10 h-10 object-cover rounded-lg shadow-sm" />
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
//                 <p className="text-xs text-slate-500">Narrow down results</p>
//               </div>
//             </div>

//             {/* Search */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(12); }}
//                 className="w-full rounded-xl border border-white/40 bg-white/60 placeholder:text-slate-400 placeholder:border-2  py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
//               />
//             </div>

//             {/* Categories */}
//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-slate-700 mb-2">Categories</h4>
//               <ul className="space-y-2">
//                 {categories.map(c => (
//                   <li key={c.name}>
//                     <button
//                       onClick={() => handleSelectCategory(c.name)}
//                       className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg transition ${
//                         activeCategory === c.name ? "bg-amber-50 ring-1 ring-amber-200 text-amber-700" : "hover:bg-white/50"
//                       }`}
//                     >
//                       <span className="font-medium text-sm">{c.name}</span>
//                       <span className="text-xs text-slate-500">({c.count})</span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-slate-700 mb-2">Filter by price</h4>
//               <form onSubmit={handleApplyPrice} className="space-y-2">
//                 <div className="grid grid-cols-2 gap-2">
//                   <input className="rounded-lg border border-white/40 bg-white/60 py-2 px-3 text-sm" placeholder="Min" value={priceMin} onChange={(e)=>setPriceMin(e.target.value)} />
//                   <input className="rounded-lg border border-white/40 bg-white/60 py-2 px-3 text-sm" placeholder="Max" value={priceMax} onChange={(e)=>setPriceMax(e.target.value)} />
//                 </div>
//                 <div className="flex gap-2">
//                   <button type="submit" className="flex-1 rounded-lg py-2 text-sm font-semibold bg-amber-500 text-white shadow">Apply</button>
//                   <button type="button" onClick={()=>{setPriceMin(""); setPriceMax(""); setVisibleCount(12);}} className="flex-1 rounded-lg py-2 text-sm border border-white/40 bg-white/60">Reset</button>
//                 </div>
//               </form>
//             </div>

//             {/* Colors */}
//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-slate-700 mb-2">Color</h4>
//               <ul className="grid grid-cols-2 gap-2">
//                 {ALL_COLORS.map(color => (
//                   <li key={color}>
//                     <label className="flex items-center gap-2 cursor-pointer select-none p-2 rounded-lg hover:bg-white/40">
//                       <input
//                         type="checkbox"
//                         checked={selectedColors.includes(color)}
//                         onChange={()=>toggleColor(color)}
//                         className="h-4 w-4 rounded border-white/40 bg-white/60 text-amber-500 focus:ring-0"
//                       />
//                       <span className="flex-1 text-sm font-medium text-slate-700">{color}</span>
//                       <span className="text-xs text-slate-500">({PRODUCTS.filter(p=>p.colors && p.colors.includes(color)).length})</span>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Sizes */}
//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-slate-700 mb-2">Size</h4>
//               <ul className="grid grid-cols-3 gap-2">
//                 {ALL_SIZES.map(size => (
//                   <li key={size}>
//                     <label className="flex items-center gap-2 cursor-pointer select-none p-2 rounded-lg hover:bg-white/40">
//                       <input
//                         type="checkbox"
//                         checked={selectedSizes.includes(size)}
//                         onChange={()=>toggleSize(size)}
//                         className="h-4 w-4 rounded border-white/40 bg-white/60 text-amber-500 focus:ring-0"
//                       />
//                       <span className="flex-1 text-sm font-medium text-slate-700">{size}</span>
//                       <span className="text-xs text-slate-500">({PRODUCTS.filter(p=>p.sizes && p.sizes.includes(size)).length})</span>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-3">
//               <button onClick={handleClearFilters} className="w-full rounded-xl py-2 text-sm font-semibold bg-white/70 border border-white/40">Clear all filters</button>
//             </div>
//           </aside>

//           {/* MAIN PRODUCT AREA */}
//           <main className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-800">{activeCategory === "All" ? "All Products" : activeCategory}</h2>
//                 <p className="text-sm text-slate-500">Showing <span className="font-medium text-slate-700">{Math.min(visibleCount, filteredProducts.length)}</span> of <span className="font-medium text-slate-700">{filteredProducts.length}</span> items</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <label className="text-sm text-slate-500">Sort by</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e)=>{ setSortBy(e.target.value); setVisibleCount(12); }}
//                   className="rounded-xl border border-white/40 bg-white/60 py-2 px-3 text-sm"
//                 >
//                   <option value="default">Default</option>
//                   <option value="priceLow">Price: Low to High</option>
//                   <option value="priceHigh">Price: High to Low</option>
//                   <option value="rating">Top Rated</option>
//                 </select>
//               </div>
//             </div>

//             {/* Product grid */}
//             <div ref={gridRef} id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {visibleProducts.map(p => (
//                 <article key={p.id} className="flex flex-col rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-inner hover:shadow-lg transition overflow-hidden">
//                   <div className="relative">
//                     <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-white/60 to-white/40 flex items-center justify-center">
//                       <img src={p.img} alt={p.name} className="object-contain max-h-full max-w-full" />
//                     </div>
//                     {p.oldPrice - p.price >= 30 && (
//                       <div className="absolute top-3 left-3 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-semibold">Sale</div>
//                     )}
//                   </div>

//                   <div className="p-4 flex flex-col flex-1">
//                     <div className="flex items-start justify-between gap-3">
//                       <h3 className="text-md font-semibold text-slate-800">{p.name}</h3>
//                     </div>

//                     <div className="mt-3 flex items-center gap-3">
//                       <Stars />
//                       <span className="text-sm text-slate-500">{p.rating}</span>
//                     </div>

//                     <div className="mt-4 flex items-center gap-3">
//                       <div className="text-lg font-extrabold text-slate-800">${p.price.toFixed(2)}</div>
//                       <div className="text-sm text-slate-500 line-through">${p.oldPrice.toFixed(2)}</div>
//                     </div>

//                     <div className="mt-3 text-sm text-slate-600 space-y-1">
//                       <div><span className="font-medium text-slate-700">Category:</span> {p.category}</div>
//                       {p.colors && p.colors.length > 0 && <div><span className="font-medium text-slate-700">Colors:</span> {p.colors.join(", ")}</div>}
//                       {p.sizes && p.sizes.length > 0 && <div><span className="font-medium text-slate-700">Sizes:</span> {p.sizes.join(", ")}</div>}
//                     </div>

//                     <div className="mt-4 pt-3 border-t border-white/30">
//         <div
//           to={`/products/${PRODUCTS.id}`}
//           className="
//             block mt-5 py-2.5 px-6 rounded-xl font-semibold 
//             bg-teal-600 text-white 
//             transition-all duration-400
//             hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-200 
//             hover:-translate-y-1
//           "
//         >
//           View Details
//         </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>

//             {/* Load more / no results */}
//             <div className="flex justify-center">
//               {filteredProducts.length === 0 ? (
//                 <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 p-6 text-center text-slate-600">No products match your filters.</div>
//               ) : visibleCount < filteredProducts.length ? (
//                 <button onClick={handleLoadMore} className="rounded-xl py-2 px-6 bg-white/60 border border-white/30 shadow hover:shadow-md">Load More</button>
//               ) : null}
//             </div>
//           </main>
//         </div>
//       </div>
    
//      <Footer />
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import Header from "../common/Header";
// import Footer from "../common/Footer";
// import '../index.css';
// import productbanner from "../assets/productbanner.jpg";
// import { Link } from "react-router-dom";


// export default function Products() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOption, setSortOption] = useState("Newest");

//   const categories = ["All", "Hoodies", "T-Shirts", "Jackets", "Shoes"];

//   // Sample products with offers
//   const products = [
//     {
//       id: 1,
//       name: "Urban Hoodie",
//       price: 79,
//       category: "Hoodies",
//      image: "https://placehold.co/600x800?text=T-Shirt",
//     offer: true,
//       upcomingOffer: false,
//     },
//     {
//       id: 2,
//       name: "Summer Tee",
//       price: 39,
//       category: "T-Shirts",
//     image: "https://placehold.co/600x800?text=Hoodie",
//     offer: false,
//       upcomingOffer: true,
//     },
//     {
//       id: 3,
//       name: "Denim Jacket",
//       price: 119,
//       category: "Jackets",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//     offer: false,
//       upcomingOffer: false,
//     },
//     {
//       id: 4,
//       name: "Street Sneakers",
//       price: 149,
//       category: "Shoes",
//       image: "https://placehold.co/1600x500?text=Shop+Collection",
//     offer: true,
//       upcomingOffer: false,
//     },
//         {
//       id: 5,
//       name: "Urban Hoodie",
//       price: 79,
//       category: "Hoodies",
//     image:"https://placehold.co/600x800?text=T-Shirt",
//     offer: false,
//       upcomingOffer: false,
//     },
//     {
//       id: 6,
//       name: "Summer Tee",
//       price: 39,
//       category: "T-Shirts",
//    image: "https://placehold.co/600x800?text=T-Shirt",
//     offer: true,
//       upcomingOffer: true,
//     },
//     {
//       id: 7,
//       name: "Denim Jacket",
//       price: 119,
//       category: "Jackets",
//     image: "https://placehold.co/600x800?text=T-Shirt",
//     offer: false,
//       upcomingOffer: false,
//     },
//      {
//       id: 8,
//       name: "Street Sneakers",
//       price: 149,
//       category: "Shoes",
//       image: "https://placehold.co/600x800?text=T-Shirt",
//     offer: true,
//       upcomingOffer: false,
//     },
//   ];

//   // Filter by category
//   let filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   // Sort based on dropdown
//   if (sortOption === "Newest") {
// filteredProducts = filteredProducts.filter((p) => p.id);
     
    
//   } else if (sortOption === "Offer") {
//     filteredProducts = filteredProducts.filter((p) => p.offer);
//   } else if (sortOption === "Upcoming Offer") {
//     filteredProducts = filteredProducts.filter((p) => p.upcomingOffer);
//   }

//   // Inline CategoryFilter component
//   const CategoryFilter = ({ categories, onSelect }) => (
//   <div className="flex flex-wrap gap-4">
//     {categories.map((cat) => (
//       <button
//         key={cat}
//         onClick={() => onSelect(cat)}
//         className={`px-5 py-2 rounded-full border font-semibold transition-all duration-200
//           ${
//             selectedCategory === cat
//               ? "bg-blue-700 text-white border-blue-700 shadow"
//               : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
//           } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//       >
//         {cat}
//       </button>
//     ))}
//   </div>
// );


//   // Inline ProductCard component
//   const ProductCard = ({ product }) => (
//     <div className="bg-white rounded-lg shadow hover:shadow-amber-900 transition overflow-hidden">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-64 object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">{product.name}</h2>
//         <p className="text-blue-600 font-bold">${product.price}</p>
//         <p className="text-gray-500 text-sm">{product.category}</p>
      
//         {product.offer && <span className="text-green-600 text-sm font-semibold">On Offer!</span>}
//         {product.upcomingOffer && <span className="text-orange-500 text-sm font-semibold">Upcoming Offer</span>}
//       </div>
//     </div>



//   );

//   return (

//       <div className="bg-gray-50 min-h-screen flex flex-col">
//           {/* Header Component */}
//           <Header />
//           <div className="bg-gray-50 min-h-screen">
//       {/* Banner */}
   
//           <div
//               className="relative h-96 top-14"
//               style={{
              
//                   backgroundImage: `url(${productbanner})`,
//                   backgroundPosition: "center",
//                   backgroundSize: "cover",
//                   backgroundRepeat: "no-repeat"
          
         
//               }}
//             >

//             </div>
   

//       {/* Content */}
//       <div className="container mx-auto px-6 py-10">
//         <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center my-6 gap-4">
//           <CategoryFilter categories={categories} onSelect={setSelectedCategory} />

//           <div>
//             <label className="mr-2 font-semibold">Sort By:</label>
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="px-4 py-2 border rounded"
//             >
//               <option value="Newest">Newest</option>
//               <option value="Offer">Offer</option>
//               <option value="Upcoming Offer">Upcoming Offer</option>
//             </select>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//   {filteredProducts.map((product) => (
//     <div
//       key={product.id}
//       className="
//         group relative rounded-2xl overflow-hidden shadow-md bg-white 
//         transition-all duration-500 
//         hover:shadow-2xl hover:-translate-y-2 
//         border border-gray-200 hover:border-teal-600
//       "
//     >

//       {/* SOFT ORNAMENT BACKDROP */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-teal-50 opacity-70 group-hover:opacity-90 transition"></div>

//       {/* PRODUCT IMAGE */}
//       <Link to={`/products/${product.id}`}>
//         <img
//           src={product.image}
//           alt={product.title}
//           className="
//             relative z-10 w-full h-72 object-cover 
//             transition-all duration-500 
//             group-hover:scale-110 group-hover:brightness-105
//           "
//         />
//       </Link>

//       {/* CONTENT */}
//       <div className="relative z-20 p-5 text-center">

//         {/* Category */}
//         <span
//           className="
//             inline-block mb-3 px-4 py-1 text-sm 
//             rounded-full bg-sage-200 text-slate-700 
//             transition-all duration-300 
//             group-hover:bg-teal-200 group-hover:text-teal-900
//           "
//         >
//           {product.category}
//         </span>

//         {/* Title */}
//         <Link
//           to={`/products/${product.id}`}
//           className="
//             block text-lg font-semibold text-slate-800 
//             group-hover:text-teal-700 transition
//           "
//         >
//           {product.title}
//         </Link>

//         {/* EXTRA DESCRIPTION */}
//         <p className="mt-1 text-sm text-gray-500 leading-relaxed">
//           Premium quality · Sustainable material · Limited edition release
//         </p>

//         {/* PRICE SECTION */}
//         <div className="flex items-center justify-center gap-3 mt-3">

//           <span className="text-gray-400 line-through text-sm">
//             ${product.originalPrice}
//           </span>

//           <span
//             className="
//               text-lg font-bold 
//               text-yellow-600 group-hover:text-yellow-700 transition
//             "
//           >
//             ${product.discountedPrice}
//           </span>
//         </div>

//         {/* VIEW DETAILS CTA */}
//         <Link
//           to={`/products/${product.id}`}
//           className="
//             block mt-5 py-2.5 px-6 rounded-xl font-semibold 
//             bg-teal-600 text-white 
//             transition-all duration-400
//             hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-200 
//             hover:-translate-y-1
//           "
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   ))}
// </div>

       

        
//       </div>
//     </div>
//        {/* Footer Component */}
//           <Footer />
//   </div>
    
//   );
// }


