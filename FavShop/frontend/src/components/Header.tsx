import React, { useState } from "react";
import { Drawer, IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import logo from "../assets/images/Favshop_logo_white.png";
import "../CSS/Header.css";
import { CardData } from "../App";
interface HeaderProps {
  user: string | null;
  user_id: number | null;
  location: { latitude: number | null; longitude: number | null } | null;
  loginFlag: boolean;
  setUser: (user: string | null) => void;
  setUserID: (user_id: number | null) => void;
  carddata: CardData[] | null;
  //CardData配列をすべて初期化するか、配列の一つを更新するか選べる
  setCardData: React.Dispatch<React.SetStateAction<CardData[]>>;
  addCardData: (newCard: CardData) => void;
  fetchNearbyShops: () => void;
  setloginFlag: (loginFlag: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  user_id,
  carddata,
  location,
  loginFlag,
  setUser,
  setUserID,
  setCardData,
  addCardData,
  fetchNearbyShops,
  setloginFlag,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" className="header-logo" />
          <Typography variant="h6" component="div" className="title">
            {user
              ? `ログイン中:${user}`
              : location
                ? "近くの店舗を表示中"
                : "未ログイン"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 250 } }, // スマホでは100%、デスクトップでは250pxの幅
        }}
      >
        <Sidebar
          user={user}
          user_id={user_id}
          location={location}
          loginFlag={loginFlag}
          setUser={setUser}
          setUserID={setUserID}
          carddata={carddata}
          setCardData={setCardData}
          addCardData={addCardData}
          closeDrawer={closeDrawer}
          fetchNearbyShops={fetchNearbyShops}
          setloginFlag={setloginFlag}
        />
      </Drawer>
    </>
  );
};

export default Header;
