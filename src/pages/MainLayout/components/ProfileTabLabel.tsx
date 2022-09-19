import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from 'store';
import { MenuButtonTitle } from '../MainLayout.styled';
import UserIcon from '@mui/icons-material/Person';

export const ProfileTabLabel = observer(() => {
  const {
    UserStore: { userData },
  } = useStores();

  return (
    <MenuButtonTitle>
      <UserIcon />
      <span>{userData?.first_name + ' ' + userData?.last_name}</span>
    </MenuButtonTitle>
  );
});
