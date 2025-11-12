import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "api/user/adminLogin", formData);

      if (res.data.success) {
        toast.success("🎉 Welcome Back, Admin!");
        setToken(res.data.token);
      } else {
        toast.error("❌ You are not authorized as an admin");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl text-center font-bold mb-6 sm:mb-8 text-gray-800">
        Hey Admin 👋 Please Login to Access Your Dashboard
      </h1>

      {/* Login Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-10 border border-gray-200">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Admin Panel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-black transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
