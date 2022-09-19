import React, { ComponentPropsWithoutRef } from 'react';
import styled from '@emotion/styled';
import { Link as RouteLink } from 'react-router-dom';
import { Container, screenSize } from '@pages/MainLayout/MainLayout.styled';
import { Avatar, Button } from '@mui/material';
import { PropsOf } from '@emotion/react';

export const ProfileContainer = styled(Container)`
  display: grid;
  justify-content: center;
  grid-template: 4fr 152px/ 1fr 1fr;
  gap: 10px;
  @media (max-width: ${screenSize.mobileM}) {
    display: flex;
    flex-direction: column;
  }
`;

export const SectionOne = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  background: #ffffff;
  /* 01 dp */

  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  grid-column: span 2;
  padding: 24px;
`;
export const SectionTwo = styled.div`
  background: #ffffff;
  /* 01 dp */

  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  box-sizing: border-box;
  padding: 24px;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
`;

export const CustomAvatar = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 80px;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const EmptyAvatar = styled(({ ...rest }: PropsOf<typeof CustomAvatar>) => <CustomAvatar {...rest} />)`
  &::after {
    content: 'Добавить фото';
    color: white;
    display: block;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    /* or 100% */

    text-align: center;
    letter-spacing: 0.18px;
    padding: 30px;
  }
`;

export const AvatarStyled = styled(({ src, size, ...rest }: PropsOf<typeof CustomAvatar> & PropsOf<typeof Avatar>) => (
  <CustomAvatar {...rest} size={size}>
    <Avatar sx={{ width: '100%', height: '100%' }} src={src} alt="avatar" />
  </CustomAvatar>
))`
  &:hover {
    &::after {
      width: ${({ size }) => size};
      height: ${({ size }) => size};
      border-radius: inherit;

      content: 'Изменить фото';
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      position: absolute;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      text-align: center;
      letter-spacing: 0.18px;
      padding: 30px;
      box-sizing: border-box;
    }
  }
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(315deg, #ce2a79, #5d5bc9);
  color: white;
  width: 307px;
  height: 72px;
  text-transform: none;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.18px;
  margin-top: 48px;
`;

export const ProfileButton = styled(StyledButton)`
  align-self: center;
  justify-self: center;
  grid-column: span 2;
`;
