import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Modal from './components/Modal';
import Modal2 from './components/Modal2';
import SignInModal from './components/SignIn_Modal';
import SignUpModal from './components/SignUp_Modal';
import PositionModal from './components/Position_Modal';
import AddModal from './components/Add_Modal';
import InfoModal from './components/Info_Modal';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // サイドバーの開閉状態
  const [user_id, setUser] = useState<Number | null>(null);          //**ユーザ情報を保持 */
  const closeDrawer = () => {
    setSidebarOpen(false); // サイドバーを閉じる
  };

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
    <div className="App">
      <Header user_id={user_id} setUser={setUser} />
      <div className="main">

        {sidebarOpen && (
          <Sidebar setUser={setUser} closeDrawer={closeDrawer} />
        )}
        
        <Content user_id={user_id} />
      </div>

      {/* モーダルをサイドバーの外に移動 */}
      <Modal isOpen={signInModalOpen} onClose={closeSignInModal}>
        <SignInModal openSignUpModal={openSignUpModal} onClose={closeSignInModal} setUser={setUser} closeDrawer={closeDrawer} />
      </Modal>
      <Modal2 isOpen={signUpModalOpen} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} />
      </Modal2>
      <Modal isOpen={addModalOpen} onClose={closeAddModal}>
        <AddModal onClose={closeAddModal} closeDrawer={closeDrawer} />
      </Modal>
      <Modal isOpen={positionModalOpen} onClose={closePositionModal}>
        <PositionModal onClose={closePositionModal} closeDrawer={closeDrawer} />
      </Modal>
      <InfoModal open={infoModalOpen} onClose={closeInfoModal} />
    </div>
  );
}

export default App;
