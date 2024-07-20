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

// モーダルのスタイル設定
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

// 地図のスタイル設定
const MapSpace = styled('div')({
  width: '100%',
  height: '30vh',
  backgroundColor: '#eee',
  marginBottom: 16,
});

// メイン画像のスタイル設定
const ImageSpace = styled('div')({
  width: '100%',
  height: '50vh',
  backgroundColor: '#ddd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

// サムネイルのスタイル設定
const ThumbnailSpace = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  overflowX: 'scroll',
  marginTop: 16,
  padding: '0 4px',
});

// サムネイルの個別スタイル設定
const Thumbnail = styled('div')({
  width: 100,
  height: 100,
  backgroundColor: '#ccc',
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
        <MapSpace>地図</MapSpace> {/* 地図を表示するスペース */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <ImageSpace>
              {/* ここにメイン画像が入ります */}
              <img src={data.image} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImageSpace>
          </Grid>
        </Grid>
        <ThumbnailSpace>
          {/* サムネイル画像の例 */}
          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
        </ThumbnailSpace>
      </Box>
    </Modal>
  );
};

export default ContentModal;
