import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { urls } from "../constants";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuccessDetails = async () => {
      const sessionId = searchParams.get("session_id"); // Retrieve session_id from URL

      if (!sessionId) {
        setSuccess(false);
        setMessage("Session ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${urls.url}/success?session_id=${sessionId}` //${urls.url}
        );

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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000); // Redirect after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto text-center my-16 px-4">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center my-16 px-4">
      {success ? (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-green-600">
            Thank You for Your Payment!
          </h1>
          <p className="text-lg mb-6">{message}</p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-red-600">
            Payment Failed
          </h1>
          <p className="text-lg mb-6">{message}</p>
        </>
      )}
      <div className="text-center mt-6">
        <Link
          to="/"
          className="btn btn-primary text-white px-6 py-3 rounded-md"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
