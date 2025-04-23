

import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Button, Collapse } from '@mui/material';
import GetBestPriceModal from './GetBestPriceModal';

const categoryData = [
  {
    name: 'Automotive Lubricants',
    images: [
      { src: 'img1.jpeg', name: 'Castrol Magnatec Stop-Start 5W-30 Engine Oil1', description: 'Protects engine, saves fuel in heavy traffic. ', price: 1800 },
      { src: 'prodau5.jpeg', name: 'Shell Advance 4T Ax7 15W-50 Engine Oil Pack', description: 'Enhances performance, ensures smooth and protected drive.', price: 2000 },
      { src: 'prodau3.jpeg', name: 'Servo 4T Engine Oil', description: 'Ensures smooth performance and reduced engine noise in long drives.', price: 2200 },
      { src: 'prodau4.jpeg', name: 'Castrol EDGE 5W-40 ENGINE OIL', description: 'The oil is protecting the engines under extreme temperature conditions.', price: 2100 }
    ]
  },
  {
    name: 'Synthetic Oil',
    images: [
      { src: 'syp1.jpeg', name: 'Valvoline DuraBlend 10W-40 Synthetic Blend Engine Oil', description: 'Fully synthetic oil for peak engine efficiency and fuel economy.', price: 3200 },
      { src: 'syp2.jpeg', name: 'AutoZone Castrol EDGE Full Synthetic 10W-30 1 Quart', description: 'Synthetic oil that helps reduce sludge and keeps engines cleaner.', price: 3100 },
      { src: 'syp3.jpeg', name: 'AutoZone Mobil1 Advanced Full Synthetic W-20 5 Quarts', description: 'Designed for high mileage vehicles, prolonging engine life.', price: 3300 },
      { src: 'syp4.jpeg', name: 'castrol magnatec 10w 40 engine oil 5 litre dark green', description: 'High-performance synthetic oil for extended drain intervals.', price: 3500 }
    ]
  },
  {
    name: 'Gas Engine Oil',
    images: [
      { src: 'prodg1.jpeg', name: 'GDivyol ECO4 SAE 20W40 API CF SF Gas Engine Oil', description: 'Optimized for gas engines, ensuring friction reduction and smooth operation.', price: 2500 },
      { src: 'prodg2.jpeg', name: 'Divyol Power Trans C3 C4 SAE 10 Transmission Oil', description: 'Protects engine under stop-and-go driving conditions.', price: 2600 },
      
    ]
  },
  {
    name: 'Engine Oil',
    images: [
      { src: 'prode1.jpeg', name: 'Motul 5W30 300V 4T  Motorcycle Automobile Oil', description: 'Long-lasting oil for extended engine protection.', price: 1900 },
      { src: 'prode2.jpg', name: 'Castrol Magnatec Diesel 15W 40 Engine Oil', description: 'Reduces engine wear and improves fuel efficiency.', price: 1950 },
      { src: 'prode3.jpeg', name: 'Motul 3000 4T PLUS 20W 40 Engine Oil ', description: 'Boosts engine life and mileage.', price: 2000 },
      { src: 'prode4.jpeg', name: 'ELF 20W-40 4 Moto 4 Tech Stroke Engine Oil', description: 'Ideal for high temperature conditions.', price: 2100 }
    ]
  },
  {
    name: 'Oil Lubricants',
    images: [
      { src: 'prodo1.jpg', name: 'Shell Rimula R2 40 Heavy Duty Diesel Engine Oil', description: 'Prevents rust and friction in moving parts.', price: 1700 },
      { src: 'prodo2.png', name: 'Shell 1 L Spirax S2 A 85W 140 Api Gl 5 Axle Oil ', description: 'All-purpose industrial oil lubricant.', price: 1750 },
      { src: 'prodo3.jpeg', name: 'motor oil SHELL HELIX HX5 SN/CF, A3/B3 15W-40', description: 'Synthetic-based oil for high performance.', price: 1800 },
      { src: 'prodo4.jpeg', name: 'SAVSOL VG Series Hydraulic Oils 20 ltr for cars', description: 'High durability and stability.', price: 1850 }
    ]
  },
  {
    name: 'Diesel Engine Oil',
    images: [
      { src: 'podd1.jpeg', name: 'Shell Rimula R2 40 Heavy Duty Diesel Engine Oil', description: 'For heavy-duty diesel engines.', price: 2300 },
      { src: 'prodd2.jpeg', name: 'Servo Pride TC 15W 40 Diesel Engine Oil 3 ltr', description: 'Controls deposits and maintains power.', price: 2350 },
      { src: 'prodd3.jpeg', name: 'Servo Pride 30 Diesel Engine Oil', description: 'Improves fuel economy.', price: 2400 },
      { src: 'prodd4.jpeg', name: 'Divyol Automotive Heavy Duty Diesel Engine Oil', description: 'Ideal for commercial vehicles.', price: 2500 }
    ]
  },
  {
    name: 'Car Engine Oil',
    images: [
      { src: 'prodc1.jpeg', name: 'Shell 550052921 Engine Oil For Cars Helix Taxi 5W30', description: 'Formulated for modern petrol engines.', price: 2200 },
      { src: 'prodc2.jpeg', name: 'Shell Helix HX7 10W-40 Semi Synthetic Car Engine Oil', description: 'Protects emission systems.', price: 2150 },
      { src: 'prodc3.jpeg', name: 'Shell Helix Ultra 5W-40 Fully Synthetic Car Engine Oil', description: 'Maximizes fuel efficiency.', price: 2100 },
      { src: 'prodc4.jpeg', name: 'Divyol Automotive Passenger Car Motor Oil', description: 'Extends oil change intervals.', price: 2250 }
    ]
  },
  {
    name: 'Bike Engine',
    images: [
      { src: 'prodb1.jpeg', name: 'Servo Engine Oil For Gearless Scooters', description: 'Suitable for all 2-stroke bikes.', price: 1600 },
      { src: 'prodb2.jpeg', name: 'ELF Moto 4 Pro 1 Litre Engine Oil [20W-40]', description: 'Smooth gear shifts and acceleration.', price: 1650 },
      { src: 'prodb3.jpeg', name: 'SAVSOL Ester5 Ester Scooter 4(At) 10W-30', description: 'Reduces clutch slippage.', price: 1700 },
      { src: 'prodb44.jpeg', name: 'Divyol Spin Q5 20W50 2 Stroke Motor Oil', description: 'Low friction and longer rides.', price: 1750 }
    ]
  },
  {
    name: 'Industrial Lubricants',
    images: [
      { src: 'prodi1.jpeg', name: 'Servo Lubricant Oil Can (1/2 Pint, Red)-30-102', description: 'Perfect for heavy-duty industrial use.', price: 3000 },
      { src: 'prodi2.jpeg', name: 'HP Metwire Nb Rodec 120 Wire Rope Lubricants', description: 'Non-corrosive and anti-rust formula.', price: 3100 }
    ]
      
  },
  {
    name: 'Four Stroke Oil',
    images: [
      { src: 'prodf1.jpeg', name: 'Shell Advance AX7 4 Stroke Motorcycle Engine Oil', description: 'Designed for 4-stroke engines.', price: 1800 }
      
    ]
  }
];

export const Categories = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleToggle = (category) => {
    setExpandedCategory(prev => (prev === category ? null : category));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
        Categories
      </Typography>
      {categoryData.map((cat, idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <Button
            onClick={() => handleToggle(cat.name)}
            variant="outlined"
            fullWidth
            sx={{ textTransform: 'none', justifyContent: 'flex-start', fontSize: '1.2rem' }}
          >
            {cat.name}
          </Button>
          <Collapse in={expandedCategory === cat.name} timeout="auto" unmountOnExit>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {cat.images.map((img, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img.src}
                      alt={img.name}
                      sx={{ height: 140, width: 140, objectFit: 'contain', mx: 'auto', mt: 2, borderRadius: 2 }}
                    />
                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {img.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {img.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                        ₹ {img.price.toLocaleString()} /unit
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 2 }}
                        onClick={() => handleOpenModal({ ...img, image: img.src })}
                      >
                        Get Best Price
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Box>
      ))}
      {selectedProduct && (
        <GetBestPriceModal
          open={openModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};
