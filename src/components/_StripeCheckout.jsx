import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"; // Import Axios
import { urls } from "../constants";

const stripePromise = loadStripe(
  "pk_test_51QTf99Kj2nWGPj5752AjxmEah8N598npWqZIdjnkWWUATUt6yrRGu8f6LyzY4TZc6MnUGJX3bbN7wuowDA42CpVj00dvNQtzfJ"
); // Replace with your Stripe Publishable Key

const StripeCheckout = ({ cart, total }) => {
  const [loading, setLoading] = useState(false); // Track loading state
  const [checkoutError, setCheckoutError] = useState(null); // Track any errors during checkout

  // Function to handle checkout session creation
  const handleCheckout = async () => {
    try {
      setLoading(true); // Set loading state to true when starting checkout
      setCheckoutError(null); // Clear previous errors if any

      // Prepare the line items from the cart
      const lineItems = cart.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100), // Price in cents
        },
        quantity: product.quantity || 1, // Default to 1 if no quantity is defined
      }));

      // Send the line items to the backend to create the checkout session
      const response = await axios.post(
        `${urls.url}/create-payment-intent`,
        { lineItems },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.id) {
        const { id } = response.data; // Get the session ID from the backend

        const stripe = await stripePromise; // Load the Stripe instance

        // Redirect to Stripe checkout using the session ID
        const { error } = await stripe.redirectToCheckout({
          sessionId: id, // Pass the session ID from backend
        });

        if (error) {
          console.error("Stripe Checkout error:", error);
          setCheckoutError(error.message); // Set error message state
        }
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setCheckoutError(error.message); // Set error message state
    } finally {
      setLoading(false); // Set loading state to false once the process is complete
    }
  };

  return (
    <div>
      <h2>Stripe Checkout</h2>

      {checkoutError && (
        <div className="error-message">
          <p style={{ color: "red" }}>Error: {checkoutError}</p>
        </div>
      )}

      {loading ? (
        <p>Loading payment details...</p> // Show loading state until session is created
      ) : (
        <button
          onClick={handleCheckout}
          className="btn bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mx-3"
          disabled={loading} // Disable button while loading
        >
          Checkout with Stripe
        </button>
      )}
    </div>
  );
};

export default StripeCheckout;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation to get the passed state
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe('pk_test_51QTf99Kj2nWGPj5752AjxmEah8N598npWqZIdjnkWWUATUt6yrRGu8f6LyzY4TZc6MnUGJX3bbN7wuowDA42CpVj00dvNQtzfJ'); // Replace with your Stripe Publishable Key

// const StripeCheckout = () => {
//   const location = useLocation();  // Get cart and total from the passed state
//   const { cart, total } = location.state || {}; // Default to empty if no state passed
//   const [loading, setLoading] = useState(false);
//   const [checkoutError, setCheckoutError] = useState(null);

//   useEffect(() => {
//     if (!cart || cart.length === 0) {
//       // Handle edge case if no cart is passed or it's empty
//       alert("No cart data available!");
//       return;
//     }
//   }, [cart]);

//   // Function to handle checkout session creation
//   const handleCheckout = async () => {
//     try {
//       setLoading(true);  // Set loading state to true

//       // Prepare the line items from the cart
//       const lineItems = cart.map((product) => ({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: product.title,
//             description: product.description,
//             images: [product.image],
//           },
//           unit_amount: Math.round(product.price * 100), // Convert to cents
//         },
//         quantity: product.quantity || 1,
//       }));

//       // Send line items to the backend to create a checkout session
//       const response = await axios.post(
//         `${urls.url}/create-payment-intent`,
//         { lineItems },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.data && response.data.id) {
//         const { id } = response.data;  // Get the session ID

//         const stripe = await stripePromise;
//         const { error } = await stripe.redirectToCheckout({
//           sessionId: id,
//         });

//         if (error) {
//           setCheckoutError(error.message);  // Set error if any
//         }
//       } else {
//         throw new Error('Failed to create checkout session');
//       }
//     } catch (error) {
//       setCheckoutError(error.message);
//     } finally {
//       setLoading(false);  // Set loading to false
//     }
//   };

//   return (
//     <div>
//       <h2>Stripe Checkout</h2>

//       {checkoutError && (
//         <div className="error-message">
//           <p style={{ color: 'red' }}>Error: {checkoutError}</p>
//         </div>
//       )}

//       {loading ? (
//         <p>Loading payment details...</p>
//       ) : (
//         <button
//           onClick={handleCheckout}
//           className="btn bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mx-3"
//         >
//           Checkout with Stripe
//         </button>
//       )}
//     </div>
//   );
// };

// export default StripeCheckout;
