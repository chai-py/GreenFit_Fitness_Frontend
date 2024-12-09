import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the product ID from the URL
import axios from 'axios';


function ProductDetails({ addItemToCart }) {
  const { id } = useParams();  // Get the ID from the URL
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

  return (
    <div className="max-w-screen-lg mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-80 object-cover mt-4" />
      <p className="mt-4">{product.description}</p>
      <p className="text-xl mt-4">Price: ${product.price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-6 text-white px-4 py-2 rounded
        bg-green-600 
        transition-all transform duration-200
        hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700
        active:scale-95"
      >
        Add to Cart
      </button>
      
    </div>
    
  );
}

export default ProductDetails;


// import React, { useEffect, useState, useContext } from 'react';  // Added useContext for AuthContext
// import { useParams, useNavigate } from 'react-router-dom'; // Use useHistory for redirection
// import axios from 'axios';
// import { AuthContext } from './AuthContext';  // Import the AuthContext for user authentication

// function ProductDetails({ addItemToCart }) {
//   const { id } = useParams();  // Get the ID from the URL
//   const navigate = useNavigate();  // To programmatically redirect the user
//   const [product, setProduct] = useState(null);
//   const { user } = useContext(AuthContext);  // Use AuthContext to check if the user is logged in

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
//     // Check if the user is logged in
//     if (!user) {
//       // If not logged in, redirect to the sign-in page
//       alert('Please sign in to add items to your cart.');
//       navigate('/signin'); // Redirect to sign-in page
//     } else {
//       // If logged in, proceed with adding the item to the cart
//       addItemToCart(product.name, product.price, product.category, product.image, product.title);
//     }
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
//         className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default ProductDetails;