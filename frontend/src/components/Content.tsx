import React from 'react';
import '../CSS/Content.css';

interface ContentProps {
  user: string | null;
}

const Content: React.FC<ContentProps> = ({ user }) => {
  return (
    <div className="content">
      {user && <h1>ようこそ, {user}さん</h1>}
    </div>
  );
}

export default Content;
