import React, { useState } from 'react';
import { Modal, Box, Typography, Grid, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface ModalData {
  image: string; // メイン画像URL
  title: string;
  address: string;
  hours: string;
  images: string[]; // サムネイル画像URLの配列
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

// サムネイルのスタイル設定
const ThumbnailSpace = styled('div')({
  display: 'flex',
  gap: '8px',
  overflowX: 'scroll',
  marginTop: 16,
});

// サムネイルの個別スタイル設定
const Thumbnail = styled('div')({
  position: 'relative',
  width: 100,
  height: 100,
  backgroundColor: '#ccc',
  overflow: 'hidden',
  borderRadius: 4,
});

const ThumbnailImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: 1,
});

// ContentModalコンポーネントの定義
const ContentModal: React.FC<ContentModalProps> = ({ open, handleClose, data }) => {
  const [mainImage, setMainImage] = useState<string | null>(data?.image || null);
  const [thumbnails, setThumbnails] = useState<string[]>(data?.images || []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setThumbnails([...thumbnails, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddThumbnail = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => handleFileChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  const handleDeleteThumbnail = (index: number) => {
    setThumbnails(thumbnails.filter((_, i) => i !== index));
  };

  const handleSwapImage = (index: number) => {
    const newMainImage = thumbnails[index];
    const updatedThumbnails = [...thumbnails];
    updatedThumbnails[index] = mainImage || '';
    setMainImage(newMainImage);
    setThumbnails(updatedThumbnails);
  };

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
            <ImageSpace>
              {mainImage && <img src={mainImage} alt={data.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />}
            </ImageSpace>
          </Grid>
        </Grid>
        <ThumbnailSpace>
          {thumbnails.map((thumbnail, index) => (
            <Thumbnail key={index}>
              <ThumbnailImage
                src={thumbnail}
                alt={`Thumbnail ${index}`}
                onClick={() => handleSwapImage(index)}
              />
              <DeleteButton onClick={() => handleDeleteThumbnail(index)}>
                <CloseIcon />
              </DeleteButton>
            </Thumbnail>
          ))}
          <Button onClick={handleAddThumbnail} style={{ marginTop: 16 }}>
            サムネイルを追加
          </Button>
        </ThumbnailSpace>
      </Box>
    </Modal>
  );
};

export default ContentModal;
