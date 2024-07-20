import React, { useState,useEffect } from 'react';
import { Drawer, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import logo from '../assets/images/Favshop_logo_white.png';
import '../CSS/Header.css';
import { find_username } from '../backend/find_username';

interface HeaderProps {
  user: Number | null; 
  setUser: (user: Number | null) => void; 
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // user が null でない場合に find_username を呼び出す
    if (user !== null) {
      find_username(user).then(result => {
        if (result.success) {
          setUserName(result.user_name || null);
        } else {
          setUserName(null);
        }
      });
    }
  }, [user]);

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
        <Sidebar setUser={setUser} closeDrawer={closeDrawer} />
      </Drawer>
    </>
  );
};

export default Header;
