import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface ModalData {
  image: string;
  title: string;
  address: string;
  hours: string;
}

interface ContentModalProps {
  open: boolean;
  handleClose: () => void;
  data: ModalData | null;
  user_id: Number | null;
  location: { latitude: number; longitude: number } | null;
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

const ContentModal: React.FC<ContentModalProps> = ({ open, handleClose, data, user_id, location }) => {
  if (!data) return null;

  const handleUnfavorite = () => {
    // ここで「お気に入り解除」の処理を行うことができます。
    // 今回はモーダルを閉じる処理を行います。
    handleClose();
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
              店舗までの経路
            </Typography>
            <Typography component="a" href="#" variant="body2" color="primary" style={{ display: 'block', marginTop: 8 }}>
              店舗詳細を確認
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
