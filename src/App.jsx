import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
import Training from './components/Training';
import Navbar from './components/Navbar';
import FreeTraining from './components/FreeTraining';
import SuccessPage from './components/SuccessPage';
import ProductDetails from './components/ProductDetails';
// import { AuthProvider } from './components/AuthContext';
import SignIn from './components/SignIn';
import ContactUs from './components/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import TrainingForm from './components/TrainingForm';
import Footer from './components/Footer';




function App() {
  const [cart, setCart] = useState([]); // Global cart state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add to cart function
  const addItemToCart = (name, price, category, image, title) => {
    const obj = { name, price, category, image, title };
    setCart((prevCart) => {
      console.log('Previous Cart:', prevCart); // Log previous state
      alert('item added in cart')
      return [...prevCart, obj]; // Add the new item to the cart
    });
  };

  useEffect(() => {
    console.log('Cart updated:', cart); // Log updated cart after state change
  }, [cart]); // Run every time the cart state changes
  

  return (
    <>
     
      <Navbar cart={cart} setCart={setCart} />
      {/* <AuthProvider> */}
      <Routes>
         
        <Route
  path="/training"
  element={
    <ProtectedRoute>
      <Training addItemToCart={addItemToCart} />
    </ProtectedRoute>
  }
/>
        
        {/* Protecting /trainingform route for admin users only */}
        <Route
          path="/trainingform"
          element={
            <ProtectedRoute adminOnly={true}>
              <TrainingForm />
            </ProtectedRoute>
          }
        />
        <Route path="/SignUp" element={<SignUp key="signup" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />        
        <Route path="/training/:id" element={<ProductDetails addItemToCart={addItemToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/product/:id" element={<ProductDetails />} />

       
    </Routes>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
