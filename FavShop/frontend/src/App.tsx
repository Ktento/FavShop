// App.tsx
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';

const App: React.FC = () => {
  const [user_id, setUser] = useState<Number | null>(null);          //**ユーザ情報を保持 */

  return (
    <div className="App">
      <Header user_id={user_id} setUser={setUser} />
      <div className="main">
        <Content user_id={user_id} />
      </div>
    </div>
  );
}

export default App;
