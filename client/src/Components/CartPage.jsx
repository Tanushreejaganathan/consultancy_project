/*import React from 'react';
import { useCart } from '../context/CartContext';
import { IconButton, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <Table>
            <TableHead style={{ backgroundColor: '#333' }}>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Products</TableCell>
                <TableCell style={{ color: 'white' }}>Title</TableCell>
                <TableCell style={{ color: 'white' }}>Price</TableCell>
                <TableCell style={{ color: 'white' }}>Quantity</TableCell>
                <TableCell style={{ color: 'white' }}>Total</TableCell>
                <TableCell style={{ color: 'white' }}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.image} alt={item.name} style={{ width: 50 }} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="h6" align="right" mt={3}>
            Grand Total: ${getTotal()}
          </Typography>
        </>
      )}
    </div>
  );
};

export default CartPage;


import React from 'react';
import { useCart } from '../context/CartContext';
import {
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#333' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Product</TableCell>
                  <TableCell sx={{ color: 'white' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                  <TableCell sx={{ color: 'white' }}>Total</TableCell>
                  <TableCell sx={{ color: 'white' }}>Remove</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeFromCart(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" align="right" mt={3}>
            Grand Total: ${getTotal()}
          </Typography>
        </>
      )}
    </div>
  );
};

export default CartPage;
*/

import React from 'react';
import { useCart } from '../context/CartContext';
import {
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#333' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Product</TableCell>
                  <TableCell sx={{ color: 'white' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                  <TableCell sx={{ color: 'white' }}>Total</TableCell>
                  <TableCell sx={{ color: 'white' }}>Remove</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.cartItemId}>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeFromCart(item.cartItemId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" align="right" mt={3}>
            Grand Total: ${getTotal()}
          </Typography>
        </>
      )}
    </div>
  );
};

export default CartPage;
