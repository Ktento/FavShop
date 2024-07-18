import React, { useState } from 'react';
import '../CSS/Add_Modal.css';

interface AddModalProps {
  onClose: () => void;
  closeDrawer: () => void;
}

interface SearchResult {
  title: string;
  description: string;
}

const Add_Modal: React.FC<AddModalProps> = ({ onClose, closeDrawer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  // ダミーの検索関数（実際のAPI呼び出し等をここに実装）
  const handleSearch = () => {
    const results: SearchResult[] = [
      { title: 'Item 1', description: 'Description 1' },
      { title: 'Item 2', description: 'Description 2' },
      { title: 'Item 3', description: 'Description 3' },
      { title: 'Item 4', description: 'Description 4' },
      { title: 'Item 5', description: 'Description 5' },
      { title: 'Item 6', description: 'Description 6' },
      { title: 'Item 7', description: 'Description 7' },
    ];
    setSearchResults(results);
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
