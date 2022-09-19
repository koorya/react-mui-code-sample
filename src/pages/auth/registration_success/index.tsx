import React from 'react';

import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

import { observer } from 'mobx-react-lite';

import { AuthFormStack } from '../Auth.styled';
import { Link as RouterLink } from 'react-router-dom';

export const RegistrationSuccessPage = observer(() => {
  return (
    <Dialog open={true} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle style={{ borderBottom: '1px solid #e5e5e5', marginBottom: '20px' }}>Регистрация</DialogTitle>
      <DialogContent>
        <AuthFormStack>
          <Typography>Вы успешно зарегистрированы.</Typography>
          <Button component={RouterLink} to="/" fullWidth variant="contained">
            Вернуться на сайт
          </Button>
        </AuthFormStack>
      </DialogContent>
    </Dialog>
  );
});
