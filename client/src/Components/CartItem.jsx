import React from 'react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, removeFromCart }) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    
    return (
        <TableRow>
            <TableCell>
                <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: 50, height: 50, objectFit: 'cover' }} 
                    onError={(e) => {
                        e.target.src = '/images/default-product.jpg';
                    }}
                />
            </TableCell>
            <TableCell>
                <Typography>{item.name}</Typography>
            </TableCell>
            <TableCell>
                <Typography>₹ {price.toFixed(2)}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{quantity}</Typography>
            </TableCell>
            <TableCell>
                <Typography>₹ {(price * quantity).toFixed(2)}</Typography>
            </TableCell>
            <TableCell>
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CartItem;