import React, { useState } from 'react';
import { Drawer, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import logo from '../assets/images/Favshop_logo_white.png';
import '../CSS/Header.css';

interface HeaderProps {
  user: string | null; 
  user_id: Number | null; 
  setUser: (user: string | null) => void;
  setUserID: (user_id: Number | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, user_id,setUser,setUserID }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <AppBar position="fixed" className="header">
        <Toolbar className="toolbar">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} className="menu-button">
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" className="header-logo" />
          <Typography variant="h6" component="div" className="title">
            {user ? `ログイン中:${user}` : '未ログイン'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Sidebar user={user} user_id={user_id} setUser={setUser} setUserID={setUserID} closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
};

export default Header;
