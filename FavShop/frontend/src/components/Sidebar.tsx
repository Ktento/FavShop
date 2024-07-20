import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from './Footer';
import Modal from './Modal';
import Modal2 from './Modal2';
import SignInModal from './SignIn_Modal';
import SignUpModal from './SignUp_Modal';
import PositionModal from './Position_Modal';
import AddModal from './Add_Modal';
import InfoModal from './Info_Modal';
import '../CSS/Sidebar.css';
import button_position_Image from '../assets/images/Map pin.png';
import button_add_Image from '../assets/images/Plus.png';

interface SidebarProps {
  user: string | null; 
  user_id: Number | null;
  setUser: (user: string | null) => void;
  setUserID: (user_id: Number | null) => void;
  closeDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, user_id, setUser, setUserID, closeDrawer }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

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

  return (
    <div className="sidebar">
      <IconButton
        aria-label="close"
        onClick={closeDrawer}
        className="close-sidebar-button"
      >
        <CloseIcon />
      </IconButton>
      <div className="sidebar-content">
        <button className="sidebar-button text-button" onClick={openInfoModal}>FavShopとは</button>
        <button className="sidebar-button text-button" onClick={openSignInModal}>Sign In</button>
        <button className="sidebar-button" onClick={openAddModal}>
          <img src={button_add_Image} alt="add" className="button-image" />
        </button>
        <button className="sidebar-button" onClick={openPositionModal}>
          <img src={button_position_Image} alt="position" className="button-image" />
        </button>
      </div>
      <Footer />

      <Modal isOpen={signInModalOpen} onClose={closeSignInModal}>
        <SignInModal openSignUpModal={openSignUpModal} onClose={closeSignInModal} setUser={setUser} setUserID={setUserID} closeDrawer={closeDrawer} />
      </Modal>
      <Modal2 isOpen={signUpModalOpen} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} />
      </Modal2>
      <Modal isOpen={addModalOpen} onClose={closeAddModal}>
        <AddModal onClose={closeAddModal} closeDrawer={closeDrawer} user={user} user_id={user_id} setUser={setUser} setUserID={setUserID} />
      </Modal>
      <Modal isOpen={positionModalOpen} onClose={closePositionModal}>
        <PositionModal onClose={closePositionModal} closeDrawer={closeDrawer} />
      </Modal>
      <InfoModal open={infoModalOpen} onClose={closeInfoModal} />
    </div>
  );
};

export default Sidebar;
