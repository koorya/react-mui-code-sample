import { Container } from '@pages/MainLayout/MainLayout.styled';
import React from 'react';
import { HeaderBackgroundImage, NewsContentStyled, NewsTitle, Paper, TitleSizes } from '@pages/news/NewsPage.styled';
import { SideMenu } from '@pages/news/SideMenu';
import { Outlet } from 'react-router-dom';

export const StudyingPage = () => {
  return (
    <div style={{ alignSelf: 'center' }}>
      <HeaderBackgroundImage
        imageUrl={'https://naked-science.ru/wp-content/uploads/2018/07/field_image_andromeda0.jpg'}
      />
      <Container>
        <NewsContentStyled>
          <Paper>
            <Outlet />
          </Paper>
          <SideMenu />
        </NewsContentStyled>
      </Container>
    </div>
  );
};
