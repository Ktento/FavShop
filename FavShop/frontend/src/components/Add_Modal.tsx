import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import "../CSS/Add_Modal.css";
import { SearchResult, searchPlaceByName } from "../backend/find_Shop";
import { InsertShop } from "../backend/entry_shop";
import { CardData } from "../App";
import { SearchDetailShops } from "../backend/detail_shop";
interface AddModalProps {
  user: string | null;
  user_id: number | null;
  setUser: (user: string | null) => void;
  setUserID: (user_id: number | null) => void;
  onClose: () => void;
  closeDrawer: () => void;
  carddata: CardData[] | null;
  //CardData配列をすべて初期化するか、配列の一つを更新するか選べる
  setCardData: React.Dispatch<React.SetStateAction<CardData[]>>;
  addCardData: (newCard: CardData) => void;
}

const Add_Modal: React.FC<AddModalProps> = ({
  user_id,
  carddata,
  onClose,
  closeDrawer,
  setCardData,
  addCardData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // 店舗検索関数
  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") return;
      setLoading(true); // 検索開始時にローディング状態を設定

      const results = await searchPlaceByName(searchTerm);
      setSearchResults(results);

      setLoading(false); // 検索終了後にローディング状態を解除
    } catch (error) {
      console.log(error);
      alert("既に登録済みです");
      setLoading(false); // エラーが発生した場合もローディング状態を解除
    }
  };

  // 選択された検索結果を処理する関数
  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
  };

  // 決定ボタンを押された場合の処理
  const handleConfirmSelection = async () => {
    if (selectedResult && user_id != null) {
      const place_ids: string[] = [];
      place_ids.push(selectedResult.place_id);
      const success = await InsertShop(user_id, selectedResult.place_id);
      if (success) {
        onClose();
        closeDrawer();
        if (selectedResult.place_id) {
          const card = await SearchDetailShops(user_id, place_ids);
          if (card && card.length == 1) {
            addCardData(card[0]);
          } else {
            alert("詳細情報が取得できませんでした");
          }
        } else {
          alert("placeidが取得できませんでした");
        }
        console.log("Bad Insert");
      }
    } else {
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
        <button
          className="search-button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{ color: "white", borderWidth: 4 }}
            />
          ) : (
            "検索"
          )}
        </button>
        <button className="confirm-button" onClick={handleConfirmSelection}>
          決定
        </button>
      </div>
      <ul className="result-list">
        {searchResults.map((result, index) => (
          <li
            key={index}
            className={`result-item ${selectedResult === result ? "selected" : ""}`}
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
