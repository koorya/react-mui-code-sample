import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { ProfileButton, ProfileContainer, SectionOne, SectionTwo } from './ProfilePage.styled';

import { AvatarManager } from './components/AvatarManager';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const ProfilePage = observer(() => {
  const {
    UserStore: { userData },
    UtilsStore: { userRegalia },
  } = useStores();

  return (
    <ProfileContainer>
      <SectionOne>
        <AvatarManager />
        <div>
          <h3>{userData?.first_name + ' ' + userData?.last_name}</h3>
          <div>ID: {userData?.id}</div>

          <div>г. {userData?.location}</div>
        </div>
      </SectionOne>
      <SectionTwo>
        <div>Звание: {userRegalia.qualification?.toUpperCase() || '---'}</div>

        <div>Ближайшее звание: {userRegalia.nearestQualification?.toUpperCase()}</div>
        <div>Статус в Starlight: {userRegalia.rank}</div>
      </SectionTwo>
      <SectionTwo>
        <div>Текущий ЛО: {userRegalia.lo}</div>

        <div>Партнеры в 1-й линии: {userRegalia.firstLineParthners}</div>
        <div>Новички: {userRegalia.firstLineParthnersNewbies}</div>
      </SectionTwo>
      <ProfileButton href="https://www.starlightgame.ru/">
        Перейти в starlight <ArrowRightAltIcon />
      </ProfileButton>
    </ProfileContainer>
  );
});
