// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // Import useParams to get the product ID from the URL
// import axios from 'axios';


// function ProductDetails({ addItemToCart }) {
//   const { id } = useParams();  // Get the ID from the URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const getProductDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/training/${id}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.log('Error fetching product details:', error);
//       }
//     };
//     getProductDetails();
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   const handleAddToCart = () => {
//     // Call the addItemToCart function, passing the product to add it to the cart
//     addItemToCart(product.name, product.price, product.category, product.image, product.title);
//   };

//   return (
//     <div className="max-w-screen-lg mx-auto p-4 mt-16">
//       <h1 className="text-3xl font-bold">{product.title}</h1>
//       <img src={product.image} alt={product.title} className="w-full h-80 object-cover mt-4" />
//       <p className="mt-4">{product.description}</p>
//       <p className="text-xl mt-4">Price: ${product.price}</p>

//       {/* Add to Cart Button */}
//       <button
//         onClick={handleAddToCart}
//         className="mt-6 text-white px-4 py-2 rounded
//         bg-green-600 
//         transition-all transform duration-200
//         hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700
//         active:scale-95"
//       >
//         Add to Cart
//       </button>
      
//     </div>
    
//   );
// }

// export default ProductDetails;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';

function ProductDetails({ addItemToCart }) {
  const { id } = useParams();  // Get the ID from the URL
  const navigate = useNavigate();  // For redirection to the Trainings page
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/training/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log('Error fetching product details:', error);
      }
    };
    getProductDetails();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    // Call the addItemToCart function, passing the product to add it to the cart
    addItemToCart(product.name, product.price, product.category, product.image, product.title);
  };

  const handleAddMoreTrainings = () => {
    // Redirect to the Trainings page
    navigate('/trainings');
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold text-center">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-80 object-cover mt-4" />
      
      <div className="mt-6 flex justify-center space-x-4">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="text-white px-4 py-2 rounded bg-green-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition-all transform duration-200"
        >
          Add to Cart
        </button>

        {/* Add More Trainings Button */}
        <button
          onClick={handleAddMoreTrainings}
          className="text-white px-6 py-2 rounded bg-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all transform duration-200"
        >
          Add More Trainings
        </button>
      </div>

      {/* Batch Information */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <h2 className="text-2xl font-semibold text-green-600">Batch Information</h2>
        <p><strong>Batch Start Time:</strong> {new Date(product.batchStartTime).toLocaleString()}</p>
        <p><strong>Batch End Time:</strong> {new Date(product.batchEndTime).toLocaleString()}</p>
        
        <h3 className="mt-4 text-xl">Weekly Classes</h3>
        <p><strong>Frequency:</strong> {product.weeklyClasses?.frequency}</p>
        <p><strong>Days:</strong> {product.weeklyClasses?.days.join(', ')}</p>
        <p><strong>Class Duration:</strong> {product.weeklyClasses?.classDuration}</p>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <h2 className="text-2xl font-semibold text-green-600">Benefits</h2>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Strength:</strong> {product.benefits?.strength}</li>
          <li><strong>Balance:</strong> {product.benefits?.balance}</li>
          <li><strong>Focus:</strong> {product.benefits?.focus}</li>
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;