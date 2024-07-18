import React from 'react';
import { styled } from '@mui/material/styles';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // モーダルの幅をレスポンシブに設定
  maxWidth: '600px', // 最大幅を設定
  height: 'auto', // モーダルの高さを自動調整
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto', // 内容が多い場合にスクロールを許可
};

const MapSpace = styled('div')({
  width: '100%',
  height: '20vh', // 地図の高さをレスポンシブに設定
  backgroundColor: '#eee', // ダミー用の背景色
  marginBottom: 16,
});

const ImageSpace = styled('div')({
  width: '100%',
  height: '30vh',
  backgroundColor: '#ddd', // ダミー用の背景色
});

const ThumbnailSpace = styled('div')({
  display: 'flex',
  gap: '8px',
  overflowX: 'scroll',
  marginTop: 16,
});

const Thumbnail = styled('div')({
  width: 100,
  height: 100,
  backgroundColor: '#ccc', // ダミー用の背景色
});

const ContentModal: React.FC<ContentModalProps> = ({ open, handleClose, data }) => {
  if (!data) return null;

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
        <MapSpace>地図</MapSpace>
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
            <Typography component="a" href="#" variant="body2" color="primary" style={{ display: 'block', marginTop: 8 }}>
              お気に入り解除
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ImageSpace>{/* ここにメイン画像が入ります */}</ImageSpace>
          </Grid>
        </Grid>
        <ThumbnailSpace>
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
          {/* ここに追加のサムネイルが入ります */}
        </ThumbnailSpace>
      </Box>
    </Modal>
  );
};

export default ContentModal;
