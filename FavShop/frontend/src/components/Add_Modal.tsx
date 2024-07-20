import React, { useState } from 'react';
import '../CSS/Add_Modal.css';
import { SearchResult, searchPlaceByName } from '../backend/find_Shop';
interface AddModalProps {
  onClose: () => void;
  closeDrawer: () => void;
}



const Add_Modal: React.FC<AddModalProps> = ({ onClose, closeDrawer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);



  console.log("AAAAAAAAAAAAa");

  // ダミーの検索関数（実際のAPI呼び出し等をここに実装）
  const handleSearch = async() => {
    try{
    console.log(searchTerm);
    if (searchTerm.trim() === '') return;
    if(searchTerm!=undefined){
    const results = await searchPlaceByName(searchTerm);
    setSearchResults(results);
    }

    }catch(error){
    }
  };


  
  // 選択された検索結果を処理する関数
  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
  };

  // 決定ボタンを押された場合の処理
  const handleConfirmSelection = () => {
    if (selectedResult) {
      onClose();
      closeDrawer();
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
