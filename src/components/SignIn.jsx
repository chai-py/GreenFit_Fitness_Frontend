import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios for API calls
import { urls } from "../constants";

function SignIn({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // To programmatically navigate

  const onSubmit = async (data) => {
    console.log(data);

    // Make the API request to log in the user
    try {
      const response = await axios.post(`${urls.url}/user/login`, {
        email: data.email,
        password: data.password,
      });

      // If login is successful, save the token and user info to localStorage
      const { token, user } = response.data;
      localStorage.setItem("auth_token", token); // Store JWT token
      localStorage.setItem("user", JSON.stringify(user)); // Store user info
      localStorage.setItem('role', user.role);

      // If login is successful, close the modal and navigate to the dashboard or home page
      if (closeModal) {
        closeModal(); // Close the modal if the function is passed
      }

      navigate("/"); // Navigate to the dashboard after successful login
    } catch (error) {
      console.log(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert("Invalid email or password"); // Show alert on failure
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Sign In</h3>
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={closeModal} // Close modal when clicked
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition duration-200"
            >
              Login
            </button>
          </div>

          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <p>
              Not Registered?{" "}
              <Link
                to="/signup"
                className="text-green-600 cursor-pointer hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
