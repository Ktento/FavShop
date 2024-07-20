import React from 'react';
import Footer from './Footer';
import '../CSS/Sidebar.css';
import button_position_Image from '../assets/images/Map pin.png';
import button_add_Image from '../assets/images/Plus.png';

interface SidebarProps {
  setUser: (user: Number | null) => void;
  closeDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setUser, closeDrawer }) => {
  const openSignInModal = () => {
    closeDrawer(); // サイドバーを閉じる
    // モーダルのオープンを親コンポーネントに委譲
  };

  const openSignUpModal = () => {
    closeDrawer(); // サイドバーを閉じる
    // モーダルのオープンを親コンポーネントに委譲
  };

  const openAddModal = () => {
    closeDrawer(); // サイドバーを閉じる
    // モーダルのオープンを親コンポーネントに委譲
  };

  const openPositionModal = () => {
    closeDrawer(); // サイドバーを閉じる
    // モーダルのオープンを親コンポーネントに委譲
  };

  const openInfoModal = () => {
    closeDrawer(); // サイドバーを閉じる
    // モーダルのオープンを親コンポーネントに委譲
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
    </div>
  );
};

export default Sidebar;
