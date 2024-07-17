import React from 'react';
import '../CSS/Content.css';

interface ContentProps {
  user: string | null;
}

const Content: React.FC<ContentProps> = ({ user }) => {
  return (
    <div className="content">
      <h1>実装予定</h1>
      {user && <h1>ようこそ, {user}さん</h1>}
    </div>
  );
}

export default Content;
