import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import { urls } from "../constants";

function ProductDetails({ addItemToCart }) {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`${urls.url}/training/${id}`);
        setProduct(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [id]);

   // If still loading, show loading state
   if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="loader-border animate-spin rounded-full border-t-4 border-b-4 border-green-600 w-16 h-16 mx-auto mb-4"></div>
          <p className="text-xl text-green-600 dark:text-green-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Call the addItemToCart function, passing the product to add it to the cart
    addItemToCart(
      product.name,
      product.price,
      product.category,
      product.image,
      product.title
    );
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 mt-16 bg-gray-100 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-3xl font-bold text-center">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-cover mt-4"
      />

      <div className="mt-6 flex justify-center space-x-4">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="text-white px-4 py-2 rounded bg-green-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition-all transform duration-200"
        >
          Add to Cart
        </button>

        {/* Price Gradient Button */}
        <button className="text-white px-6 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 transition-all transform duration-200 cursor-default">
          Price: ${product.price}
        </button>
      </div>

      {/* Batch Information */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">
          Batch Information
        </h2>
        <p>
          <strong>Batch Start Time:</strong>{" "}
          {new Date(product.batchStartTime).toLocaleString()}
        </p>
        <p>
          <strong>Batch End Time:</strong>{" "}
          {new Date(product.batchEndTime).toLocaleString()}
        </p>

        <h3 className="mt-4 text-xl">Weekly Classes</h3>
        <p>
          <strong>Frequency:</strong> {product.weeklyClasses?.frequency}
        </p>
        <p>
          <strong>Days:</strong> {product.weeklyClasses?.days.join(", ")}
        </p>
        <p>
          <strong>Class Duration:</strong>{" "}
          {product.weeklyClasses?.classDuration}
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">Benefits</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>Strength:</strong> {product.benefits?.strength}
          </li>
          <li>
            <strong>Balance:</strong> {product.benefits?.balance}
          </li>
          <li>
            <strong>Focus:</strong> {product.benefits?.focus}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;
