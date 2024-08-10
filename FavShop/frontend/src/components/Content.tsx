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
const formatHours = (hours: string): string[] => {
  // 曜日を取り除く
  const jptime = hours.replace(/^(Sunday|日曜日|Monday|月曜日|Tuesday|火曜日|Wednesday|水曜日|Thursday|木曜日|Friday|金曜日|Saturday|土曜日):?\s*/, '');
  const entime=jptime
  .replace(/時/g,':')
  .replace(/分/g,'')
  .replace(/～/g,'-')
  // 営業時間を分割
  let openTimeStr;
  if(entime.includes(',')){
      openTimeStr = entime.split(',')
  }else{
      openTimeStr=[entime];
  }
  return openTimeStr;
};
const getStatusClass = (hours: string): string => {
  console.log("before");
  console.log(hours);
  if(hours.length<=0){
    return '?'
  }
  if(hours.includes("24 時間営業")){
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
  const sales_state:number[]=[-1];
  for (const opentime of formattedHours) {
      // 分割して時間を取得
      const [openTimeStr, closeTimeStr] = opentime.split('-');
      const [openHour, openMinute] = openTimeStr.split(':').map(Number);
      const [closeHour, closeMinute] = closeTimeStr.split(':').map(Number);
   // 本日の営業開始と終了の Date オブジェクトを作成
   const openTime = new Date();
   openTime.setHours(openHour, openMinute, 0, 0);
   const closeTime = new Date();
   closeTime.setHours(closeHour, closeMinute, 0, 0);
   // 営業時間の判定
   if (currentTime < openTime) {
      sales_state.push(0);
   } else if (currentTime > closeTime) {
      sales_state.push(0);
   } else if ((closeTime.getTime() - currentTime.getTime()) < (30 * 60 * 1000)) {
      sales_state.push(1); 
   } else {
      sales_state.push(2);
   }
  }
  let maxNumber: number =sales_state[0];

  for (const num of sales_state) {
      if (num > maxNumber) {
          maxNumber = num;
      }
  }
  if(maxNumber==0)
      return 'closed';
  else if(maxNumber==1)
      return 'closing-soon';
  else if(maxNumber==2)
      return 'open';
  else
      return 'closed'
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
        return null;
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
