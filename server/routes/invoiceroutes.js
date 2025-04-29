const express = require('express');
const router = express.Router();
const generateInvoicePDF = require('../invoice/generateinvoice'); 

router.post('/generate-invoice', (req, res) => {
  const order = req.body;

  if (!order || !order.items || order.items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

  generateInvoicePDF(res, order);
});

module.exports = router;
