import React from 'react';
import { Tab } from '@mui/material';
import MusicIcon from 'common/MusicIcon';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { PlayerTextStyled, PlayerLabelStyled } from './Player.styled';

export const PlayerTab = observer(() => {
  const {
    AudioPlayer: { playing, toggle },
  } = useStores();
  return (
    <Tab
      label={
        <PlayerLabelStyled>
          <PlayerTextStyled>{playing ? 'Пауза' : 'Гимн'}</PlayerTextStyled>
          <MusicIcon />
        </PlayerLabelStyled>
      }
      onClick={toggle}
      sx={{ opacity: 1 }}
    />
  );
});

export default PlayerTab;
