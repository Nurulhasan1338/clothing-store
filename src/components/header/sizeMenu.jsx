import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Sling as Hamburger } from 'hamburger-react'


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='text-light'
      >
      <SlOptionsVertical/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        variant='outline'
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link to="/TopWear">Top wear</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/Bottomwear">Bttom wear</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/Footwear">Footwear</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/About us">About us</Link></MenuItem>
      
      </Menu>
    </div>
  );
}