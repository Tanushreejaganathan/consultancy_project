
/*
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetBestPriceModal from './GetBestPriceModal'; // Make sure this path is correct

export const Home = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const banners = ['/banner1.png', '/banner2.jpg', '/bann1.png'];

  const products = [
    {
      name: 'Castrol 5W-40 Magnatec SUV Oil - 3.5 Litre',
      price: '₹ 1.8 K / Unit',
      image: 'img1.jpeg',
    },
    {
      name: 'Motul 5W30 300V 4T Factory Line Motorcycle Oil',
      price: '₹ 5.5 K / Unit',
      image: '/img2.png',
    },
    {
      name: 'Castrol Magnatec Stop-Start 5W-30 Engine Oil',
      price: '₹ 1.8 K / Unit',
      image: 'img3.jpeg',
    },
    {
      name: 'Motul 1 Litre 15W50 Factory Line Motorcycle Oil',
      price: '₹ 2.0 K / Unit',
      image: 'img4.jpeg',
    },
    {
      name: 'Shell Advance Ultra 10W-40 Full Synthetic',
      price: '₹ 3.2 K / Unit',
      image: 'img5.jpeg',
    },
  ];

  const visibleCount = 2;

  const nextBanner = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        setTransitioning(false);
      }, 300);
    }
  };

  const prevBanner = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
        setTransitioning(false);
      }, 300);
    }
  };

  const handleDotClick = (index) => {
    if (!transitioning && index !== bannerIndex) {
      setTransitioning(true);
      setTimeout(() => {
        setBannerIndex(index);
        setTransitioning(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - visibleCount + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleCount) % products.length);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % products.length],
  ];

  return (
    <Box sx={{ backgroundColor: '#fff', pb: 8 }}>
      
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 'auto', md: '75vh' },
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={banners[bannerIndex]}
          alt={`banner-${bannerIndex}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        <IconButton
          onClick={prevBanner}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={nextBanner}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
          }}
        >
          {banners.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: bannerIndex === index ? '#f44336' : '#fff',
                border: '1px solid #999',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Box>
      </Box>

    
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f9f9f9, #fffbe6)',
          mt: 6,
          py: 10,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          maxWidth: '1600px',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: '#1a1a1a',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Power Your Ride with Precision.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: '#ff6f00',
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Trusted Engine Oils for Maximum Performance & Protection
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none' }}
          >
            Browse Lubricants
          </Button>
        </Box>

        <Box sx={{ flex: 1 }}>
          <img
            src="/hme3.jpg"
            alt="Engine Oil Promotion"
            style={{
              width: '100%',
              maxHeight: '400px',
              borderRadius: '16px',
              objectFit: 'cover',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </Box>
      </Box>

     
      <Box sx={{ maxWidth: '1100px', mx: 'auto', mt: 10, px: 2, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
          Popular Products
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>

          {visibleProducts.map((product, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                boxShadow: 6,
                transition: 'all 0.3s ease',
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                height="200"
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>{product.price}</Typography>
                <Typography variant="caption" color="text.secondary">(MOQ): 1 Unit</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                sx={{ m: 2, textTransform: 'none' }}
                onClick={() => handleOpenModal(product)}
              >
                Get Best Price
              </Button>
            </Card>
          ))}

          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      
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

*/

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetBestPriceModal from './GetBestPriceModal'; // Make sure this path is correct

export const Home = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const banners = ['/banner1.png', '/banner2.jpg', '/bann1.png'];

  const products = [
    {
      name: 'Castrol 5W-40 Magnatec SUV Oil - 3.5 Litre',
      description: 'High-performance oil suitable for modern SUVs, providing wear protection and fuel economy.',
      price: 1800,
      image: 'img1.jpeg',
    },
    {
      name: 'Motul 5W30 300V 4T Factory Line Motorcycle Oil',
      description: 'Premium racing oil for motorcycles ensuring high engine response and durability.',
      price: 5500,
      image: '/img2.png',
    },
    {
      name: 'Castrol Magnatec Stop-Start 5W-30 Engine Oil',
      description: 'Engine oil formulated for stop-start driving, ensuring better wear protection.',
      price: 1800,
      image: 'img3.jpeg',
    },
    {
      name: 'Motul 1 Litre 15W50 Factory Line Motorcycle Oil',
      description: 'Suitable for high-performance motorcycles, maintains viscosity under extreme conditions.',
      price: 2000,
      image: 'img4.jpeg',
    },
    {
      name: 'Shell Advance Ultra 10W-40 Full Synthetic',
      description: 'Fully synthetic motorcycle oil for smooth performance and engine cleanliness.',
      price: 3200,
      image: 'img5.jpeg',
    },
  ];

  const visibleCount = 2;

  const nextBanner = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        setTransitioning(false);
      }, 300);
    }
  };

  const prevBanner = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
        setTransitioning(false);
      }, 300);
    }
  };

  const handleDotClick = (index) => {
    if (!transitioning && index !== bannerIndex) {
      setTransitioning(true);
      setTimeout(() => {
        setBannerIndex(index);
        setTransitioning(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - visibleCount + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleCount) % products.length);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % products.length],
  ];

  return (
    <Box sx={{ backgroundColor: '#fff', pb: 8 }}>
      {/* Banner Carousel */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 'auto', md: '75vh' },
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={banners[bannerIndex]}
          alt={`banner-${bannerIndex}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        <IconButton
          onClick={prevBanner}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={nextBanner}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
          }}
        >
          {banners.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: bannerIndex === index ? '#f44336' : '#fff',
                border: '1px solid #999',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Feature Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f9f9f9, #fffbe6)',
          mt: 6,
          py: 10,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          maxWidth: '1600px',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: '#1a1a1a',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Power Your Ride with Precision.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: '#ff6f00',
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Trusted Engine Oils for Maximum Performance & Protection
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: 'none' }}
          >
            Browse Lubricants
          </Button>
        </Box>

        <Box sx={{ flex: 1 }}>
          <img
            src="/hme3.jpg"
            alt="Engine Oil Promotion"
            style={{
              width: '100%',
              maxHeight: '400px',
              borderRadius: '16px',
              objectFit: 'cover',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          />
        </Box>
      </Box>

      {/* Product Carousel */}
      <Box sx={{ maxWidth: '1100px', mx: 'auto', mt: 10, px: 2, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
          Popular Products
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>

          {visibleProducts.map((product, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                boxShadow: 6,
                transition: 'all 0.3s ease',
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                height="200"
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{product.description}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>₹ {product.price.toLocaleString()} / Unit</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                sx={{ m: 2, textTransform: 'none' }}
                onClick={() => handleOpenModal(product)}
              >
                Get Best Price
              </Button>
            </Card>
          ))}

          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Best Price Modal */}
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
