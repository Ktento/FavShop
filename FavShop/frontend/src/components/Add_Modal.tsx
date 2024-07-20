import React, { useState } from 'react';
import '../CSS/Add_Modal.css';
import { SearchResult, searchPlaceByName } from '../backend/find_Shop';

interface AddModalProps {
  onClose: () => void;
  closeDrawer: () => void;
  user_id?: Number | null; 
  setUser?: (user_id: Number | null) => void; 
}


const Add_Modal: React.FC<AddModalProps> = ({ onClose, closeDrawer,user_id, setUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 店舗検索関数
  const handleSearch = async() => {
    try{
    console.log(searchTerm);

    if (searchTerm.trim() === '') return;
    if(searchTerm!=undefined){
    const results = await searchPlaceByName(searchTerm);
    setSearchResults(results);
    }
    }catch(error){
      console.log(error)
    }
  };

  // 選択された検索結果を処理する関数
  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
    console.log(setSelectedResult);
  };

  // 決定ボタンを押された場合の処理
  const handleConfirmSelection = async() => {
    console.log("AAAAAAAAAAAAAAAAA")
    console.log(user_id,selectedResult?.place_id)
    if(selectedResult){
      const response = await fetch("/api/server_supabase",{
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: user_id, place_id: selectedResult.place_id })
      });
      const success = await response.json();
      if(response.ok){
        onClose();
        closeDrawer();
      }else{
        console.log("Bad Insert");
      }
    }else{
      console.log("No result Error");
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title">店舗検索</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder="検索キーワードを入力してください"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        <button className="search-button" onClick={handleSearch}>検索</button>
        <button className="confirm-button" onClick={handleConfirmSelection}>決定</button>
      </div>
      <ul className="result-list">
        {searchResults.map((result, index) => (
          <li
            key={index}
            className={`result-item ${selectedResult === result ? 'selected' : ''}`}
            onClick={() => handleSelectResult(result)}
          >
            <span className="result-title">{result.title}</span>
            <span className="result-description">{result.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Add_Modal;
