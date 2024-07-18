// Content.tsx
import React from 'react';

interface ContentProps {
  user: string | null;
}

const Content: React.FC<ContentProps> = ({ user }) => {
  return (
    <div>
      {user ? <p>Hello, {user}!</p> : <p>Please log in.</p>}
    </div>
  );
};

export default Content;
