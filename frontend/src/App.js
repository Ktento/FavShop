import logo from './logo.svg';
import './App.css';

import { Link } from "react-router-dom";

function App() {
  const title: string = "Hello World!";

  return (
    <div className="App">
      <h1>{title}</h1>
      <Link to='/test'>
        ボタン
      </Link>
    </div>
  );
}

export default App;


