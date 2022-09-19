import React from 'react';
import Logo from 'assets/logo.svg';
import { NavigationTabs } from './NavigationTabs';
import { Box, Divider, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SocialIcons } from './components/SocialIcons';
import { Link as RouteLink } from 'react-router-dom';
import { Path } from 'routes/path';

export const AsideMobile = (props: {
  asideOpen: boolean;
  setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  matchedLocation: string;
  isAuth: boolean;
}) => {
  const { asideOpen, setAsideOpen, matchedLocation, isAuth } = props;
  return (
    <Drawer anchor="left" open={asideOpen} onClose={() => setAsideOpen(false)}>
      <Box sx={{ width: 320 }} role="presentation">
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ padding: '20px 50px 20px 20px' }}>
            <RouteLink to={Path.default} onClick={() => setAsideOpen(false)}>
              <img src={Logo} width="200" />
            </RouteLink>
            <SocialIcons />
          </div>
          <IconButton style={{ margin: '5px 5px 5px auto ' }} onClick={() => setAsideOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <Divider sx={{ marginBottom: '20px' }} />
        {asideOpen && <NavigationTabs {...{ matchedLocation, isAuth }} isMobile={true} />}
      </Box>
    </Drawer>
  );
};
