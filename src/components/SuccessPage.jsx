// import React from 'react';
// import { Link } from 'react-router-dom';

// const SuccessPage = () => {
//   return (
//     <div className="container mx-auto text-center my-16 px-4">
//       <h1 className="text-4xl font-extrabold mb-4 text-green-600">Thank You for Your Payment!</h1>
//       <p className="text-lg mb-6">Your payment was successful. We appreciate your purchase and hope you enjoy our products!</p>
//       <div className="text-center mt-6">
//         <Link to="/" className="btn btn-primary text-white px-6 py-3 rounded-md">
//           Go Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);  // null -> loading, true -> success, false -> failed
  const { search } = useLocation();  // To get the query parameters
  const session_id = new URLSearchParams(search).get('session_id'); // Extract session_id from the URL

  useEffect(() => {
    if (session_id) {
      const verifyPayment = async () => {
        try {
          // Send a request to your backend /success endpoint
          const response = await fetch(
            `https://greenfit-fitness-backend.onrender.com/success?session_id=${session_id}`
          );
          const data = await response.json();
          console.log(data);  // To check what data is returned

          if (data.success) {
            setPaymentStatus(true);  // Payment was successful
          } else {
            setPaymentStatus(false);  // Payment failed
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          setPaymentStatus(false);  // Set to false if there's an error
        }
      };

      verifyPayment();
    }
  }, [session_id]);

  if (paymentStatus === null) {
    // Display loading state until payment is verified
    return <div>Loading...</div>;
  }

  if (paymentStatus === true) {
    // Payment was successful
    return (
      <div className="container mx-auto text-center my-16 px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-green-600">Thank You for Your Payment!</h1>
        <p className="text-lg mb-6">Your payment was successful. We appreciate your purchase and hope you enjoy our products!</p>
        <div className="text-center mt-6">
          <Link to="/" className="btn btn-primary text-white px-6 py-3 rounded-md">
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Payment failed or there was an error
  return (
    <div className="container mx-auto text-center my-16 px-4">
      <h1 className="text-4xl font-extrabold mb-4 text-red-600">Payment Failed</h1>
      <p className="text-lg mb-6">Unfortunately, your payment was not successful. Please try again.</p>
      <div className="text-center mt-6">
        <Link to="/" className="btn btn-primary text-white px-6 py-3 rounded-md">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;