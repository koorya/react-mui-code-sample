import { Avatar, Button, Dialog, DialogContent, Slider } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useStores } from 'store';
import { AvatarStyled, EmptyAvatar } from '../ProfilePage.styled';

export const AvatarManager = observer(() => {
  const {
    UserStore: { updateAvatar, avatar, isAvatarEmpty },
    UserStore,
  } = useStores();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInput = useRef(null);
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  const chooseImage = () => {
    fileInput.current.click();
  };

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files[0];
    setPictureFile(file);
    event.currentTarget.value = null;
    setIsDialogOpen(true);
    setScale(0);
  };
  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (pictureFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel && typeof result === 'string') {
          updateAvatar(result);
          // console.log(result);
        }
      };
      fileReader.readAsDataURL(pictureFile);
    }
    return () => {
      isCancel = true;
      if (fileReader?.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [pictureFile]);

  const [scale, setScale] = useState(0);
  const handleChangeScale = (event: Event, newValue: number) => {
    setScale(newValue);
  };

  const editorRef = useRef<AvatarEditor>(null);

  const saveImage = () => {
    const image = editorRef.current.getImageScaledToCanvas().toDataURL();
    updateAvatar(image);
    dialogCloseHandler();
  };

  const dialogCloseHandler = () => {
    setIsDialogOpen(false);
  };

  const removeButtonHandler = () => {
    updateAvatar('');

    dialogCloseHandler();
  };

  const openDialogHandler = () => {
    setIsDialogOpen(true);
    setScale(0);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="file"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={fileSelected}
      />
      {!UserStore.isAvatarEmpty && <EmptyAvatar size="160px" onClick={chooseImage}></EmptyAvatar>}

      {UserStore.isAvatarEmpty && <AvatarStyled size="160px" src={avatar} onClick={openDialogHandler} />}
      <Dialog open={isDialogOpen} onClose={dialogCloseHandler}>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AvatarEditor
            ref={editorRef}
            scale={scale / 10 + 1}
            borderRadius={100}
            color={[0xf0, 0xf0, 0xf0, 1]}
            style={{ borderRadius: '4px' }}
            image={avatar}
          />
          <Button variant="text" sx={{ textTransform: 'none' }} onClick={removeButtonHandler}>
            Удалить фото
          </Button>
          <div style={{ display: 'flex', alignSelf: 'stretch', alignItems: 'center', gap: '5px' }}>
            -
            <Slider
              aria-label="Размер"
              value={scale}
              onChange={handleChangeScale}
              sx={{
                'padding': '20px 0px',
                '& .MuiSlider-thumb': {
                  color: '#3E3636',
                  borderRadius: '0',
                  width: '12px',
                  top: '18px',
                  // insetBlockStart: '10px',

                  // insetBlockEnd: '14px',
                },
                '& .MuiSlider-thumb:hover, .MuiSlider-thumb.Mui-active': { boxShadow: '0px 0px 0px 0px' },

                '& .MuiSlider-thumb::after': {
                  content: '""',
                  width: '10px',
                  height: '10px',
                  borderRadius: '0',
                  background: '#3E3636',
                  position: 'relative',
                  transform: ' scale(0.85, 1) rotate(45deg)',
                  left: '0px',
                },
                '& .MuiSlider-rail, .MuiSlider-track': { height: '3px', color: '#C4C4C4' },
                '& .MuiSlider-track': { display: 'none' },
              }}
            />
            +
          </div>
          <div
            style={{
              display: 'flex',
              alignSelf: 'stretch',
              gap: '5px',
            }}
          >
            <Button fullWidth variant="outlined" sx={{ textTransform: 'none' }} onClick={dialogCloseHandler}>
              Отменить
            </Button>
            <Button fullWidth variant="contained" sx={{ textTransform: 'none' }} onClick={saveImage}>
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});
