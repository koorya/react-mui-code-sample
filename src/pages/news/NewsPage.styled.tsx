import React from 'react';
import styled from '@emotion/styled';
import { Link as RouteLink } from 'react-router-dom';
import { screenSize } from '@pages/MainLayout/MainLayout.styled';
import { categoryColor, CategoryLabel, UnstyledLink } from './NewsListPage.styled';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  0%{
    opacity: 1.0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1.0;
  }
`;

const uploadText = 'Нажмите, чтобы загрузить обложку\\aДвойной клик - выбор файла на компьютере';
export const HeaderBackgroundImage = styled.div<{ imageUrl: string; editable?: boolean }>`
  width: 100%;

  height: 280px;
  @media (min-width: ${screenSize.mobileM}) {
    height: 380px;
  }
  @media (min-width: ${screenSize.tablet}) {
    height: 480px;
  }

  background-size: cover;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  /* justify-content: center; */
  &::after {
    /* height: 10%; */
    width: ${({ imageUrl, editable }) => (!imageUrl ? '100%' : '400px')};
    height: ${({ imageUrl, editable }) => (!imageUrl ? '100%' : '40px')};
    align-self: center;
    margin: ${({ imageUrl, editable }) => (!imageUrl ? '' : '0 auto')};
    border-radius: ${({ imageUrl, editable }) => (!imageUrl ? '0px' : '10px')};
    content: '${({ editable }) => (editable ? uploadText : '')}';
    white-space: pre;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    text-align: center;
    background: ${({ imageUrl, editable }) =>
      !imageUrl ? 'linear-gradient(315deg, #ce2a79, #5d5bc9)' : editable ? '#0000006e' : 'none'};
    color: white;
  }
  &:focus {
    &::after {
      width: 100%;
      height: 100%;
      background: linear-gradient(315deg, #ce2a79, #5d5bc9);
      animation: ${rotate} 2s linear infinite;
      content: 'Вставьте изображение Ctrl+V';
    }
  }
  /* &::after:focus {
  } */
`;

export const Paper = styled.div`
  width: 650px;
  @media (max-width: ${screenSize.mobileS}) {
    width: 95vw;
    margin: 0px auto 0px;
    padding: 0px;
    padding-top: 0px;
  }

  @media (min-width: ${screenSize.mobileS}) {
    width: 490px;
    margin-top: -250px;
    margin-left: -40px;
    margin-right: -40px;
  }
  @media (min-width: ${screenSize.mobileM}) {
    width: 720px;
    margin-left: -40px;
    margin-right: -40px;
  }
  @media (min-width: ${screenSize.tablet}) {
    width: 650px;
  }
  @media (min-width: ${screenSize.desktop}) {
    width: 810px;
  }

  margin: -180px auto 0px;
  border-radius: 8px;
  padding: 40px;
  z-index: 1;
  background: white;
`;

export const NewsContentStyled = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;

  @media (min-width: ${screenSize.mobileS}) {
    margin-top: 70px;
  }

  @media (max-width: ${screenSize.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export enum TitleSizes {
  sm = '2.1428rem',
  md = '21px',
  lg = '2.1428rem',
}

export const NewsTitle = styled.div<{ size: TitleSizes }>`
  color: #222222;
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: ${({ size }) => size};
  margin-bottom: 50px;
`;

export const MoreInBlock = styled.div`
  display: grid;
  gap: 20px;
  grid: 1fr 1fr / 1fr 1fr;

  @media (max-width: ${screenSize.mobileS}) {
    margin-bottom: 50px;
    gap: 20px;
    grid: repeat(4, 320px) / 1fr;
  }

  @media (min-width: ${screenSize.mobileS}) {
    gap: 20px;

    grid: repeat(4, 270px) / 1fr;
  }
  @media (min-width: ${screenSize.mobileM}) {
    gap: 30px;

    grid: repeat(2, 350px) / repeat(2, 345px);
  }
  @media (min-width: ${screenSize.tablet}) {
    gap: 30px;
    grid: repeat(2, 340px) / repeat(2, 310px);
  }
  @media (min-width: ${screenSize.desktop}) {
    gap: 40px;

    grid: repeat(2, 400px) / repeat(2, 400px);
  }
`;

export const YouMayAlsoLikeBlock = styled.div`
  grid: repeat(3, 400px) / 1fr;
  display: grid;
  gap: 40px;
  & > div {
    /* background-color: pink; */
  }
  @media (max-width: ${screenSize.tablet}) {
    gap: 30px;

    grid: repeat(3, 350px) / 1fr;
  }
  @media (max-width: ${screenSize.mobileS}) {
    gap: 30px;

    grid: repeat(3, 350px) / 1fr;
  }
`;

export const AlsoLikeItemContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  height: 200px;
  width: 460px;

  @media (max-width: ${screenSize.mobileS}) {
    padding: 30px 00px;
    height: auto;
    width: 90vw;

    align-self: flex-end;
  }

  @media (min-width: ${screenSize.mobileS}) {
    padding: 20px 30px;
    height: 169px;
    width: 360px;
    align-self: flex-end;
  }
  @media (min-width: ${screenSize.mobileM}) {
    padding: 30px;
    height: 133px;
    width: 460px;
    align-self: unset;
  }
  @media (min-width: ${screenSize.tablet}) {
    padding: 30px;
    height: 133px;
    width: 460px;
    align-self: unset;
  }
  @media (min-width: ${screenSize.desktop}) {
    padding: 30px;
    height: 133px;
    width: 460px;
    align-self: unset;
  }
`;

export const AlsoLikeItem = styled(
  ({
    category,
    name,
    image_path,
    created,
    to,
    ...rest
  }: {
    category: string;
    name: string;
    image_path: string;
    created: string;
    to: string;
  }) => (
    <div style={{ background: 'pink' }}>
      <UnstyledLink to={to} {...rest}>
        <AlsoLikeItemContent>
          <CategoryLabel color={categoryColor[category].color}>{category}</CategoryLabel>
          <NewsTitle size={TitleSizes.md} style={{ textAlign: 'center' }}>
            {name}
          </NewsTitle>
          <div>{new Date(created).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </AlsoLikeItemContent>
      </UnstyledLink>
    </div>
  ),
)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${({ image_path }) => image_path});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
