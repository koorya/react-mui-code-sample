import { Button, IconButton, Link } from '@mui/material';
import React from 'react';
import ExitIcon from '@mui/icons-material/ExitToApp';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { useNavigate } from 'react-router-dom';
import { Path } from 'routes/path';
import { MenuButtonTitle } from '@pages/MainLayout/MainLayout.styled';

export const LogOut = observer(() => {
  const navigate = useNavigate();
  const { ApiStore } = useStores();
  return (
    <Button
      sx={{ textTransform: 'none' }}
      onClick={() => {
        ApiStore.logOut();
        navigate(Path.default);
      }}
    >
      <MenuButtonTitle>
        <ExitIcon />
        <div>Выйти</div>
      </MenuButtonTitle>
    </Button>
  );
});
