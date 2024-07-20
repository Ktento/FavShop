import React, { useState } from 'react';
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
  setUser: (user: Number | null) => void;
  closeDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setUser, closeDrawer }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const openSignInModal = () => {
    closeDrawer(); // サイドバーを閉じる
    setSignInModalOpen(true); // サインインモーダルを開く
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    closeDrawer(); // サイドバーを閉じる
    setSignUpModalOpen(true); // サインアップモーダルを開く
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const openAddModal = () => {
    closeDrawer(); // サイドバーを閉じる
    setAddModalOpen(true); // アドモーダルを開く
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openPositionModal = () => {
    closeDrawer(); // サイドバーを閉じる
    setPositionModalOpen(true); // ポジションモーダルを開く
  };

  const closePositionModal = () => {
    setPositionModalOpen(false);
  };

  const openInfoModal = () => {
    closeDrawer(); // サイドバーを閉じる
    setInfoModalOpen(true); // インフォモーダルを開く
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  return (
    <div className="sidebar">
      <button className="sidebar-button text-button" onClick={openInfoModal}>FavShopとは</button>
      <button className="sidebar-button text-button" onClick={openSignInModal}>Sign In</button>
      <button className="sidebar-button" onClick={openAddModal}>
        <img src={button_add_Image} alt="add" className="button-image" />
      </button>
      <button className="sidebar-button" onClick={openPositionModal}>
        <img src={button_position_Image} alt="position" className="button-image" />
      </button>
      <Footer />

      {/* モーダルをSidebarの外に配置 */}
      <Modal isOpen={signInModalOpen} onClose={closeSignInModal}>
        <SignInModal openSignUpModal={openSignUpModal} onClose={closeSignInModal} setUser={setUser} closeDrawer={closeDrawer}/>
      </Modal>
      <Modal2 isOpen={signUpModalOpen} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} />
      </Modal2>
      <Modal isOpen={addModalOpen} onClose={closeAddModal}>
        <AddModal onClose={closeAddModal} closeDrawer={closeDrawer}/>
      </Modal>
      <Modal isOpen={positionModalOpen} onClose={closePositionModal}>
        <PositionModal onClose={closePositionModal} closeDrawer={closeDrawer} />
      </Modal>
      <InfoModal open={infoModalOpen} onClose={closeInfoModal} />
    </div>
  );
};

export default Sidebar;
