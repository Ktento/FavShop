import React, { useState } from 'react';
import '../CSS/Add_Modal.css';
import { SearchResult, searchPlaceByName } from '../backend/find_Shop';
import {InsertShop} from '../backend/entry_shop';
import { CardData } from '../App';
interface AddModalProps {
  user: string | null; 
  user_id: Number | null;
  setUser: (user: string | null) => void;
  setUserID: (user_id: Number | null) => void;
  onClose: () => void;
  closeDrawer: () => void;
  carddata : CardData[]|null;
  //CardData配列をすべて初期化するか、配列の一つを更新するか選べる
  setCardData:React.Dispatch<React.SetStateAction<CardData[]>>;
}




const Add_Modal: React.FC<AddModalProps> = ({ user_id,carddata,onClose, closeDrawer,setCardData}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /*カードデータ配列を追加する関数*/
  const addCardData = (newCard: CardData) => {
    setCardData((prevCardData) => [...prevCardData, newCard]);
  };

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
    console.log(user_id,selectedResult?.place_id)
    if(selectedResult&&user_id!=null){
      const success = await InsertShop(user_id, selectedResult.place_id);
      if(success){
        onClose();
        closeDrawer();
      }else{
        console.log("Bad Insert");
      }
      /*const response = await fetch("/api/server_supabase",{
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
      }*/
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
