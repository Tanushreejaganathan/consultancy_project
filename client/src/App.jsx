import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import About from "./Components/About";
import Contact from "./Components/Contact";
import ErrorBoundary from "./Components/ErrorBoundary"; // ← import ErrorBoundary

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    setIsLoggedIn(!!localStorage.getItem('token'));
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <ErrorBoundary> 
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
