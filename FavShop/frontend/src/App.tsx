import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Content user={user} />
      </div>
    </div>
  );
}

export default App;
