import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { urls } from "../constants";


const stripePromise = loadStripe(
  "pk_test_51QTf99Kj2nWGPj5752AjxmEah8N598npWqZIdjnkWWUATUt6yrRGu8f6LyzY4TZc6MnUGJX3bbN7wuowDA42CpVj00dvNQtzfJ"
);

const Cart = ({ cart, setCart }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]); // Reset cart to empty array
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Call backend to create checkout session and get session ID
      const response = await fetch(`${urls.url}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }), // Send the cart to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id } = await response.json(); // Get the session ID from the backend

      // Redirect to Stripe Checkout with the session ID
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: id, // Pass the session ID from backend
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert(error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error during checkout: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Heading and Welcome message */}
      <div className="container mx-auto my-16 px-4 text-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-shadow-md">
          Welcome Aboard!
        </h1>
        <p className="text-lg mb-6">
          We are excited to have you with us. You're just a few steps away from
          completing your purchase. Go ahead and proceed to checkout to grab the
          best courses we offer!
        </p>
        <p className="text-md italic mb-6">
          All trainings provided here are digital trainings. Once you sign up,
          you will receive a confirmation email.
        </p>
      </div>

      {/* Cart Items */}
      <div className="container mx-auto my-16 px-4">
        {cart.length === 0 ? (
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">Your Cart is Empty</h1>
            <Link to={"/"} className="btn btn-warning text-white">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          cart.map((product, index) => (
            <div
              className="card mb-5 my-6 flex flex-row items-center shadow-lg rounded-lg"
              style={{ maxWidth: "800px" }}
              key={index}
            >
              {/* Image */}
              <div className="flex justify-center items-center w-1/4 p-4">
                <img
                  src={product.image}
                  className="rounded-lg w-24 h-24 object-cover"
                  alt={product.title}
                />
              </div>

              {/* Product details */}
              <div className="flex flex-col justify-center w-3/4 pl-6 py-3">
                <h5 className="text-lg font-semibold mb-2">{product.title}</h5>
                <p className="text-gray-700 text-sm mb-4">
                  {product.description}
                </p>
                <button className="btn bg-green-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 transition duration-300 mb-3">
                  {product.price} $
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Amount and Checkout */}
      {cart.length !== 0 && (
        <div className="container text-center my-5">
          {/* Display Total Amount */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Total: ${calculateTotal()}
            </h2>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="btn bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mx-3"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm text-white"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Checkout with Stripe"
            )}
          </button>

          {/* Clear Cart Button */}
          <button
            onClick={handleClearCart}
            className="btn bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300 mx-3"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
