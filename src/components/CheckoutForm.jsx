import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState(null); // Track any payment errors
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track payment success

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true); // Set loading to true when starting the payment process
    setError(null);  // Clear previous errors

    // Confirm the payment with the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message); // Set error message if payment fails
      setLoading(false); // Reset loading state
    } else {
      setLoading(false); // Reset loading state
      if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true); // Set success state if payment is successful
        console.log('[PaymentIntent]', paymentIntent);
        
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter your payment details</h2>
      
      {/* Show error if payment fails */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {/* Stripe CardElement */}
      <CardElement />
      
      {/* Show the payment status (loading or success) */}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {/* Show success message */}
      {paymentSuccess && <div style={{ color: 'green' }}>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;