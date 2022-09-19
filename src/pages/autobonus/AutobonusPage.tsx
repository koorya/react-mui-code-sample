import { Container } from '@pages/MainLayout/MainLayout.styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderBackgroundImage, NewsContentStyled, Paper } from '@pages/news/NewsPage.styled';
import { SideMenu } from '@pages/news/SideMenu';
import Output from 'editorjs-react-renderer';

import { renderers } from '@pages/news/utils/CustomEmbedRenderer';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { News } from 'store/api/__generated__';
import { NewsPageTitle } from '@pages/news/utils/NewsPageTitle';

export const AutobonusPage = observer(() => {
  const { ApiStore } = useStores();
  const { newsId } = useParams();
  const [news, setNews] = useState<News>();
  useEffect(() => {
    ApiStore.api.news.newsRead(newsId).then(({ data }) => {
      setNews(data);
    });
  }, [newsId]);

  return (
    <div style={{ alignSelf: 'center' }}>
      <HeaderBackgroundImage imageUrl={news?.image_path} />
      <Container>
        <NewsContentStyled>
          <Paper>
            <NewsPageTitle news={news} />

            <Output renderers={renderers} data={news?.content} classNames={{ paragraph: 'news-paragraph' }} />
          </Paper>
          <SideMenu isAutobonus />
        </NewsContentStyled>
      </Container>
    </div>
  );
});
