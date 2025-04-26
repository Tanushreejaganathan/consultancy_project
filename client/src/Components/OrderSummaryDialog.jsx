// src/components/OrderSummaryDialog.jsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button
} from '@mui/material';

const OrderSummaryDialog = ({ open, orderSummary, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Summary</DialogTitle>
      <DialogContent dividers>
        {orderSummary && (
          <Box sx={{ p: 2 }}>
            <Typography>Product Total: ₹ {orderSummary.productTotal.toFixed(2)}</Typography>
            <Typography>GST (18%): ₹ {orderSummary.gstAmount.toFixed(2)}</Typography>
            <Typography>Shipping Charge: ₹ {orderSummary.shippingCharge.toFixed(2)}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Grand Total: ₹ {orderSummary.grandTotal.toFixed(2)}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSummaryDialog;
