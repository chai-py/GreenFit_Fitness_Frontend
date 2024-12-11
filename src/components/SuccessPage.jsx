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
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');  // Get the session ID from the URL query

  return (
    <div className="container mx-auto text-center my-16 px-4">
      <h1 className="text-4xl font-extrabold mb-4 text-green-600">Thank You for Your Payment!</h1>
      <p className="text-lg mb-6">Your payment was successful. We appreciate your purchase and hope you enjoy our products!</p>
      {sessionId && (
        <p className="text-sm text-gray-600">Session ID: {sessionId}</p>  {/* Optional: Display the session ID */}
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