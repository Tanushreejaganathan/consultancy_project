import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { ForgotPassword } from "./Components/ForgotPassword";
import { Categories } from "./Components/Categories";
import CartPage from "./Components/CartPage";
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./Components/ErrorBoundary";
import About from "./Components/About";
import Contact from "./Components/Contact";

function App() {
  // Check local storage for token on initial load using the key 'token'
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Effect to listen for storage changes (optional but good practice)
  useEffect(() => {
    const handleStorageChange = () => {
      // Re-check the token when storage event occurs
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    // Initial check on mount (redundant with useState initializer but safe)
    setIsLoggedIn(!!localStorage.getItem('token'));
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount


  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {/* Ensure Login component receives setIsLoggedIn */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<ErrorBoundary>
            <CartPage />
          </ErrorBoundary>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
