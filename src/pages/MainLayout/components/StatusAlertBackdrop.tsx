import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from 'store';
import { messageStatus } from 'store/alertStore';

export const StatusAlertBackdrop = observer(() => {
  const {
    AlertStore: { status, message, reset },
  } = useStores();
  return (
    <Backdrop sx={{ zIndex: 10 }} open={status !== messageStatus.init} onClick={reset}>
      {status === messageStatus.progress && <CircularProgress color="inherit" />}
      {status === messageStatus.succsess && (
        <Alert severity="success" color="info">
          {message}
        </Alert>
      )}
      {status === messageStatus.error && (
        <Alert severity="error" color="warning">
          {message}
        </Alert>
      )}
    </Backdrop>
  );
});
