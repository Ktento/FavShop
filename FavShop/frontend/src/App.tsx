// App.tsx
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';

const App: React.FC = () => {
  const [user, setUser] = useState<Number | null>(null);          //**ユーザ情報を保持 */

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <div className="main">
        <Content user={user} />
      </div>
    </div>
  );
}

export default App;
