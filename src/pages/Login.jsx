import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE – INFO PANEL */}
        <div className="bg-[#14324A] text-white p-10 flex flex-col justify-between">

          {/* Logo + Login Button */}
          <div>
            <div className="flex items-center justify-between">
              <Link to="/" className="text-3xl font-bold tracking-wide">
                <span className="text-yellow-400">Shop</span>Zen
              </Link>

              <Link
                to="/login"
                className="bg-white text-[#14324A] px-4 py-2 rounded-full font-medium shadow hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </div>

            <div className="mt-12 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                alt="Register Illustration"
                className="w-72"
              />
            </div>
          </div>

          {/* Back Home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="bg-white text-[#14324A] px-5 py-2 rounded-full shadow font-semibold hover:bg-gray-100 transition"
            >
              Back To Home
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE – REGISTER FORM */}
        <div className="p-10 bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm mt-2">
              Join ShopZen and start your journey
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="demo@gmail.com"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#14324A] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#0f2539] transition"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative text-center">
            <span className="text-gray-400 px-3 bg-white relative z-10">OR</span>
            <div className="absolute left-0 right-0 top-1/2 border-b border-gray-200"></div>
          </div>

          {/* Social Register */}
          <div className="flex justify-center gap-4">
            <button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
              <FaGoogle size={22} />
            </button>

            <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-black transition">
              <FaGithub size={22} />
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
