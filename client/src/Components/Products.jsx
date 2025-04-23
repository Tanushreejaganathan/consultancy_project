


/*import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import GetBestPriceModal from './GetBestPriceModal';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const productData = {
    automotive: [
      {
        id: 1,
        name: 'Castrol GTX Ultra Clean',
        price: 1800,
        image: '/prodau1.jpeg',
        description: 'Viscosity: 5W-30 — Best for petrol engines',
      },
      {
        id: 2,
        name: 'Mobil 1 Synthetic',
        price: 2200,
        image: '/mobil1.jpg',
        description: 'Viscosity: 0W-40 — Extended performance synthetic',
      },
      {
        id: 3,
        name: 'Shell Helix HX7',
        price: 1900,
        image: '/shell.jpg',
        description: 'Viscosity: 10W-40 — All-season protection',
      },
      {
        id: 4,
        name: 'Gulf Pride 4T',
        price: 1700,
        image: '/lub2.jpg',
        description: 'Viscosity: 20W-40 — Smooth engine running',
      },
      {
        id: 5,
        name: 'Valvoline Premium Blue',
        price: 2100,
        image: '/lub2.jpg',
        description: 'Viscosity: 15W-40 — High performance diesel oil',
      },
      {
        id: 6,
        name: 'Servo Engine Oil',
        price: 1600,
        image: '/servo.jpg',
        description: 'Viscosity: 5W-40 — Reliable Indian engine oil',
      },
    ],
    synthetic: [
      {
        id: 7,
        name: 'Castrol Edge Full Synthetic',
        price: 2500,
        image: '/synthetic1.jpg',
        description: 'Best for modern turbocharged engines',
      },
      {
        id: 8,
        name: 'Mobil 1 Extended Performance',
        price: 2600,
        image: '/synthetic2.jpg',
        description: 'Up to 20,000 miles of protection',
      },
      {
        id: 9,
        name: 'Shell Rotella Gas Truck',
        price: 2400,
        image: '/synthetic3.jpg',
        description: 'Protects under heavy loads',
      },
      {
        id: 10,
        name: 'Valvoline Advanced Full Synthetic',
        price: 2300,
        image: '/synthetic4.jpg',
        description: 'Anti-wear additives for longer life',
      },
      {
        id: 11,
        name: 'Liqui Moly Synthoil',
        price: 2700,
        image: '/synthetic5.jpg',
        description: 'German-made full synthetic oil',
      },
      {
        id: 12,
        name: 'Amsoil Signature Series',
        price: 2800,
        image: '/synthetic6.jpg',
        description: 'Top-tier protection for extended drains',
      },
    ],
    gas: [
      {
        id: 13,
        name: 'Shell Helix Ultra',
        price: 2100,
        image: '/gas1.jpg',
        description: 'PurePlus Technology for gas engines',
      },
      {
        id: 14,
        name: 'Castrol GTX Magnatec',
        price: 2000,
        image: '/gas2.jpg',
        description: 'Clings to parts for protection',
      },
      {
        id: 15,
        name: 'Mobil Super 3000',
        price: 1950,
        image: '/gas3.jpg',
        description: 'Great for gas cars and light trucks',
      },
      {
        id: 16,
        name: 'Valvoline SynPower',
        price: 2050,
        image: '/gas4.jpg',
        description: 'Low temp startup performance',
      },
      {
        id: 17,
        name: 'Pennzoil Platinum',
        price: 2150,
        image: '/gas5.jpg',
        description: 'Cleans pistons like no other',
      },
      {
        id: 18,
        name: 'Total Quartz 9000',
        price: 2250,
        image: '/gas6.jpg',
        description: 'Ultimate protection for gas engines',
      },
    ],
    engine: [
      {
        id: 19,
        name: 'Servo Engine Guard',
        price: 1850,
        image: '/engine1.jpg',
        description: 'Smooth performance for petrol and diesel engines',
      },
      {
        id: 20,
        name: 'Castrol Power1 4T',
        price: 1950,
        image: '/engine2.jpg',
        description: 'Perfect for bikes and scooters',
      },
      {
        id: 21,
        name: 'Shell Rimula R4',
        price: 2000,
        image: '/engine3.jpg',
        description: 'Heavy-duty engine oil for trucks and SUVs',
      },
      {
        id: 22,
        name: 'Valvoline TurboMax',
        price: 2100,
        image: '/engine4.jpg',
        description: 'Turbo diesel engine specialist',
      },
      {
        id: 23,
        name: 'Mobil Delvac MX',
        price: 2150,
        image: '/engine5.jpg',
        description: 'High mileage protection for diesel engines',
      },
      {
        id: 24,
        name: 'Gulf Super Duty',
        price: 1800,
        image: '/engine6.jpg',
        description: 'Reliable for everyday driving',
      },
    ],
    oilLubricants: [
      {
        id: 25,
        name: 'Servo Super Lubricant',
        price: 1200,
        image: '/oil1.jpg',
        description: 'High performance for industrial machinery',
      },
      {
        id: 26,
        name: 'Castrol Industrial Oil',
        price: 1500,
        image: '/oil2.jpg',
        description: 'Protects equipment from wear and tear',
      },
      {
        id: 27,
        name: 'Valvoline Machinery Oil',
        price: 1350,
        image: '/oil3.jpg',
        description: 'Lubricates industrial machines for smoother operation',
      },
      {
        id: 28,
        name: 'Mobil Industrial Lubricant',
        price: 1600,
        image: '/oil4.jpg',
        description: 'Excellent performance in high-load applications',
      },
      {
        id: 29,
        name: 'Shell Industrial Oil',
        price: 1700,
        image: '/oil5.jpg',
        description: 'Superior protection against rust and corrosion',
      },
      {
        id: 30,
        name: 'BP Energy Lubricant',
        price: 1550,
        image: '/oil6.jpg',
        description: 'Designed for high-performance machinery',
      },
    ],
    // Add this to your productData object after oilLubricants:
dieselEngineOil: [
  {
    id: 31,
    name: 'Castrol CRB Turbo',
    price: 2000,
    image: '/diesel1.jpg',
    description: 'Enhanced protection for diesel engines under pressure',
  },
  {
    id: 32,
    name: 'Shell Rimula R6',
    price: 2200,
    image: '/diesel2.jpg',
    description: 'Synthetic technology for heavy-duty diesel engines',
  },
  {
    id: 33,
    name: 'Mobil Delvac 1300 Super',
    price: 2100,
    image: '/diesel3.jpg',
    description: 'Protects against sludge and wear in diesel engines',
  },
  {
    id: 34,
    name: 'Valvoline Premium Blue Extreme',
    price: 2300,
    image: '/diesel4.jpg',
    description: 'API CK-4 approved for advanced diesel protection',
  },
  {
    id: 35,
    name: 'Total Rubia TIR',
    price: 2150,
    image: '/diesel5.jpg',
    description: 'High-performance diesel engine oil for trucks',
  },
  {
    id: 36,
    name: 'Servo Diesel Guard',
    price: 1950,
    image: '/diesel6.jpg',
    description: 'Indian trusted protection for diesel engines',
  },
],
carEngineOil: [
  {
    id: 37,
    name: 'Castrol GTX Magnatec 10W-40',
    price: 2100,
    image: '/car1.jpg',
    description: 'Magnetic molecules cling to engine parts for extra protection',
  },
  {
    id: 38,
    name: 'Mobil Super 1000 X1 15W-40',
    price: 1800,
    image: '/car2.jpg',
    description: 'Good for general engine protection in cars',
  },
  {
    id: 39,
    name: 'Shell Helix HX5 10W-40',
    price: 2000,
    image: '/car3.jpg',
    description: 'For petrol and diesel engines, excellent all-season performance',
  },
  {
    id: 40,
    name: 'Valvoline VR1 Racing 20W-50',
    price: 2500,
    image: '/car4.jpg',
    description: 'Designed for high-performance racing engines',
  },
  {
    id: 41,
    name: 'Liqui Moly Synthoil 5W-40',
    price: 2700,
    image: '/car5.jpg',
    description: 'Premium protection for modern high-performance engines',
  },
  {
    id: 42,
    name: 'Amsoil Synthetics 5W-30',
    price: 2800,
    image: '/car6.jpg',
    description: 'Advanced synthetic oil for extended engine life',
  },
],
bikeEngineOil: [
  {
    id: 43,
    name: 'Castrol Power1 4T 10W-30',
    price: 1600,
    image: '/bike1.jpg',
    description: 'Provides superior protection for motorcycle engines',
  },
  {
    id: 44,
    name: 'Motul 7100 4T 10W-40',
    price: 2200,
    image: '/bike2.jpg',
    description: 'Premium motorcycle oil for four-stroke engines',
  },
  {
    id: 45,
    name: 'Shell Advance AX7 10W-40',
    price: 1800,
    image: '/bike3.jpg',
    description: 'Specially formulated for modern motorcycles',
  },
  {
    id: 46,
    name: 'Valvoline 4T Motorcycle Oil 20W-50',
    price: 2100,
    image: '/bike4.jpg',
    description: 'Heavy-duty protection for high-performance bikes',
  },
  {
    id: 47,
    name: 'Liqui Moly 4T Street Race 10W-40',
    price: 2500,
    image: '/bike5.jpg',
    description: 'Top protection for high-speed motorcycle engines',
  },
  {
    id: 48,
    name: 'Motorex Cross Power 4T 10W-50',
    price: 2700,
    image: '/bike6.jpg',
    description: 'Ultimate protection for motocross and off-road bikes',
  },
],
machineryLubricants: [
  {
    id: 49,
    name: 'Mobil DTE 25 Hydraulic Oil',
    price: 3500,
    image: '/machinery1.jpg',
    description: 'Premium anti-wear hydraulic oil for industrial machinery',
  },
  {
    id: 50,
    name: 'Castrol Hyspin AWS 68',
    price: 3200,
    image: '/machinery2.jpg',
    description: 'High performance hydraulic fluid with excellent oxidation stability',
  },
  {
    id: 51,
    name: 'Shell Tellus S2 M 46',
    price: 3000,
    image: '/machinery3.jpg',
    description: 'Reliable performance hydraulic oil for a wide range of machinery',
  },
  {
    id: 52,
    name: 'Gulf Harmony AW 32',
    price: 2800,
    image: '/machinery4.jpg',
    description: 'Anti-wear lubricant ideal for industrial hydraulic systems',
  },
  {
    id: 53,
    name: 'Servo System 68',
    price: 2900,
    image: '/machinery5.jpg',
    description: 'Industrial-grade lubricant for hydraulic equipment and systems',
  },
  {
    id: 54,
    name: 'Valvoline Ultramax Hydraulic Oil',
    price: 3100,
    image: '/machinery6.jpg',
    description: 'Heavy-duty performance oil for high-load industrial machines',
  },
],
fourStrokeEngineOil: [
  {
    id: 55,
    name: 'Castrol Power1 4T 10W-40',
    price: 460,
    image: '/fourstroke1.jpg',
    description: 'Advanced 4-stroke oil designed for fast acceleration and high performance',
  },
  {
    id: 56,
    name: 'Shell Advance AX7 10W-40',
    price: 480,
    image: '/fourstroke2.jpg',
    description: 'Semi-synthetic oil for better control and smooth riding',
  },
  {
    id: 57,
    name: 'Motul 3100 Gold 4T 10W-30',
    price: 500,
    image: '/fourstroke3.jpg',
    description: 'Technosynthese 4T oil for superior engine protection and cleanliness',
  },
  {
    id: 58,
    name: 'Gulf Pride 4T Plus 20W-40',
    price: 450,
    image: '/fourstroke4.jpg',
    description: 'Specially formulated for smooth clutch operation in 4T bikes',
  },
  {
    id: 59,
    name: 'Valvoline 4T Premium 20W-50',
    price: 440,
    image: '/fourstroke5.jpg',
    description: 'High quality oil for air-cooled 4-stroke motorcycle engines',
  },
  {
    id: 60,
    name: 'Servo 4T SAE 20W-40',
    price: 430,
    image: '/fourstroke6.jpg',
    description: 'Reliable performance for modern 4-stroke motorcycles',
  },
],



  };

  const renderSection = (title, products) => {
    const filtered = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 6);

    return (
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title} ({filtered.length} Products Shown)
        </Typography>
        <Grid container spacing={3}>
          {filtered.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: 3,
                  minHeight: 420,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.jpg';
                  }}
                  sx={{
                    height: 180,
                    objectFit: 'contain',
                    backgroundColor: '#f0f0f0',
                    p: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: 'primary.main' }}>
                    ₹ {product.price.toLocaleString()} / unit
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenModal(product)}
                  >
                    GET BEST PRICE
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 4,
          mb: 4,
          boxShadow: 2,
        }}
      >
        <Box sx={{ flex: 1, mr: { md: 4 }, mb: { xs: 3, md: 0 } }}>
          <img
            src="/prod2.png"
            alt="Banner"
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Power Your Ride with Precision.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Power your engine with unmatched precision and protection — engineered
            for those who demand the best in performance, durability, and efficiency.
          </Typography>
          <Button variant="contained" color="primary">
            Browse Lubricants
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '100%', maxWidth: 400 }}
        />
      </Box>

      {renderSection('Automotive Oils', productData.automotive)}
      {renderSection('Synthetic Oils', productData.synthetic)}
      {renderSection('Gas Engine Oils', productData.gas)}
      {renderSection('Engine Oils', productData.engine)}
      {renderSection('Oil Lubricants', productData.oilLubricants)}
      {renderSection('Diesel Engine Oils', productData.dieselEngineOil)}
      {renderSection('Car Engine Oils', productData.carEngineOil)}
      {renderSection('Bike Engine Oils', productData.bikeEngineOil)}
      {renderSection('Machinery Lubricants', productData.machineryLubricants)}
      {renderSection('Four Stroke Engine Oil', productData.fourStrokeEngineOil)}






      {selectedProduct && (
        <GetBestPriceModal
          open={modalOpen}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};

export { Products };

*/

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import GetBestPriceModal from './GetBestPriceModal';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const productData = {
    automotive: [
      {
        id: 1,
        name: 'Castrol GTX Ultra Clean',
        price: 1800,
        image: '/prodau1.jpeg',
        description: 'Viscosity: 5W-30 — Best for petrol engines',
      },
      {
        id: 2,
        name: 'Mobil 1 Synthetic',
        price: 2200,
        image: '/mobil1.jpg',
        description: 'Viscosity: 0W-40 — Extended performance synthetic',
      },
      {
        id: 3,
        name: 'Shell Helix HX7',
        price: 1900,
        image: '/shell.jpg',
        description: 'Viscosity: 10W-40 — All-season protection',
      },
      {
        id: 4,
        name: 'Gulf Pride 4T',
        price: 1700,
        image: '/lub2.jpg',
        description: 'Viscosity: 20W-40 — Smooth engine running',
      },
      {
        id: 5,
        name: 'Valvoline Premium Blue',
        price: 2100,
        image: '/lub2.jpg',
        description: 'Viscosity: 15W-40 — High performance diesel oil',
      },
      {
        id: 6,
        name: 'Servo Engine Oil',
        price: 1600,
        image: '/servo.jpg',
        description: 'Viscosity: 5W-40 — Reliable Indian engine oil',
      },
    ],
    synthetic: [
      {
        id: 7,
        name: 'Castrol Edge Full Synthetic',
        price: 2500,
        image: '/synthetic1.jpg',
        description: 'Best for modern turbocharged engines',
      },
      {
        id: 8,
        name: 'Mobil 1 Extended Performance',
        price: 2600,
        image: '/synthetic2.jpg',
        description: 'Up to 20,000 miles of protection',
      },
      {
        id: 9,
        name: 'Shell Rotella Gas Truck',
        price: 2400,
        image: '/synthetic3.jpg',
        description: 'Protects under heavy loads',
      },
      {
        id: 10,
        name: 'Valvoline Advanced Full Synthetic',
        price: 2300,
        image: '/synthetic4.jpg',
        description: 'Anti-wear additives for longer life',
      },
      
    ],
    gas: [
      {
        id: 11,
        name: 'Shell Helix Ultra',
        price: 2100,
        image: '/gas1.jpg',
        description: 'PurePlus Technology for gas engines',
      },
      {
        id: 12,
        name: 'Castrol GTX Magnatec',
        price: 2000,
        image: '/gas2.jpg',
        description: 'Clings to parts for protection',
      },
      
    ],
    engine: [
      {
        id: 13,
        name: 'Servo Engine Guard',
        price: 1850,
        image: '/engine1.jpg',
        description: 'Smooth performance for petrol and diesel engines',
      },
      {
        id: 14,
        name: 'Castrol Power1 4T',
        price: 1950,
        image: '/engine2.jpg',
        description: 'Perfect for bikes and scooters',
      },
      {
        id: 15,
        name: 'Shell Rimula R4',
        price: 2000,
        image: '/engine3.jpg',
        description: 'Heavy-duty engine oil for trucks and SUVs',
      },
      {
        id: 16,
        name: 'Valvoline TurboMax',
        price: 2100,
        image: '/engine4.jpg',
        description: 'Turbo diesel engine specialist',
      },
      {
        id: 17,
        name: 'Mobil Delvac MX',
        price: 2150,
        image: '/engine5.jpg',
        description: 'High mileage protection for diesel engines',
      },
      {
        id: 18,
        name: 'Gulf Super Duty',
        price: 1800,
        image: '/engine6.jpg',
        description: 'Reliable for everyday driving',
      },
    ],
    oilLubricants: [
      {
        id: 19,
        name: 'Servo Super Lubricant',
        price: 1200,
        image: '/oil1.jpg',
        description: 'High performance for industrial machinery',
      },
      {
        id: 20,
        name: 'Castrol Industrial Oil',
        price: 1500,
        image: '/oil2.jpg',
        description: 'Protects equipment from wear and tear',
      },
      {
        id: 21,
        name: 'Valvoline Machinery Oil',
        price: 1350,
        image: '/oil3.jpg',
        description: 'Lubricates industrial machines for smoother operation',
      },
      {
        id: 22,
        name: 'Mobil Industrial Lubricant',
        price: 1600,
        image: '/oil4.jpg',
        description: 'Excellent performance in high-load applications',
      },
      
    ],
    // Add this to your productData object after oilLubricants:
dieselEngineOil: [
  {
    id: 23,
    name: 'Castrol CRB Turbo',
    price: 2000,
    image: '/diesel1.jpg',
    description: 'Enhanced protection for diesel engines under pressure',
  },
  {
    id: 24,
    name: 'Shell Rimula R6',
    price: 2200,
    image: '/diesel2.jpg',
    description: 'Synthetic technology for heavy-duty diesel engines',
  },
  {
    id: 25,
    name: 'Mobil Delvac 1300 Super',
    price: 2100,
    image: '/diesel3.jpg',
    description: 'Protects against sludge and wear in diesel engines',
  },
  {
    id: 26,
    name: 'Valvoline Premium Blue Extreme',
    price: 2300,
    image: '/diesel4.jpg',
    description: 'API CK-4 approved for advanced diesel protection',
  },
  {
    id: 27,
    name: 'Total Rubia TIR',
    price: 2150,
    image: '/diesel5.jpg',
    description: 'High-performance diesel engine oil for trucks',
  },
  {
    id: 28,
    name: 'Servo Diesel Guard',
    price: 1950,
    image: '/diesel6.jpg',
    description: 'Indian trusted protection for diesel engines',
  },
],
carEngineOil: [
  {
    id: 29,
    name: 'Castrol GTX Magnatec 10W-40',
    price: 2100,
    image: '/car1.jpg',
    description: 'Magnetic molecules cling to engine parts for extra protection',
  },
  {
    id: 30,
    name: 'Mobil Super 1000 X1 15W-40',
    price: 1800,
    image: '/car2.jpg',
    description: 'Good for general engine protection in cars',
  },
  {
    id: 31,
    name: 'Shell Helix HX5 10W-40',
    price: 2000,
    image: '/car3.jpg',
    description: 'For petrol and diesel engines, excellent all-season performance',
  },
  {
    id: 32,
    name: 'Valvoline VR1 Racing 20W-50',
    price: 2500,
    image: '/car4.jpg',
    description: 'Designed for high-performance racing engines',
  },
 
],
bikeEngineOil: [
  {
    id: 33,
    name: 'Castrol Power1 4T 10W-30',
    price: 1600,
    image: '/bike1.jpg',
    description: 'Provides superior protection for motorcycle engines',
  },
  {
    id: 34,
    name: 'Motul 7100 4T 10W-40',
    price: 2200,
    image: '/bike2.jpg',
    description: 'Premium motorcycle oil for four-stroke engines',
  },
  {
    id: 35,
    name: 'Shell Advance AX7 10W-40',
    price: 1800,
    image: '/bike3.jpg',
    description: 'Specially formulated for modern motorcycles',
  },
  {
    id: 36,
    name: 'Valvoline 4T Motorcycle Oil 20W-50',
    price: 2100,
    image: '/bike4.jpg',
    description: 'Heavy-duty protection for high-performance bikes',
  },
  {
    id: 37,
    name: 'Liqui Moly 4T Street Race 10W-40',
    price: 2500,
    image: '/bike5.jpg',
    description: 'Top protection for high-speed motorcycle engines',
  },
  {
    id: 38,
    name: 'Motorex Cross Power 4T 10W-50',
    price: 2700,
    image: '/bike6.jpg',
    description: 'Ultimate protection for motocross and off-road bikes',
  },
],
machineryLubricants: [
  {
    id: 39,
    name: 'Mobil DTE 25 Hydraulic Oil',
    price: 3500,
    image: '/machinery1.jpg',
    description: 'Premium anti-wear hydraulic oil for industrial machinery',
  },
  {
    id: 40,
    name: 'Castrol Hyspin AWS 68',
    price: 3200,
    image: '/machinery2.jpg',
    description: 'High performance hydraulic fluid with excellent oxidation stability',
  },
  
],
fourStrokeEngineOil: [
  {
    id: 41,
    name: 'Castrol Power1 4T 10W-40',
    price: 460,
    image: '/fourstroke1.jpg',
    description: 'Advanced 4-stroke oil designed for fast acceleration and high performance',
  },
  
],



  };

  const renderSection = (title, products) => {
    const filtered = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 6);

    return (
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title} ({filtered.length} Products Shown)
        </Typography>
        <Grid container spacing={3}>
          {filtered.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: 3,
                  minHeight: 420,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.jpg';
                  }}
                  sx={{
                    height: 180,
                    objectFit: 'contain',
                    backgroundColor: '#f0f0f0',
                    p: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: 'primary.main' }}>
                    ₹ {product.price.toLocaleString()} / unit
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleOpenModal(product)}
                  >
                    GET BEST PRICE
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 4,
          mb: 4,
          boxShadow: 2,
        }}
      >
        <Box sx={{ flex: 1, mr: { md: 4 }, mb: { xs: 3, md: 0 } }}>
          <img
            src="/prod2.png"
            alt="Banner"
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Power Your Ride with Precision.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Power your engine with unmatched precision and protection — engineered
            for those who demand the best in performance, durability, and efficiency.
          </Typography>
          <Button variant="contained" color="primary">
            Browse Lubricants
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '100%', maxWidth: 400 }}
        />
      </Box>

      {renderSection('Automotive Oils', productData.automotive)}
      {renderSection('Synthetic Oils', productData.synthetic)}
      {renderSection('Gas Engine Oils', productData.gas)}
      {renderSection('Engine Oils', productData.engine)}
      {renderSection('Oil Lubricants', productData.oilLubricants)}
      {renderSection('Diesel Engine Oils', productData.dieselEngineOil)}
      {renderSection('Car Engine Oils', productData.carEngineOil)}
      {renderSection('Bike Engine Oils', productData.bikeEngineOil)}
      {renderSection('Machinery Lubricants', productData.machineryLubricants)}
      {renderSection('Four Stroke Engine Oil', productData.fourStrokeEngineOil)}






      {selectedProduct && (
        <GetBestPriceModal
          open={modalOpen}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};

export { Products };
