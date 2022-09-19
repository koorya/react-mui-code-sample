import React from 'react';
import styled from '@emotion/styled';
import { Link as RouteLink } from 'react-router-dom';
import { screenSize } from '@pages/MainLayout/MainLayout.styled';

export const NewsListPageStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const enableColor = false;
export const FreshNews = styled.div`
  display: grid;

  ${enableColor ? 'background: green;' : ''}
  height: 1135px;

  grid-template-rows: 1.3fr 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'one'
    'two'
    'three'
    'four';
  & > div:nth-of-type(3) h2,
  & > div:nth-of-type(4) h2 {
    font-size: 18px;
  }
  & > div:nth-of-type(2) h2 {
    font-size: 20px;
  }

  & > div:nth-of-type(1) h2 {
    font-size: 22px;
  }
  @media (min-width: ${screenSize.mobileM}) {
    ${enableColor ? 'background: red;' : ''}
    height: 905px;

    grid-template-rows: 1.1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'one one'
      'two two'
      'three four';

    & > div:nth-of-type(1) h2 {
      font-size: 23px;
    }
  }
  @media (min-width: ${screenSize.tablet}) {
    ${enableColor ? 'background: yellow;' : ''}
    height: 470px;

    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
      'one two two'
      'one three four';
  }

  @media (min-width: ${screenSize.desktop}) {
    ${enableColor ? 'background: cyan;' : ''}
    height: 470px;

    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
      'one two three'
      'one two four';

    & > div:nth-of-type(1) h2 {
      font-size: 27.3px;
    }
  }

  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
  & > div:nth-of-type(1) {
    grid-area: one;
  }
  & > div:nth-of-type(2) {
    grid-area: two;
  }
  & > div:nth-of-type(3) {
    grid-area: three;
  }
  & > div:nth-of-type(4) {
    grid-area: four;
  }
  & > div:nth-of-type(3) .news_date,
  & > div:nth-of-type(4) .news_date {
    display: none;
  }
`;

export const CategoryLabel = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  color: white;
  border-radius: 5px;
  display: inline-block;
  padding: 5px 10px;
`;

export const categoryColor = {
  'спорт': {
    color: '#ee303a',
    url: 'https://atbs.bk-ninja.com/ceris/wp-content/uploads/2020/04/ryan-spencer-c-NEiPIxpYI-unsplash-min-400x200.jpg',
  },
  'мотивация': {
    color: '#ee303a',
    url: 'https://atbs.bk-ninja.com/ceris/wp-content/uploads/2020/04/ryan-spencer-c-NEiPIxpYI-unsplash-min-400x200.jpg',
  },

  'работа': {
    color: '#ff7500',
    url: 'https://atbs.bk-ninja.com/ceris/wp-content/uploads/2020/04/a-photograph-of-a-woman-holding-a-canadian-flag-2961063-min-400x200.jpg',
  },
  'истории успеха': {
    color: '#ff7500',
    url: 'https://atbs.bk-ninja.com/ceris/wp-content/uploads/2020/04/a-photograph-of-a-woman-holding-a-canadian-flag-2961063-min-400x200.jpg',
  },

  'природа': {
    color: '#4ca80b',
    url: 'https://atbs.bk-ninja.com/ceris/wp-content/uploads/2020/04/ceris_5-400x200.jpg',
  },
  'другое': { color: '#4ca80b', url: 'https://atbs.bk-ninja.com/ceris/wp-content/uploads/2020/04/ceris_5-400x200.jpg' },

  'автобонус': {
    color: 'linear-gradient(-45deg, #eee952, #e95353, #6361d9, #4be74f );',
    url: 'https://www.gazeta.uz/media/img/2020/10/6GgNU216030173648210_b.jpg',
  },
};

export const UnstyledLink = styled(RouteLink)`
  text-decoration: none;
  color: unset;
  /* background: rgba(158, 22, 22, 0.438); */
`;

export const __FreshNewsItemLink = styled(UnstyledLink)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  align-self: stretch;
  width: 100%;
`;

export const FreshNewsItem = styled(({ image_path, category, name, created, to, ...rest }) => (
  <div {...rest}>
    <__FreshNewsItemLink to={to}>
      <CategoryLabel color={categoryColor[category].color} style={{ marginBottom: 'auto' }}>
        {category}
      </CategoryLabel>
      <h2>{name}</h2>
      <div className="news_date">
        {new Date(created).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </__FreshNewsItemLink>
  </div>
))`
  background: linear-gradient(transparent 60%, #000), ${({ image_path }) => `url(${image_path})`} center no-repeat;
  background-size: cover;
  color: white;
  display: flex;
`;

export const __NewsItemLink = styled(UnstyledLink)``;

export const NewsItem = styled(({ image_path, category, name, description, created, to, ...rest }) => (
  <div>
    <UnstyledLink {...rest} to={to}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        <CategoryLabel color={categoryColor[category].color}>{category}</CategoryLabel>
        <h2>{name}</h2>

        <div style={{ marginBottom: '15px', color: 'rgba(34, 34, 34, 0.6)' }}>{description}</div>

        <div style={{ marginTop: '5px', color: 'rgba(34, 34, 34, 0.6)' }}>
          {new Date(created).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
      <div style={{ justifySelf: 'stretch' }}>
        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={image_path} alt="news_item" />
      </div>
    </UnstyledLink>
  </div>
))`
  margin: 20px 0px 20px 0px;
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: 300px;
  @media (max-width: ${screenSize.desktop}) {
    grid-template-columns: 1fr 325px;
    grid-template-rows: 243px;
  }
  @media (max-width: ${screenSize.tablet}) {
    margin: 20px 0px 20px 0px;
    grid-template-columns: 1fr 350px;
    grid-template-rows: 262px;
  }
  @media (max-width: ${screenSize.mobileM}) {
    grid-template-columns: 1fr;
    grid-template-rows: 382px 1fr;
    gap: 20px;
    & > div:nth-of-type(1) {
      order: 1;
    }
  }
`;

export const NewsListStyled = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 3fr 1fr;
  @media (max-width: ${screenSize.tablet}) {
    display: flex;
    flex-direction: column;
  }
`;

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  position: static;
  @media (min-width: ${screenSize.tablet}) {
    max-width: 270px;
    margin: 0px auto;
    position: sticky;
    align-self: flex-start;
  }
`;

export const PopularNews = styled(({ image_path, to, name, ...rest }) => (
  <UnstyledLink {...rest} to={to}>
    <img width="70px" height="70px" style={{ objectFit: 'cover' }} src={image_path} alt="news pic" />
    <div style={{ marginLeft: '15px' }}>{name}</div>
  </UnstyledLink>
))`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  font-size: 15px;
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-items: center; */
  /* align-items: center; */
  /* justify-content: center; */
`;

export const CategoriesItem = styled(({ label, ...rest }) => (
  <div {...rest}>
    <img
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
      src={categoryColor[label].url}
      alt="category"
    />
    <CategoryLabel color={categoryColor[label].color} style={{ position: 'absolute' }}>
      {label}
    </CategoryLabel>
  </div>
))`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 120px;
  margin: 25px 0px;
  @media (max-width: ${screenSize.desktop}) {
    width: 260px;
  }
  @media (max-width: ${screenSize.tablet}) {
    width: 320px;
    margin: 15px 10px;
  }
  @media (max-width: ${screenSize.mobileM}) {
    width: 245px;
  }
  @media (max-width: ${screenSize.mobileS}) {
    width: 100%;
  }
`;

export const SideDivider = styled.div`
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: 600;
  text-transform: initial;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.7);
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #ddd;
    margin-left: 20px;
    min-width: 50px;
  }
`;
export const Widget = styled.div`
  margin-bottom: 55px;
`;
