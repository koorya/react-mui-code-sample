import { AuthPopup } from '@pages/auth/AuthPopup';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Link as RouteLink } from 'react-router-dom';
import { useStores } from 'store';

import Logo from 'assets/logo.svg';

import Respect from 'assets/respect.svg';

import {
  MainHeader,
  MainContainer,
  MainHeaderNav,
  MainFooterContainer,
  MaintContainerFooterTopRow,
  MaintContainerFooterBottomRow,
  MainFooterLinks,
  HeaderContainer,
  HeaderLogo,
  screenSize,
  RespectLogo,
} from './MainLayout.styled';

import { NavigationTabs } from './NavigationTabs';
import { IconButton, Stack } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { AsideMobile } from './AsideMobile';
import { SocialIcons } from './components/SocialIcons';
import { Path } from 'routes/path';
import { StatusAlertBackdrop } from './components/StatusAlertBackdrop';

import { useMediaQuery } from 'react-responsive';

export const MainLayout = observer(() => {
  const {
    ApiStore: { isAuth },
  } = useStores();

  const isMobile = useMediaQuery({ query: `(max-width: ${screenSize.tablet})` });

  const { pathname } = useLocation();

  const matchedLocation = pathname.match(/(\/[^\/]*)/)[1];

  const [asideOpen, setAsideOpen] = useState(false);
  useEffect(() => {
    setAsideOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <MainContainer>
        <MainHeader>
          <HeaderContainer>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <RouteLink to={Path.default}>
                <HeaderLogo />
              </RouteLink>

              {isAuth && (
                <RouteLink to={Path.respect}>
                  <RespectLogo />
                </RouteLink>
              )}
            </Stack>
            <MainHeaderNav>
              {!isMobile && <NavigationTabs {...{ matchedLocation, isAuth }} isMobile={false} />}
              <div style={{ marginLeft: 'auto' }}>
                <AuthPopup />
                {isMobile && (
                  <IconButton onClick={() => setAsideOpen(true)}>
                    <MenuIcon />
                  </IconButton>
                )}
                <AsideMobile
                  asideOpen={asideOpen}
                  setAsideOpen={setAsideOpen}
                  matchedLocation={matchedLocation}
                  isAuth={isAuth}
                />
              </div>
            </MainHeaderNav>
          </HeaderContainer>
        </MainHeader>
        <main>
          <Outlet />
        </main>
        <MainFooterContainer>
          <MaintContainerFooterTopRow>
            <img src={Logo} width="200px" />
            <SocialIcons />
          </MaintContainerFooterTopRow>
          <MaintContainerFooterBottomRow>
            <div>StatusPlace 2022</div>
            <MainFooterLinks>
              {/* <div>Новости</div>
              <div>Автобонус</div>
              <div>Обучение</div> */}
            </MainFooterLinks>
          </MaintContainerFooterBottomRow>
        </MainFooterContainer>
      </MainContainer>
      <StatusAlertBackdrop />
    </>
  );
});
