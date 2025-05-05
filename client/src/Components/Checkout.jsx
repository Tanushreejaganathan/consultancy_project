import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Truck,
  CreditCard,
  Tag,  
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const { products } = location.state || { products: cartItems };
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

   // Add this useEffect for authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token ) {
      toast.error('Please login to continue checkout');
      navigate('/login', { 
        state: { 
          from: '/checkout',
          message: 'Please login to continue checkout' 
        } 
      });
      return;
    }
  }, [navigate]);

  // Calculate totals based on products from props
  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.username || '',
      email: user?.email || '',
      paymentMethod: 'cod',
    },
  });

  // Removed unused fetchServerPort function

  const onSubmit = async (data) => {
    if (products.length === 0) {
      toast.error('No products selected for checkout.');
      return;
    }

    const token = localStorage.getItem('token');
    setIsSubmitting(true);
    try {
      // Create order with the correct structure to match server expectations
      const orderResponse = await axios.post(
        `http://localhost:3001/api/orders`,
        {
          productId: products[0].id || products[0]._id || products[0].productId, // Handle all possible ID cases
          quantity: products[0].quantity,
          userInfo: {
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      // After order is created successfully, generate invoice
      const invoiceResponse = await axios.post(
        `http://localhost:3001/api/orders/generate-invoice`,
        {
          orderId: orderResponse.data.order._id,
          items: [{
            productId: products[0].id || products[0]._id || products[0].productId,
            name: products[0].name,
            quantity: products[0].quantity,
            price: products[0].price,
            total: products[0].price * products[0].quantity
          }],
          totalAmount: finalTotal,
          shippingAddress: {
            fullName: data.fullName,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            phone: data.phone
          },
          paymentMethod: data.paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob'
        }
      );
    

      // Create blob URL
      const blob = new Blob([invoiceResponse.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Open PDF in new window
      window.open(url, '_blank');
      
      // Clean up the blob URL after a short delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

      // Clear the cart in both local state and context
      await clearCart();
      
      toast.success('Order placed successfully! Invoice opened in new tab.');
      // Navigate to home page after a short delay to ensure cart is cleared
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error placing order:', error);
      let errorMessage = 'Failed to place order. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const subTotal = totalPrice;
  const tax = Math.round(subTotal * 0.18);
  const total = subTotal + tax;
  const isShippingFree = subTotal >= 5000;
  const shippingCost = isShippingFree ? 0 : 200;
  const finalTotal = total + shippingCost;

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <CheckCircle2 className="header-icon" />
          <h1>Checkout</h1>
          <p>Complete your order by providing shipping and payment details.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-content">
            {/* Left Side - Form */}
            <div className="checkout-form">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="checkout-section"
              >
                <div className="section-header">
                  <MapPin className="section-icon" />
                  <h2>Shipping Information</h2>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      <UserIcon /> Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className={errors.fullName ? 'error' : ''}
                      placeholder="John Doe"
                      {...register('fullName', { required: 'Full name is required' })}
                      jsx="true" // Changed from jsx={true}
                    />
                    {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <MailIcon /> Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={errors.email ? 'error' : ''}
                      placeholder="your@email.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <PhoneIcon /> Phone Number
                  </label>
                  <div className="phone-input">
                    <span className="phone-prefix">
                      <Phone size={16} color="#4b5563" />
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      className={errors.phone ? 'error' : ''}
                      placeholder="9876543210"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Enter a valid 10-digit number',
                        },
                      })}
                    />
                  </div>
                  {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="address">
                    <TruckIcon /> Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className={errors.address ? 'error' : ''}
                    placeholder="123 Main Street"
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && <p className="error-message">{errors.address.message}</p>}
                </div>
                <div className="form-grid three-column">
                  <div className="form-group">
                    <label htmlFor="city">
                      <CityIcon /> City
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={errors.city ? 'error' : ''}
                      placeholder="Chennai"
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && <p className="error-message">{errors.city.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">
                      <StateIcon /> State
                    </label>
                    <select
                      id="state"
                      className={errors.state ? 'error' : ''}
                      {...register('state', { required: 'State is required' })}
                    >
                      <option value="">Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                    {errors.state && <p className="error-message">{errors.state.message}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">
                      <PinIcon /> PIN Code
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      className={errors.pincode ? 'error' : ''}
                      placeholder="600001"
                      {...register('pincode', {
                        required: 'PIN code is required',
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: 'Enter a valid 6-digit PIN',
                        },
                      })}
                    />
                    {errors.pincode && <p className="error-message">{errors.pincode.message}</p>}
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="checkout-section"
              >
                <div className="section-header">
                  <CreditCard className="section-icon" />
                  <h2>Payment Method</h2>
                </div>
                <div className="payment-option">
                  <div className="radio-group">
                    <input
                      type="radio"
                      id="cod"
                      value="cod"
                      {...register('paymentMethod')}
                      defaultChecked
                    />
                    <label htmlFor="cod">
                      <span className="radio-label">Cash on Delivery</span>
                      
                      <span className="radio-description">Pay when you receive your order</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Summary */}
            <div className="order-summary">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="summary-card"
              >
                <div className="section-header">
                  <Tag className="section-icon" />
                  <h2>Order Summary</h2>
                </div>
                <div className="order-items">
                  <p>Order Items ({totalItems})</p>
                  <div className="items-list">
                    {cartItems.map((item) => (
                      <div key={item._id || item.id} className="item"> {/* Changed key prop */}
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-price">₹{item.price} × {item.quantity}</p>
                        </div>
                        <span className="item-total">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>₹{subTotal}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    {isShippingFree ? (
                      <span className="free-shipping">Free</span>
                    ) : (
                      <span>₹{shippingCost}</span>
                    )}
                  </div>
                  <div className="total-row">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="grand-total">
                    <div className="total-row">
                      <span>Total</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="submit-button" >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>

      <style >{`
        .checkout-page {
          min-height: 100vh;
          padding-top: 1 rem;
          padding-bottom: 4rem;
          background-color: #e6f0ff; /* Light blue background */
        }
        .container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .checkout-header {
          text-align: center;
          margin-bottom: 1px;
        }
        .checkout-header .header-icon {
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }
        .checkout-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e3a8a;
        }
        .checkout-header p {
          color: #4b5563;
        }
        .checkout-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .checkout-content {
            flex-direction: row;
          }
        }
        .checkout-form {
          width: 100%;
        }
        @media (min-width: 1024px) {
          .checkout-form {
            width: 66.666667%;
          }
        }
        .checkout-section {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #dbeafe;
          padding-bottom: 0.5rem;
        }
        .section-icon {
          height: 1.5rem;
          width: 1.5rem;
          color: #3b82f6;
          margin-right: 0.75rem;
        }
        .section-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e3a8a;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .three-column {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .three-column {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.35rem;
        }
        input,
        select {
          width: 100%;
          padding: 0.6rem 0.85rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input:focus,
        select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .error {
          border-color: #ef4444;
        }
        .error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        .error-message {
          margin-top: 0.25rem;
          font-size: 0.75rem;
          color: #dc2626;
        }
        .phone-input {
          display: flex;
        }
        .phone-prefix {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.75rem;
          color: #6b7280;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-right: none;
          border-radius: 0.5rem 0 0 0.5rem;
        }
        .prefix-icon {
          height: 1.1rem;
          width: 1.1rem;
        }
        .phone-input input {
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .payment-option {
          background-color: #f9fafb;
          border-radius: 0.5rem;
          padding: 1rem;
        }
        .radio-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .radio-group input {
          width: 1rem;
          height: 1rem;
          accent-color: #3b82f6;
        }
        .radio-label {
          font-weight: 500;
          font-size: 0.9rem;
        }
        .radio-description {
          font-size: 0.75rem;
          color: #6b7280;
        }
        .order-summary {
          width: 100%;
        }
        @media (min-width: 1024px) {
          .order-summary {
            width: 33.333333%;
          }
        }
        .summary-card {
          background-color: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 1.75rem;
          position: sticky;
          top: 6rem;
          border: 1px solid #dbeafe;
        }
        .order-items p {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }
        .items-list {
          max-height: 20rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px dashed #e5e7eb;
        }
        .item-image {
          height: 4rem;
          width: 4rem;
          background-color: #f3f4f6;
          border-radius: 0.375rem;
          overflow: hidden;
          flex-shrink: 0;
        }
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .item-details {
          flex-grow: 1;
        }
        .item-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #111827;
        }
        .item-price {
          font-size: 0.85rem;
          color: #6b7280;
        }
        .item-total {
          font-weight: 600;
          color: #111827;
        }
        .order-totals {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: #374151;
        }
        .grand-total {
          border-top: 2px solid #d1d5db;
          padding-top: 0.75rem;
          margin-top: 0.75rem;
        }
        .grand-total .total-row {
          font-weight: 600;
          font-size: 1.125rem;
          color: #111827;
        }
        .free-shipping {
          color: #10b981;
        }
        .submit-button {
          width: 100%;
          padding: 0.85rem 1.25rem;
          background-color: #3b82f6;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
          font-size: 1rem;
        }
        .submit-button:hover {
          background-color: #2563eb;
        }
        .submit-button:disabled {
          background-color: #bfdbfe;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;

// Helper Icons
const UserIcon = () => <span style={{ marginRight: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>;
const MailIcon = () => <span style={{ marginRight: '0.5rem' }}><Mail size={16} color="#6b7280" /></span>;
const PhoneIcon = () => <span style={{ marginRight: '0.5rem' }}><Phone size={16} color="#6b7280" /></span>;
const TruckIcon = () => <span style={{ marginRight: '0.5rem' }}><Truck size={16} color="#6b7280" /></span>;
const CityIcon = () => <span style={{ marginRight: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>;
const StateIcon = () => <span style={{ marginRight: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg></span>;
const PinIcon = () => <span style={{ marginRight: '0.5rem' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="11" r="1"></circle><path d="M11 17Q12 20 12 20 12 20 13 17 15 12 12 9 9 12 11 17Z"></path></svg></span>;