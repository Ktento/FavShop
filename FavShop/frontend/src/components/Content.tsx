import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import ContentModal from './Content_Modal';
import '../CSS/Content.css';
import { CardData } from '../backend/detail_shop';

interface ContentProps {
  user_id: Number | null;
  location: { latitude: number; longitude: number } | null;
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

// ダミーデータ
const cardData: CardData[] = [
  {
    id: 1,
    plaseid: 11111,
    image: 'https://via.placeholder.com/300x140?text=Image+1',
    title: '店名1',
    address: '住所1',
    hours: '09:00-17:00', // 営業中
  },
  {
    id: 2,
    plaseid: 11111,
    image: 'https://via.placeholder.com/300x140?text=Image+2',
    title: '店名2',
    address: '住所2',
    hours: '09:00-12:00', // 営業終了間近
  },
  {
    id: 3,
    plaseid: 11111,
    image: 'https://via.placeholder.com/300x140?text=Image+3',
    title: '店名3',
    address: '住所3',
    hours: '13:00-15:00', // 営業終了
  },
  {
    id: 4,
    plaseid: 11111,
    image: 'https://via.placeholder.com/300x140?text=Image+4',
    title: '店名4',
    address: '住所4',
    hours: '10:00-18:00', // 営業中
  },
  {
    id: 5,
    plaseid: 11111,
    image: 'https://via.placeholder.com/300x140?text=Image+5',
    title: '店名5',
    address: '住所5',
    hours: '00:00-23:59', // 常時営業
  },
];

const Content: React.FC<ContentProps> = ({ user_id, location }) => {
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
        {cardData.map(card => (
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
