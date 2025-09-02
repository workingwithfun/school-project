"use client";

import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
 
const [toast, setToast] = useState({ message: "", type: "" });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch("/api/schools", {
      method: "POST",
      body: formData,
    });

const result = await res.json();
    if (res.ok) {
      setToast({ message: "✅ School added successfully!", type: "success" });
      reset();
    } else {
      setToast({ message: "❌ " + result.error, type: "error" });
    }
  };

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);


  return (
    <main className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl mt-24">

      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        🏫 Add a School
      </h1>

      {/* Toast Notification on top-right */}
      {toast.message && (
         <div
    className={`fixed top-20 right-6 px-6 py-3 rounded-lg font-medium shadow-lg transform transition-all duration-300 ${
      toast.type === "success"
        ? "bg-white text-green-600 translate-x-0 opacity-100"
        : "bg-white text-red-600 translate-x-0 opacity-100"
    }`}
  >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        encType="multipart/form-data"
      >
        {/* School Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            School Name
          </label>
          <input
            {...register("name", { required: "School name is required" })}
            placeholder="Enter school name"
            className={`w-full border-2 p-2 placeholder-gray-400 text-black rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm ">{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium text-gray-700">
            Address
          </label>
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Enter school address"
            className={`w-full border-2 p-2 placeholder-gray-400 text-black rounded-lg focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm ">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block font-medium text-gray-700 ">City</label>
          <input
            {...register("city", { required: "City is required" })}
            placeholder="Enter city"
            className={`w-full border-2 p-2  placeholder-gray-400  text-black rounded-lg focus:outline-none focus:ring-2 ${

              errors.city
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm ">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block font-medium text-gray-700 ">State</label>
          <input
            {...register("state", { required: "State is required" })}
            placeholder="Enter state"

            className={`w-full border-2 p-3 placeholder-gray-400 text-black rounded-lg focus:outline-none focus:ring-2 ${

              errors.state
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Contact Number
          </label>
         <input
  type="tel"
  {...register("contact", {
    required: "Contact number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Must be a valid 10-digit number",
    },
  })}
  placeholder="Enter 10-digit number"
  className={`w-full border-2 p-2 text-black placeholder-gray-400 text-black rounded-lg focus:outline-none focus:ring-2 ${
    errors.contact
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-blue-400"
  }`}
/>

          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register("email_id", {
              required: "Valid email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter email address"
            className={`w-full border-2 p-2 text-black placeholder-gray-400 text-black  rounded-lg focus:outline-none focus:ring-2 ${
              errors.email_id
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email_id && (
            <p className="text-red-500 text-sm">
              {errors.email_id.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            School Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "School image is required" })}
            className="w-full border-2 border-gray-400 p-2 rounded-lg
             text-gray-500 placeholder-gray-500
             file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
             file:text-sm file:font-medium file:bg-gray-700 file:text-white
             hover:file:bg-gray-800"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition"
        >
          Submit School
        </button>
      </form>
    </main>
  );
}
