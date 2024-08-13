import React, { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "./Footer";
import Modal from "./Modal";
import Modal2 from "./Modal2";
import SignInModal from "./SignIn_Modal";
import SignUpModal from "./SignUp_Modal";
import PositionModal from "./Position_Modal";
import AddModal from "./Add_Modal";
import InfoModal from "./Info_Modal";
import "../CSS/Sidebar.css";
import button_position_Image from "../assets/images/Map pin.png";
import button_add_Image from "../assets/images/Plus.png";
import { CardData } from "../App";
import { SearchNearShops } from "../backend/find_near_Shops";
interface SidebarProps {
  user: string | null;
  user_id: number | null;
  location: { latitude: number | null; longitude: number | null } | null;
  setUser: (user: string | null) => void;
  setUserID: (user_id: number | null) => void;
  closeDrawer: () => void;
  carddata: CardData[] | null;
  //CardData配列をすべて初期化するか、配列の一つを更新するか選べる
  setCardData: React.Dispatch<React.SetStateAction<CardData[]>>;
  addCardData: (newCard: CardData) => void;
  fetchNearbyShops: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  user_id,
  carddata,
  location,
  setUser,
  setUserID,
  setCardData,
  addCardData,
  closeDrawer,
  fetchNearbyShops,
}) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [logout_loading, logout_setLoading] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openPositionModal = () => {
    setPositionModalOpen(true);
  };

  const closePositionModal = () => {
    setPositionModalOpen(false);
  };

  const openInfoModal = () => {
    setInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  const Logout = async () => {
    if (user_id != null) {
      try {
        console.log("setUser");
        setUser(null);
        console.log("setUserID");
        setUserID(null);
        console.log("logoutsetloding");
        logout_setLoading(false);
        console.log("fetchNearbyShops");
        //carddataがnullでない場合のみ実行
        if (carddata) await fetchNearbyShops();
        alert("ログアウト完了");
      } catch {
        alert("ログアウトできませんでした");
      } finally {
        logout_setLoading(false); // ローディング終了
      }
    } else {
      alert("ログインをしてください");
    }
  };

  return (
    <div className="sidebar">
      <IconButton
        aria-label="close"
        onClick={closeDrawer}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <div className="sidebar-content">
        <button className="sidebar-button text-button" onClick={openInfoModal}>
          FavShopとは
        </button>
        <button
          className="sidebar-button text-button"
          onClick={openSignInModal}
        >
          Sign In
        </button>
        <button className="sidebar-button" onClick={openAddModal}>
          <img src={button_add_Image} alt="add" className="button-image" />
        </button>
        <button className="sidebar-button" onClick={openPositionModal}>
          <img
            src={button_position_Image}
            alt="position"
            className="button-image"
          />
        </button>
        <button
          className="sidebar-button text-button"
          onClick={Logout}
          style={{ color: "red" }}
        >
          {logout_loading ? <CircularProgress size={20} /> : "Log out"}
        </button>
      </div>
      <Footer />

      <Modal isOpen={signInModalOpen} onClose={closeSignInModal}>
        <SignInModal
          openSignUpModal={openSignUpModal}
          onClose={closeSignInModal}
          user={user}
          user_id={user_id}
          setUser={setUser}
          setUserID={setUserID}
          location={location}
          carddata={carddata}
          setCardData={setCardData}
          closeDrawer={closeDrawer}
        />
      </Modal>
      <Modal2 isOpen={signUpModalOpen} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} />
      </Modal2>
      <Modal isOpen={addModalOpen} onClose={closeAddModal}>
        <AddModal
          onClose={closeAddModal}
          closeDrawer={closeDrawer}
          user={user}
          user_id={user_id}
          setUser={setUser}
          setUserID={setUserID}
          carddata={carddata}
          setCardData={setCardData}
          addCardData={addCardData}
        />
      </Modal>
      <Modal isOpen={positionModalOpen} onClose={closePositionModal}>
        <PositionModal onClose={closePositionModal} closeDrawer={closeDrawer} />
      </Modal>
      <InfoModal open={infoModalOpen} onClose={closeInfoModal} />
    </div>
  );
};

export default Sidebar;
