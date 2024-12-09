import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios'; // Import axios for API calls

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Submit function for the form
  const onSubmit = async (data) => {
    try {
      console.log(data); // Log the form data to check

      // Make the API request to sign up the user
      const response = await axios.post('http://localhost:4000/user/signup', {
        username: data.username,  // Include the username field
        email: data.email,
        password: data.password
      });

      // Redirect user to the Sign In page after successful sign up
      navigate('/signin');
    } catch (error) {
      console.error("Sign Up failed:", error.response ? error.response.data : error.message);
      alert('Sign Up failed. Please try again.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative">
        {/* Close Button */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-600"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign Up</h2>

          {/* Username Input */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("username", { required: "Username is required" })}
            />
            <br />
            {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}
          </div>

          {/* Email Input */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("email", { required: "Email is required" })}
            />
            <br />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>

          {/* Password Input */}
          <div className="mt-4 space-y-2">
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("password", { required: "Password is required" })}
            />
            <br />
            {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition duration-200"
            >
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <button
                onClick={() => navigate('/signin')}
                className="text-green-600 cursor-pointer hover:underline"
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