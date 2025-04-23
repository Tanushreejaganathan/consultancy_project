import React from 'react'
import { Button } from "@mui/material";

export const Logout = () => {
    const button={marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'}
    
  return (
     <Button variant="contained" style={button} color="error">Logout</Button>
  )
}
