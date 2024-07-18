// Content.tsx
import React from 'react';

interface ContentProps {
  user: string | null;
}

const Content: React.FC<ContentProps> = ({ user }) => {
  return (
    <div>
      {user ? <p>Hello, {user}!</p> : <p>Please log in.</p>}            //未実装リストを表示する。
    </div>
  );
};

export default Content;
