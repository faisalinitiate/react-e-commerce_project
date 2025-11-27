import React, { useState } from "react";
import { Star } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Usecart } from "../common/Usecart";




// ✅ Detailed product data + display logic
export default function ProductDetails() {
  const { id } = useParams();

  const products = [
    {
      id: 1,
      title: "Urban Hoodie",
      originalPrice: 99,
      discountedPrice: 79,
      rating: 4,
      reviewsCount: 126,
      shortDescription:
        "A cozy, stylish hoodie designed for urban life and all-day comfort.",
      longDescription:
        "The Urban Hoodie is made from premium cotton and polyester blend. Featuring a relaxed fit, adjustable hood, and kangaroo pocket, it’s perfect for cool evenings or casual streetwear. Soft inner fleece adds warmth while maintaining breathability.",
      category: ["Men", "Hoodies"],
      tags: ["Winter", "Comfort", "Casual"],
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://placehold.co/100x150?text=Hoodie+1",
        "https://placehold.co/100x150?text=Hoodie+2",
        "https://placehold.co/100x150?text=Hoodie+3",
        "https://placehold.co/100x150?text=Hoodie+4",
        "https://placehold.co/100x150?text=Hoodie+5",
      ],
      mainImage: "https://placehold.co/600x800?text=Urban+Hoodie",
      bottomBanner: "https://placehold.co/1200x400?text=Urban+Hoodie+Banner",
      specs: [
        { label: "Material", value: "80% Cotton, 20% Polyester" },
        { label: "Fit", value: "Regular" },
        { label: "Care", value: "Machine Wash Cold" },
      ],
      reviews: [
        { user: "John Doe", rating: 5, comment: "Super comfy and stylish!" },
        {
          user: "Emma Watson",
          rating: 4,
          comment: "Good quality but slightly oversized.",
        },
      ],
      relatedProducts: [
        {
          name: "Summer Tee",
          price: 39,
          image: "https://placehold.co/600x800?text=Summer+Tee",
        },
        {
          name: "Denim Jacket",
          price: 119,
          image: "https://placehold.co/600x800?text=Denim+Jacket",
        },
      ],
    },
    {
      id: 2,
      title: "Summer Tee",
      originalPrice: 49,
      discountedPrice: 39,
      rating: 5,
      reviewsCount: 98,
      shortDescription: "Lightweight and breathable tee for hot summer days.",
      longDescription:
        "Crafted from 100% organic cotton, the Summer Tee is ideal for comfort and durability. Available in multiple colors, it complements any casual or sporty outfit.",
      category: ["Men", "T-Shirts"],
      tags: ["Casual", "Summer", "Organic Cotton"],
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://placehold.co/100x150?text=Tee+1",
        "https://placehold.co/100x150?text=Tee+2",
        "https://placehold.co/100x150?text=Tee+1",
        "https://placehold.co/100x150?text=Tee+2",
        "https://placehold.co/100x150?text=Tee+1",
        
      ],
      mainImage: "https://placehold.co/600x800?text=Summer+Tee",
      bottomBanner: "https://placehold.co/1200x400?text=Summer+Tee+Banner",
      specs: [
        { label: "Material", value: "100% Organic Cotton" },
        { label: "Fit", value: "Slim Fit" },
      ],
      reviews: [
        { user: "Sophia", rating: 5, comment: "Super soft and perfect fit!" },
        { user: "Ryan", rating: 4, comment: "Nice quality for the price." },
      ],
      relatedProducts: [
        {
          name: "Urban Hoodie",
          price: 79,
          image: "https://placehold.co/600x800?text=Urban+Hoodie",
        },
      ],
    },
    {
      id: 3,
      title: "Denim Jacket",
      originalPrice: 139,
      discountedPrice: 119,
      rating: 4,
      reviewsCount: 67,
      shortDescription:
        "Classic denim jacket built to last — timeless streetwear style.",
      longDescription:
        "Made from durable washed denim with adjustable cuffs and a button-up front. Designed for layering, it’s an essential wardrobe piece for any season.",
      category: ["Men", "Jackets"],
      tags: ["Denim", "Streetwear", "Durable"],
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://placehold.co/100x150?text=Jacket+1",
        "https://placehold.co/100x150?text=Jacket+2",
        "https://placehold.co/100x150?text=Jacket+1",
        "https://placehold.co/100x150?text=Jacket+2",
        "https://placehold.co/100x150?text=Jacket+1",
     
      ],
      mainImage: "https://placehold.co/600x800?text=Denim+Jacket",
      bottomBanner: "https://placehold.co/1200x400?text=Denim+Jacket+Banner",
      specs: [
        { label: "Material", value: "100% Cotton Denim" },
        { label: "Fit", value: "Relaxed Fit" },
      ],
      reviews: [
        { user: "Michael", rating: 4, comment: "Strong material, looks great!" },
      ],
      relatedProducts: [
        {
          name: "Street Sneakers",
          price: 149,
          image: "https://placehold.co/600x800?text=Street+Sneakers",
        },
      ],
    },
    {
      id: 4,
      title: "Street Sneakers",
      originalPrice: 169,
      discountedPrice: 149,
      rating: 5,
      reviewsCount: 152,
      shortDescription: "Trendy sneakers with cushioned soles and sleek design.",
      longDescription:
        "Built for both performance and fashion, Street Sneakers provide excellent grip and cushioning. Designed with breathable mesh for all-day comfort.",
      category: ["Men", "Shoes"],
      tags: ["Sneakers", "Streetwear", "Comfort"],
      sizes: ["40", "41", "42", "43"],
      images: [
        "https://placehold.co/100x150?text=Sneakers+1",
        "https://placehold.co/100x150?text=Sneakers+2",
        "https://placehold.co/100x150?text=Sneakers+1",
        "https://placehold.co/100x150?text=Sneakers+2",
        "https://placehold.co/100x150?text=Sneakers+1",
      ],
      mainImage: "https://placehold.co/600x800?text=Street+Sneakers",
      bottomBanner: "https://placehold.co/1200x400?text=Sneakers+Banner",
      specs: [
        { label: "Material", value: "Mesh + Synthetic" },
        { label: "Sole", value: "Rubber" },
      ],
      reviews: [
        { user: "Daniel", rating: 5, comment: "Super comfortable!" },
        { user: "Ava", rating: 4, comment: "Very stylish sneakers!" },
      ],
      relatedProducts: [
        {
          name: "Denim Jacket",
          price: 119,
          image: "https://placehold.co/600x800?text=Denim+Jacket",
        },
      ],
    },
  ];

  const product = products.find((p) => p.id === Number(id));
  const {addToCart} = Usecart()
  const [selectedSize, setSelectedSize] = useState(
    product ? product.sizes[0] : ""
  );

  if (!product)
    return (
      <div className="p-10 text-center text-red-600">
        Product not found.
        <br />
        <Link to="/products" className="text-blue-600 underline">
          Back to Products
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-6 lg:px-16 py-10">
      <Header/>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        HOME / PRODUCTS /{" "}
        <span className="text-gray-800 font-medium">{product.title}</span>
      </div>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 justify-center">
            {product.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="w-20 h-24 object-cover rounded-lg cursor-pointer border hover:border-gray-400 transition"
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={product.mainImage}
              alt={product.title}
              className="w-full rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-snug">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 line-through text-lg">
              ${product.originalPrice}
            </span>
            <span className="text-red-600 text-2xl font-bold">
              ${product.discountedPrice}
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
              ({product.reviewsCount})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {product.shortDescription}
          </p>

          {/* Size Selector */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

   {/* ✅ Add to Cart Button */}
     <button
  onClick={() => addToCart({ ...product, size: selectedSize })}
  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
>
  Add to Cart
</button>


          <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-700">Category:</span>{" "}
              {product.category.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Tags:</span>{" "}
              {product.tags.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Extended Sections */}
      <div className="mt-16 space-y-16">
        {/* Product Details */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Product Details
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.longDescription}
          </p>
        </section>

        {/* Specifications */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Specifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span className="text-gray-700 font-medium">{spec.label}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">
                    {review.user}
                  </h3>
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
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((item, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-red-600 font-semibold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="mt-10 pb-4">
          <img
            src={product.bottomBanner}
            alt="Product showcase banner"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
