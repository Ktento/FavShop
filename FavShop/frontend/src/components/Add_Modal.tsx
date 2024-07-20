import React, { useState } from 'react';
import '../CSS/Add_Modal.css';
import { SearchResult, searchPlaceByName } from '../backend/find_Shop';
import {InsertShop} from '../backend/entry_shop';

interface AddModalProps {
  onClose: () => void;
  closeDrawer: () => void;
  user?: Number | null; 
  setUser?: (user_id: Number | null) => void; 
}


const Add_Modal: React.FC<AddModalProps> = ({ onClose, closeDrawer },{ user, setUser }) => {
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
  const handleConfirmSelection = () => {
    if(selectedResult){
      InsertShop(user, selectedResult.place_id);
      onClose();
      closeDrawer();
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
