import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import ContentModal from './Content_Modal'; // モーダルコンポーネントのインポート

interface CardData {
  id: number;
  image: string;
  title: string;
  address: string;
  hours: string;
}

interface ContentProps {
  user: string | null;
}

// スタイルを定義
const CustomCardWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start', // カードを左詰めに
  alignItems: 'center',
  flexWrap: 'wrap', // 複数カードの表示を整えるために追加
  gap: '16px', // カード間のスペースを設定
  height: 'auto', // 必要に応じて高さを調整
  padding: '16px', // 必要に応じてパディングを追加
});

const CustomCardRoot = styled(Card)({
  width: 300,
});

const CustomCardMedia = styled(CardMedia)({
  height: 140,
});

// ダミーデータ
const cardData: CardData[] = [
  {
    id: 1,
    image: 'イメージパス1',
    title: '店名1',
    address: '住所1',
    hours: '営業時間1',
  },
  {
    id: 2,
    image: 'イメージパス2',
    title: '店名2',
    address: '住所2',
    hours: '営業時間2',
  },
  {
    id: 3,
    image: 'イメージパス3',
    title: '店名3',
    address: '住所3',
    hours: '営業時間3',
  },
  {
    id: 4,
    image: 'イメージパス4',
    title: '店名4',
    address: '住所4',
    hours: '営業時間4',
  },
  {
    id: 5,
    image: 'イメージパス5',
    title: '店名5',
    address: '住所5',
    hours: '営業時間5',
  },
];

// コンポーネントの定義
const Content: React.FC<ContentProps> = ({ user }) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
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
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.hours}
                </Typography>
              </CardContent>
            </CardActionArea>
          </CustomCardRoot>
        ))}
      </CustomCardWrapper>
      {selectedCard && (
        <ContentModal
          open={!!selectedCard}
          handleClose={handleCloseModal}
          data={selectedCard}
        />
      )}
    </>
  );
};

export default Content;
