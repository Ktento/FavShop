import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { CardData } from '../App';
import { DeleteFavShop } from '../backend/delete_favshop';
import Header from './Header';
import Content from './Content';

interface ContentModalProps {
  open: boolean;
  handleClose: () => void;
  data: CardData | null;
  carddata : CardData[]|null;
  setCardData: React.Dispatch<React.SetStateAction<CardData[]>>;
  addCardData: (newCard: CardData) => void;
  deleteCardData: (id: string) => void;
  user: string | null; 
  user_id: number | null;
  setUser: (user: string | null) => void;
  setUserID: (user_id: number | null) => void;
  location :{latitude:number|null, longitude:number|null}|null;
}

// モーダルのスタイル設定
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '600px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

// 地図のスタイル設定
const MapSpace = styled('div')({
  width: '80%',
  height: '20vh',
  backgroundColor: '#eee',
  margin: '0 auto 16px auto',
});

// メイン画像のスタイル設定
const ImageSpace = styled('div')({
  width: '100%',
  height: '30vh',
  backgroundColor: '#ddd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ContentModal: React.FC<ContentModalProps> = ({ user,user_id, setUser,setUserID,open, handleClose, data, location,carddata,setCardData,addCardData,deleteCardData }) => {
  if (!data) return null;

  const handleUnfavorite = async() => {
    // ここで「お気に入り解除」の処理を行うことができます。
    if(user_id){
      const response=await DeleteFavShop(user_id,data.plaseid);
      if(response){
        deleteCardData(data.plaseid);
        alert("お気に入りの店舗の削除しました");
        console.log("Content_Modal CLOSE")
        return (<div className="App">
        <Header user={user} user_id={user_id} location={location} 
        setUser={setUser} setUserID={setUserID} carddata={carddata} setCardData={setCardData}/>
        <div className="main">
        <Content user={user} user_id={user_id} location={location} 
        setUser={setUser} setUserID={setUserID} 
        carddata={carddata} setCardData={setCardData} addCardData={addCardData} deleteCardData={deleteCardData}/>
        </div>
      </div>);
      }else{
        alert("お気に入りの店舗の削除が正常にできませんでした。");
      }
    }else{
      alert("user_idが設定されてません");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <MapSpace>
        <MapSpace>地図</MapSpace>
        </MapSpace>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography id="modal-title" variant="h6" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.address}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.hours}
            </Typography>
            <Typography component="a" href="#" variant="body2" color="primary" style={{ display: 'block', marginTop: 8 }}>
              <a href={`https://www.google.com/maps/dir/?api=1&origin=${location?.latitude},${location?.longitude}&destination=${data.title}&destination_place_id=${data.plaseid}`}>
              店舗までの経路
              </a>
            </Typography>
            <Typography component="a" href="#" variant="body2" color="primary" style={{ display: 'block', marginTop: 8 }}>
            <a href={`${data.webURL}`}>
              店舗詳細を確認
            </a>
            </Typography>
            <Typography component="a" href="" variant="body2" color="primary" style={{ display: 'block', marginTop: 8 }} onClick={handleUnfavorite}>
              お気に入り解除
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ImageSpace>
              {data.image && <img src={data.image} alt={data.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />}
            </ImageSpace>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ContentModal;
