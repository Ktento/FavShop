// App.tsx
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);          //**ユーザ情報を保持 */
  const [user_id, setUserID] = useState<Number | null>(null);

  return (
    <div className="App">
      <Header user={user} user_id={user_id} setUser={setUser} setUserID={setUserID} />
      <div className="main">
        <Content user_id={user_id} />
      </div>
    </div>
  );
}

export default App;
