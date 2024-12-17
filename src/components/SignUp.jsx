import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; 
import { urls } from "../constants";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access passed state
  const [email, setEmail] = useState("");

  // Set email if it was passed from the previous page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email); // Set the passed email to the state
      setValue("email", location.state.email); // Pre-fill the email field in the form
    }
  }, [location, setValue]);

  // Submit function for the form
  const onSubmit = async (data) => {
    try {
      console.log(data); // Log the form data to check

      const role = data.role || 'user';

      const token = localStorage.getItem('token');

      // Make the API request to sign up the user
      const response = await axios.post(`${urls.url}/user/signup`, {
        username: data.username, // Include the username field
        email: data.email,
        password: data.password,
        role: role, // Save the role
        token: token, // Store the token
      });

      const userData = {
        username: data.username,
        email: data.email,
        role: role,  // Include role if needed
      };

      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect user to the Sign In page after successful sign up
      navigate("/signin");
    } catch (error) {
      console.error(
        "Sign Up failed:",
        error.response ? error.response.data : error.message
      );
      alert("Sign Up failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            onClick={() => navigate("/")}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-600 dark:text-gray-300"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
            Sign Up
          </h2>

          {/* Username Input */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              {...register("username", { required: "Username is required" })}
            />
            <br />
            {errors.username && (
              <span className="text-sm text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email Input */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={email} // Pre-filled with email state
              {...register("email", { required: "Email is required" })}
              onChange={(e) => setEmail(e.target.value)} // Update email state if user changes it
            />
            <br />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              {...register("password", { required: "Password is required" })}
            />
            <br />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none transition duration-200"
            >
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="flex justify-center mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-green-600 dark:text-green-400 cursor-pointer hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
