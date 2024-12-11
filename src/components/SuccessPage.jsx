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
import { useSearchParams } from 'react-router-dom';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuccessDetails = async () => {
      const sessionId = searchParams.get('session_id'); // Retrieve session_id from URL

      try {
        const response = await fetch(
          `https://greenfit-fitness-backend.onrender.com/success?session_id=${sessionId}`
        );
        const data = await response.json();

        if (data.success) {
          setSuccess(true);
          setMessage(data.message || "Payment successful!");
        } else {
          setSuccess(false);
          setMessage(data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error fetching success details:", error);
        setSuccess(false);
        setMessage("Unable to verify payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessDetails();
  }, [searchParams]);

  if (loading) {
    return <div className="container mx-auto text-center my-16 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto text-center my-16 px-4">
      {success ? (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-green-600">Thank You for Your Payment!</h1>
          <p className="text-lg mb-6">{message}</p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-red-600">Payment Failed</h1>
          <p className="text-lg mb-6">{message}</p>
        </>
      )}
      <div className="text-center mt-6">
        <Link to="/" className="btn btn-primary text-white px-6 py-3 rounded-md">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;