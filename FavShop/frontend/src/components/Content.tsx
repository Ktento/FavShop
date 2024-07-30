import React, { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import ContentModal from './Content_Modal';
import '../CSS/Content.css';
import { CardData } from '../App';

interface ContentProps {
  user_id: number | null;
  location: { latitude: number | null; longitude: number | null } | null;
  carddata: CardData[] | null;
  setCardData: React.Dispatch<React.SetStateAction<CardData[]>>;
  addCardData: (newCard: CardData) => void;
  deleteCardData: (id: string) => void;
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

const convertTo24HourFormat = (time: string, period: string): string => {
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const formatHours = (hours: string): string => {
  // 曜日を取り除く
  const timeRange = hours.replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday):?\s*/, '');

  // 営業時間を分割
  const [openTimeStr, closeTimeStr] = timeRange.split('–').map(str => str.trim());
  const [openHHMM, openAMPM] = openTimeStr.split(' ');
  const [closeHHMM, closeAMPM] = closeTimeStr.split(' ');

  // 24時間形式に変換
  const start24Hour = convertTo24HourFormat(openHHMM, openAMPM);
  const end24Hour = convertTo24HourFormat(closeHHMM, closeAMPM);

  return `${start24Hour}-${end24Hour}`;
};
const getStatusClass = (hours: string): string => {
  if(hours.length<=0){
    return '?'
  }
  if(hours.includes("Open 24 hours")){
    /*
    const every_openHour=0
    const every_openMinute=0
    const every_closeHour=24
    const every_closeMinute=0*/
    return 'open'
  }
  if(hours.includes("Closed")){
    return 'closed'
  }
  const currentTime = new Date();
  const formattedHours = formatHours(hours);
  
  // 分割して時間を取得
  const [openTimeStr, closeTimeStr] = formattedHours.split('-');
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

const Content: React.FC<ContentProps> = ({ user_id, location,carddata,deleteCardData}) => {
  console.log("Content OPEN")
  useEffect(() => { 
    console.log(user_id);
    

  }, [carddata]);
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
        {carddata && carddata.map(card => (
          <CustomCardRoot key={card.plaseid} onClick={() => handleCardClick(card)}>
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
                  {card.hours.replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday):?\s*/, '')}
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
          deleteCardData={deleteCardData}
          user_id={user_id}
          location={location}
        />
      )}
    </>
  );
};

export default Content;
