import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import ContentModal from './Content_Modal';
import '../CSS/Content.css';
import { CardData } from '../App';


interface ContentProps {
  user_id: number | null;
  location : { latitude: number|null; longitude: number|null } | null;
  carddata : CardData[]|null;
  //CardData配列をすべて初期化するか、配列の一つを更新するか選べる
  setCardData:React.Dispatch<React.SetStateAction<CardData[]>>;
}

// スタイルを定義
const CustomCardWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  height: 'auto',
  padding: '16px',
  marginTop: '60px',
});

const CustomCardRoot = styled(Card)({
  width: 300,
  height: 250,
  position: 'relative',
});

const CustomCardMedia = styled(CardMedia)({
  height: 140,
});

const getStatusClass = (hours: string): string => {
  const currentTime = new Date();

  // 営業時間を分割して Date オブジェクトを作成
  const [openTimeStr, closeTimeStr] = hours.split('-');
  const [openHour, openMinute] = openTimeStr.split(':').map(Number);
  const [closeHour, closeMinute] = closeTimeStr.split(':').map(Number);

  // 本日の営業開始と終了の Date オブジェクトを作成
  const openTime = new Date();
  openTime.setHours(openHour, openMinute, 0, 0);

  const closeTime = new Date();
  closeTime.setHours(closeHour, closeMinute, 0, 0);

  // 営業時間の判定
  if (currentTime < openTime) {
    return 'closed'; // 営業開始前
  } else if (currentTime > closeTime) {
    return 'closed'; // 営業終了後
  } else if ((closeTime.getTime() - currentTime.getTime()) < (30 * 60 * 1000)) { // 営業終了30分前
    return 'closing-soon';
  } else {
    return 'open'; // 営業中
  }
};
const Content: React.FC<ContentProps> = ({ user_id,location,carddata }) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return '営業中';
      case 'closing-soon':
        return '営業終了まじか';
      case 'closed':
        return '営業終了';
      default:
        return '不明';
    }
  };

  return (
    <>
      <CustomCardWrapper>
        {carddata&&carddata.map(card => (
          <CustomCardRoot key={card.id} onClick={() => handleCardClick(card)}>
            <CardActionArea>
              <CustomCardMedia
                image={card.image}
                title={card.title}
              />
              <CardContent>
                <Typography className="card-title" gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography className="card-address" variant="body2" color="textSecondary" component="p">
                  {card.address}
                </Typography>
                <Typography className="card-hours" variant="body2" color="textSecondary" component="p">
                  {card.hours}
                </Typography>
              </CardContent>
              <div className="status-wrapper">
                <div className={`status-indicator ${getStatusClass(card.hours)}`} />
                <Typography variant="body2" className="status-text">
                  {getStatusText(getStatusClass(card.hours))}
                </Typography>
              </div>
            </CardActionArea>
          </CustomCardRoot>
        ))}
      </CustomCardWrapper>
      {selectedCard && (
        <ContentModal
          open={!!selectedCard}
          handleClose={handleCloseModal}
          data={selectedCard}
          user_id={user_id}
          location={location}
        />
      )}
    </>
  );
};

export default Content;
