/*import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Snackbar, Alert } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Contact = () => {
  coAnst [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("F.NO.106, VELAANS HP NO.1, SIPCOT NEAR, MOOKANDAPALLY, Sipcot-635126 (SIPCOT NEAR)");
    setCopied(true);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", backgroundColor: "#fff", p: 3, mt: 4, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Contact
      </Typography>

      
      <Button
        startIcon={<PhoneIcon />}
        variant="text"
        fullWidth
        sx={{ justifyContent: "flex-start", mb: 1 }}
        onClick={() => setShowPhone(true)}
      >
        {showPhone ? '📞 07947417225, 04344-401625' : 'Show Number'}
      </Button>

      
      <Button
        startIcon={<WhatsAppIcon />}
        variant="text"
        fullWidth
        sx={{ justifyContent: "flex-start", mb: 1 }}
        href="https://wa.me/917947417225"
        target="_blank"
      >
        WhatsApp
      </Button>

      
      <Button
        startIcon={<EmailIcon />}
        variant="text"
        fullWidth
        sx={{ justifyContent: "flex-start", mb: 1 }}
        onClick={() => setShowEmail(true)}
      >
        {showEmail ? '📧 velaanshpno1@gmail.com' : 'Get info via SMS/Email'}
      </Button>

      <Divider sx={{ my: 2 }} />

   
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Address
      </Typography>
      <Typography variant="body2" gutterBottom>
        F.NO.106, VELAANS HP NO.1, SIPCOT NEAR, MOOKANDAPALLY, Sipcot-635126 (SIPCOT NEAR)
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LocationOnIcon />}
          href="https://www.google.com/maps?q=F.NO.106,+VELAANS+HP+NO.1,+SIPCOT+NEAR,+MOOKANDAPALLY,+Sipcot-635126"
          target="_blank"
        >
          Get Directions
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyAddress}
        >
          Copy Address
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'green', mb: 1 }}>
        <AccessTimeIcon sx={{ mr: 1 }} fontSize="small" />
        Opens at 9:00 am tomorrow
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Actual hours may differ
      </Typography>

      <Divider sx={{ my: 2 }} />

      
      <Typography variant="body2" fontWeight="bold">
        GSTIN: 33ABCPL4146K1ZR
      </Typography>

     
      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)}>
        <Alert onClose={() => setCopied(false)} severity="success" sx={{ width: '100%' }}>
          Address copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
*/


import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Snackbar, Alert } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Contact = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("F.NO.106, VELAANS HP NO.1, SIPCOT NEAR, MOOKANDAPALLY, Sipcot-635126 (SIPCOT NEAR)");
    setCopied(true);
  };

  return (
    <Box sx={{
      width: "100%",
      maxWidth: "1000px",
      mx: "auto",
      backgroundColor: "#fff",
      p: { xs: 2, md: 4 },
      mt: 4,
      borderRadius: 2,
      boxShadow: 3
    }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Contact
      </Typography>

      {/* Show Number */}
      <Button
        startIcon={<PhoneIcon />}
        variant="text"
        fullWidth
        sx={{ justifyContent: "flex-start", mb: 1 }}
        onClick={() => setShowPhone(true)}
      >
        {showPhone ? '📞 07947417225, 04344-401625' : 'Show Number'}
      </Button>

      {/* WhatsApp */}
      <Button
        startIcon={<WhatsAppIcon />}
        variant="text"
        fullWidth
        sx={{ justifyContent: "flex-start", mb: 1 }}
        href="https://wa.me/917947417225"
        target="_blank"
      >
        WhatsApp
      </Button>

      {/* Get Info via SMS/Email */}
      <Button
        startIcon={<EmailIcon />}
        variant="text"
        fullWidth
        sx={{ justifyContent: "flex-start", mb: 1 }}
        onClick={() => setShowEmail(true)}
      >
        {showEmail ? '📧 velaanshpno1@gmail.com' : 'Get info via SMS/Email'}
      </Button>

      <Divider sx={{ my: 2 }} />

      {/* Address */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Address
      </Typography>
      <Typography variant="body2" gutterBottom>
        F.NO.106, VELAANS HP NO.1, SIPCOT NEAR, MOOKANDAPALLY, Sipcot-635126 (SIPCOT NEAR)
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LocationOnIcon />}
          href="https://www.google.com/maps?q=F.NO.106,+VELAANS+HP+NO.1,+SIPCOT+NEAR,+MOOKANDAPALLY,+Sipcot-635126"
          target="_blank"
        >
          Get Directions
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyAddress}
        >
          Copy Address
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Timings */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Business Hours
      </Typography>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <AccessTimeIcon sx={{ mr: 1 }} fontSize="small" />
        Monday – Saturday: <strong style={{ marginLeft: 4 }}>9:00 AM – 10:00 PM</strong>
      </Typography>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'red', mb: 1 }}>
        <AccessTimeIcon sx={{ mr: 1 }} fontSize="small" />
        Sunday: Closed
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Actual hours may differ during holidays
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* GST */}
      <Typography variant="body2" fontWeight="bold">
        GSTIN: 33ABCPL4146K1ZR
      </Typography>

      {/* Snackbar */}
      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)}>
        <Alert onClose={() => setCopied(false)} severity="success" sx={{ width: '100%' }}>
          Address copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
