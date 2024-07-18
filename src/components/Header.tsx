// Header.tsx
import React, { useState } from 'react';
import { Drawer, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import logo from '../assets/images/FavShop_logo.png';
import '../CSS/Header.css';

interface HeaderProps {
  user: string | null; 
  setUser: (user: string | null) => void; 
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);          //サイドバーの状態を保持

  //サイドバーの設定
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" className="FavShop_logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Sidebar setUser={setUser} closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
};

export default Header;
