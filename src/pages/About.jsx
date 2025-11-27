


import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import aboutimg from  "../assets/aboutimg.jpg"

    import  {FaShippingFast}  from "react-icons/fa";




export default function About() {
const aboutimg1 = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c";
const aboutimg2 = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
const aboutimg3 = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f";
const aboutimg4 = "https://images.unsplash.com/photo-1519681393784-d120267933ba";
    

  return (

    <div className="min-h-screen bg-white"> 
    <Header />
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* Left Image */}
        <div>
          <img
            src={aboutimg}
            alt="About section visual"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="text-green-600 font-semibold tracking-wide mb-3 uppercase">About Us</p>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            We Encourage you to<br />
            <span className="text-gray-900"> help us to Grow.</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis quae unde expedita ullam in corrupti. Eveniet officia distinctio dolores illo in iste. Facere et iusto explicabo dicta voluptatibus maxime, magnam voluptatem atque officia nostrum consequuntur, cumque quidem eos repellat nam! </p>

          <p className="text-gray-600 leading-relaxed">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue.
          </p>
        </div>
      </div>
    </section>




    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Free Shipping */}
          <div className="border rounded-xl p-6 shadow-sm flex items-start space-x-4">
            <FaShippingFast className="text-blue-600 w-10 h-10" />
            <div>
              <p className="font-semibold text-lg mb-1">Free Shipping</p>
              <p className="text-sm text-gray-600">Free Shipping World Wide.</p>
            </div>
          </div>

          {/* 24 x 7 Service */}
          <div className="border rounded-xl p-6 shadow-sm flex items-start space-x-4">
            <FaShippingFast  className="text-green-600 w-10 h-10" />
            <div>
              <p className="font-semibold text-lg mb-1">24 x 7 Service</p>
              <p className="text-sm text-gray-600">Online Service For New Customers.</p>
            </div>
          </div>

          {/* Festival Offer */}
          <div className="border rounded-xl p-6 shadow-sm flex items-start space-x-4">
            <FaShippingFast  className="text-yellow-600 w-10 h-10" />
            <div>
              <p className="font-semibold text-lg mb-1">Festival Offer</p>
              <p className="text-sm text-gray-600">New Online Special Festival Offers.</p>
            </div>
          </div>

        </div>
      </div>
    </section>



{/* Image Gallery */}
<section className="py-12 max-w-5xl mx-auto">
<h3 className="text-2xl font-bold mb-6">Image Gallery</h3>


{/* Bento Grid */}
<div className="grid grid-cols-5 auto-rows-[220px] gap-4 ">
{/* ROW 1 → 3 + 2 */}
<div className="group relative overflow-hidden rounded-xl col-span-3 row-span-1  ">
<img src={aboutimg4} alt="Gallery" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>
<div className="group relative overflow-hidden rounded-xl col-span-2 row-span-1">
<img src={aboutimg2} alt="Gallery" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>


{/* ROW 2 → 1 + 4 */}
<div className="group relative overflow-hidden rounded-xl col-span-2 row-span-1">
<img src={aboutimg3} alt="Gallery" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>
<div className="group relative overflow-hidden rounded-xl col-span-3 row-span-1">
<img src={aboutimg4} alt="Gallery" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>


{/* ROW 3 → 2 + 3 */}
<div className="group relative overflow-hidden rounded-xl col-span-2 row-span-1">
<img src={aboutimg2} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>
<div className="group relative overflow-hidden rounded-xl col-span-3 row-span-1">
<img src={aboutimg4} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</div>
</div>
</section>

 <div className="w-full">
     <Footer />
 </div>
    </div>
    
  );
}


// import React from "react";
// import Header from "../common/Header";
// import Footer from "../common/Footer";
// import slidertwo from "../assets/slidertwo.jpg";
// import { Trophy, Award, Globe, Users, Star } from "lucide-react";
// import "../index.css";

// export default function About() {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* Header Component */}
//       <Header />

//       <div className="bg-gray-50 min-h-screen">
//         {/* Banner */}
//          <div
//               className="relative h-96 top-14"
//               style={{
              
//                   backgroundImage: `url(${slidertwo})`,
//                   backgroundPosition: "center",
//                   backgroundSize: "cover",
//                   backgroundRepeat: "no-repeat"
          
         
//               }}
//             >
       
        
//         </div>

//         {/* Our Story */}
//         <div className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold mb-4">Our Story</h2>
//             <p className="text-gray-700 mb-6 leading-relaxed">
//               We began as a small, passionate group of designers inspired by the
//               blend of urban fashion and eco-conscious living. What started as a
//               local movement has grown into a global brand shaping the future of
//               sustainable style.
//             </p>
//             <p className="text-gray-700 leading-relaxed">
//               Every piece we create tells a story of craftsmanship, creativity,
//               and purpose. Our collections reflect not just trends, but timeless
//               values — integrity, inclusivity, and inspiration.
//             </p>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"

//             alt="Our Story"
//             className="rounded-xl shadow-lg"
//           />
//         </div>

//         {/* New Section: Our Achievements */}
//         <section className="bg-white py-16 border-t">
//           <div className="container mx-auto text-center px-6">
//             <h2 className="text-4xl font-bold mb-10 flex items-center justify-center gap-2">
//               <Trophy className="text-yellow-500" /> Our Achievements
//             </h2>

//             <p className="text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
//               Over the years, we’ve built a legacy of excellence in ethical
//               fashion — combining innovation with sustainability. Here are a few
//               milestones that define who we are today.
//             </p>

//             {/* Stats */}
//             <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-center">
//               <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
//                 <Award className="mx-auto text-yellow-500 mb-3" size={36} />
//                 <h3 className="text-3xl font-bold">25+</h3>
//                 <p className="text-gray-600">Global Fashion Awards</p>
//               </div>
//               <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
//                 <Globe className="mx-auto text-green-500 mb-3" size={36} />
//                 <h3 className="text-3xl font-bold">30+</h3>
//                 <p className="text-gray-600">Countries Reached</p>
//               </div>
//               <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
//                 <Users className="mx-auto text-blue-500 mb-3" size={36} />
//                 <h3 className="text-3xl font-bold">1M+</h3>
//                 <p className="text-gray-600">Happy Customers</p>
//               </div>
//               <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
//                 <Star className="mx-auto text-purple-500 mb-3" size={36} />
//                 <h3 className="text-3xl font-bold">4.9/5</h3>
//                 <p className="text-gray-600">Customer Rating</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section className="bg-blue-50 py-16">
//           <div className="container mx-auto text-center px-6">
//             <h2 className="text-4xl font-bold mb-10">What Our Clients Say</h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   name: "Emily Carter",
//                   review:
//                     "Amazing service and quick response. Highly recommend!",
//                   rating: 5,
//                 },
//                 {
//                   name: "Michael Scott",
//                   review:
//                     "Very professional team. My queries were resolved quickly.",
//                   rating: 4,
//                 },
//                 {
//                   name: "Sophia Lee",
//                   review:
//                     "Loved the experience! The staff were kind and knowledgeable.",
//                   rating: 5,
//                 },
//               ].map((test, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
//                 >
//                   <div className="flex justify-center mb-3">
//                     {[...Array(test.rating)].map((_, j) => (
//                       <Star key={j} size={18} className="text-yellow-500" />
//                     ))}
//                   </div>
//                   <p className="text-gray-700 mb-4 italic">"{test.review}"</p>
//                   <h4 className="font-semibold text-blue-700">{test.name}</h4>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Footer Component */}
//       <Footer />
//     </div>
//   );
// }
