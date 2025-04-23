/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { ForgotPassword } from "./Components/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { Categories } from "./Components/Categories";
import { About } from "./Components/About";
import { Products } from "./Components/Products";
import { Contact } from "./Components/Contact";
import { ForgotPassword } from "./Components/ForgotPassword";  // Ensure this component exists

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { Categories } from "./Components/Categories";
import { About } from "./Components/About";
import { Products } from "./Components/Products";
import { Contact } from "./Components/Contact";
import { ForgotPassword } from "./Components/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


//this
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { ForgotPassword } from "./Components/ForgotPassword";
import { Categories } from "./Components/Categories"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/categories" element={<Categories />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { ForgotPassword } from "./Components/ForgotPassword";
import { Categories } from "./Components/Categories"; 
import CartPage from "./Components/CartPage"; // ✅ import the Cart page component
import { CartProvider } from "./context/CartContext"; // ✅ import CartProvider
import {Products} from "./Components/Products"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <CartProvider> 
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
*/

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { ForgotPassword } from "./Components/ForgotPassword";
import { Categories } from "./Components/Categories"; 
import CartPage from "./Components/CartPage"; // ✅ import the Cart page component
import { CartProvider } from "./context/CartContext"; // ✅ import CartProvider
//import ProductPage from "./Components/Products"; // ✅ Correct import (using default export)
import { Products }from "./Components/Products"; 


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <CartProvider> {/* ✅ Wrap the app with CartProvider */}
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart route */}
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
