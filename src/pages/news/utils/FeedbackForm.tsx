import { Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import { StyledButton } from '@pages/profile/ProfilePage.styled';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { Error4XX } from 'store/api/__generated__';
import { PanelTitle } from 'common/PanelTitle';

export const FeedbackForm = observer(() => {
  const {
    ApiStore: { api },
    AlertStore: { setErrorMessage, setProgress, setSuccessMessage },
  } = useStores();
  const sendButtonHandler = async () => {
    if (message === '') return;
    setProgress();
    try {
      const res = await api.supportMessage.supportMessageCreate({ subject: 'Вопрос от подписчика', body: message });
      console.log(res.data.message);
      setSuccessMessage(res.data.message);
      setMessage('');
    } catch (e) {
      const badResponse = e.response.data as Error4XX;
      console.log(badResponse.detail);
      setErrorMessage(badResponse.detail);
    }
  };
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <Stack sx={{ marginTop: '40px' }}>
      <PanelTitle text={'ЗАДАТЬ НАМ ВОПРОС'} />
      <Typography color={'GrayText'}>В течение очень короткого времени мы свяжемся с Вами</Typography>
      <TextField
        sx={{ marginTop: '27px' }}
        id="outlined-multiline-static"
        label={
          <Stack direction={'row'} gap={'10px'} alignItems="center" color={'black'}>
            <MessageIcon />
            <Typography>Ваш вопрос</Typography>
          </Stack>
        }
        multiline
        rows={4}
        value={message}
        variant="filled"
        InputProps={{
          disableUnderline: true,

          sx: {
            boxShadow: 1,
            background: '#F6F7F9',
          },
        }}
        onChange={handleChange}
      />
      <StyledButton onClick={sendButtonHandler}>Задать вопрос</StyledButton>
    </Stack>
  );
});
