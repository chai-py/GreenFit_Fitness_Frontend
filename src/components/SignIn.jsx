import React from 'react'
import { data, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data)
  
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
    <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>
        
        <h3 className="font-bold text-lg">Sign In</h3>
        <div className="flex justify-center items-center min-h-screen bg-green-50">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Sign In</h2>

    <div className="mt-4 space-y-2">
      <span className="text-gray-700">Email</span>
      <br />
      <input
        type="email"
        placeholder="Enter your Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        {...register("email", { required: "Email is required" })}
      />
     {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
    </div>

    <div className="mt-4 space-y-2">
      <span className="text-gray-700">Password</span>
      <br />
      <input
        type="password"
        placeholder="Enter your Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
    </div>

    <div className="flex justify-between mt-6">
      <button
        className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition duration-200"
      >
        Login
      </button>
    </div>

    <div className="flex justify-center mt-4 text-sm text-gray-600">
      <p>
        Not Registered?{' '}
        <Link to="/signup" className="text-green-600 cursor-pointer hover:underline">signup</Link>{" "}
      </p>
    </div>
  </div>
</div>
</form>
    </div>
    </dialog>
    </div>
  )
}

export default SignIn
