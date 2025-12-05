// src/pages/TrendingDetails.jsx

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { TRENDING_DATA } from "../data/trendingData";
import { Usecart } from "../common/Usecart";  // <-- IMPORTANT

export default function TrendingDetails() {
  const { id } = useParams();
  const { addToCart, toggleCart } = Usecart(); // <-- IMPORTANT

  const product = TRENDING_DATA.find(
    (item) => item.id.toString() === id
  );

  const [activeImage, setActiveImage] = useState(
    product ? product.mainImage : ""
  );

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>

        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 text-sm"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.mainImage,   // or product.images[0]
    });

    toggleCart(); // opens the cart sidebar
  };

  return (
    <div className="min-h-screen bg-white px-6 lg:px-16 py-10">
      <Header />

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 mt-12">
        HOME / TRENDING /
        <span className="text-gray-800 font-medium ml-1">
          {product.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 justify-center">
            {product.images.map((src, i) => (
              <img
                key={i}
                src={src}
                onClick={() => setActiveImage(src)}
                alt="thumbnail"
                className={`w-20 h-24 object-cover rounded-lg cursor-pointer border transition ${
                  activeImage === src
                    ? "border-black"
                    : "hover:border-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 line-through text-lg">
              ${product.old}
            </span>
            <span className="text-red-600 text-2xl font-bold">
              ${product.price}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < product.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-600 text-sm ml-2">
              ({product.reviews})
            </span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* EXTRA Sections */}
      <div className="mt-16 space-y-16">
        {/* Specs */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span className="font-medium">{spec.label}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviewsList.map((review, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{review.user}</h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={15}
                        className={
                          j < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section>
          <img
            src={product.bottomBanner}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            alt=""
          />
        </section>
      </div>

      <Footer />
    </div>
  );
}
