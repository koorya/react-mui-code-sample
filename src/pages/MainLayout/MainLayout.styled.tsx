import React from 'react';
import styled from '@emotion/styled';
import { Tabs, MenuItem, TabsProps, ListItemButton, TooltipProps, Tooltip, tooltipClasses } from '@mui/material';
import { Link as RouteLink, LinkProps } from 'react-router-dom';

import Logo from 'assets/logo.svg';
import Respect from 'assets/respect.svg';

export const screenSize = {
  mobileS: '577px',
  mobileM: '768px',
  tablet: '992px',
  desktop: '1200px',
};

export const ContainerTemplate = `


@media (min-width: ${screenSize.mobileS}) 
 {
    width: 540px;
}
// width: 540px;
@media (min-width: ${screenSize.mobileM})
{
  width: 710px;
}
@media (min-width: ${screenSize.tablet})
{
  width: 970px;
}
@media (min-width: ${screenSize.desktop})
{
  width: 1170px;
}


padding-top: 40px;
padding-right: 10px;
padding-left: 10px;
margin-right: auto;
margin-left: auto;


`;
export const Container = styled.div`
  ${ContainerTemplate}
`;

export const HeaderContainer = styled.div`
  ${ContainerTemplate}

  @media (max-width: ${screenSize.tablet}) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const HeaderLogo = styled.img`
  width: 400px;

  @media (max-width: ${screenSize.tablet}) {
    width: 200px;
  }
`;
HeaderLogo.defaultProps = {
  src: Logo,
  alt: 'logo',
};

export const RespectLogo = styled.img`
  width: 400px;

  @media (max-width: ${screenSize.tablet}) {
    display: none;
  }
  &:hover {
    filter: brightness(110%);
  }
`;
RespectLogo.defaultProps = {
  src: Respect,
  alt: 'Признание',
};

export const MainHeader = styled.header`
  box-shadow: 0px 3px 2px 0px rgb(0 0 0 / 3%), 0 1px 0 0 rgb(0 0 0 / 4%), 0 -1px 0 0 rgb(0 0 0 / 4%);
  margin-bottom: 0vh;
  padding: 0px 20px;
  background: white;

  @media (max-width: ${screenSize.tablet}) {
    // display: none;
    position: sticky;
    top: 0;
    z-index: 2;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainHeaderNav = styled.nav`
  display: flex;
  align-items: center;
`;

export const MainFooterContainer = styled.footer`
  ${ContainerTemplate}

  margin-top: auto;
  display: flex;
  flex-direction: column;
`;

export const MaintContainerFooterTopRow = styled.div`
  display: flex;
  align-items: baseline;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 40px 0px;
  justify-content: space-between;
  @media (max-width: ${screenSize.mobileM}) {
    flex-direction: column;
    align-items: center;
  }
`;
export const MaintContainerFooterBottomRow = styled.div`
  display: flex;
  align-items: baseline;
  padding: 30px 0px;
  @media (max-width: ${screenSize.mobileM}) {
    flex-direction: column;
    align-items: center;
  }
`;
export const MainFooterSocial = styled.div`
  margin-left: auto;
  display: flex;
  gap: 7.2px;
`;

export const MainFooterLinks = styled.div`
  margin-left: auto;
  display: flex;
  gap: 15px;
  @media (max-width: ${screenSize.mobileM}) {
    margin-left: unset;
  }
`;

export const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AntTabs = styled(({ isMobile, ...rest }: { isMobile: boolean } & TabsProps) => (
  <Tabs orientation={isMobile ? 'vertical' : 'horizontal'} {...rest} />
))`
  width: 100%;
  & .MuiTabs-indicator {
    background-color: ${(props) => (props.isMobile == false ? ' red' : 'green')};
    height: 3px;
    right: unset !important;
    width: ${(props) => (props.isMobile == false ? 'unset' : '3px')};
  }
  & .MuiTab-root {
    ${(props) => (props.isMobile == true ? 'padding-left: 32px;' : '')}

    font-family: Rubik, Arial, Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8) !important;
    align-items: ${(props) => (props.isMobile == false ? 'unset' : 'flex-start')};
    margin-right: unset;
  }

  & .MuiTab-root:hover,
  .MuiListItem-root:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`;

export const MenuItemStyled = styled(({ hasBorderBotttom, to, ...rest }: { hasBorderBotttom: boolean } & LinkProps) => (
  <MenuItem component={RouteLink} to={to} {...rest} />
))`
  min-width: 300px;
  padding: 20px 50px 20px 20px;
  border-bottom: ${({ hasBorderBotttom }) => (hasBorderBotttom ? 'solid 1px rgba(0, 0, 0, 0.12)' : 'unset')};
  font-family: Rubik, Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

export const ListItemStyled = styled(({ hasBorderBotttom, to, ...rest }: { hasBorderBotttom: boolean } & LinkProps) => (
  <ListItemButton component={RouteLink} to={to} {...rest}>
    {rest.children}
  </ListItemButton>
))`
  min-width: 300px;
  padding: 15px 10px 15px 50px;
  // padding-left: 50px !important;
  border-bottom: ${({ hasBorderBotttom }) => (hasBorderBotttom ? 'solid 1px rgba(0, 0, 0, 0.12)' : 'unset')};
  font-family: Rubik, Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

export const SocialIconsBlock = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

export const MenuButtonTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.18px;

  color: #222222;

  margin: 0px 4px;
  gap: 10px;
  text-transform: none;
`;

export const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});
