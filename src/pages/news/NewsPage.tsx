import { Container } from '@pages/MainLayout/MainLayout.styled';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryColor, CategoryLabel, FreshNewsItem } from './NewsListPage.styled';
import {
  AlsoLikeItem,
  HeaderBackgroundImage,
  MoreInBlock,
  NewsContentStyled,
  Paper,
  YouMayAlsoLikeBlock,
} from './NewsPage.styled';
import { SideMenu } from './SideMenu';
import Output from 'editorjs-react-renderer';

import { renderers } from './utils/CustomEmbedRenderer';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { News, NewsCompact } from 'store/api/__generated__';
import { NewsPageTitle } from './utils/NewsPageTitle';

export const NewsPage = observer(() => {
  const { ApiStore } = useStores();
  const { newsId } = useParams();
  const [news, setNews] = useState<News>();
  const [newsMoreInList, setNewsMoreInList] = useState<NewsCompact[]>([]);

  const [newsAlsoLikeList, setNewsAlsoLikeList] = useState<NewsCompact[]>([]);
  useEffect(() => {
    ApiStore.api.news.newsRead(newsId).then(({ data }) => {
      setNews(data);
      console.log(data);
      ApiStore.api.news
        .newsList({ offset: 0, limit: 3, categories: { exclude: [data.category.name] } })
        .then(({ data }) => {
          setNewsAlsoLikeList(data.news);
        });
      ApiStore.api.news
        .newsList({ offset: 0, limit: 4, categories: { include: [data.category.name] } })
        .then(({ data }) => {
          setNewsMoreInList(data.news);
        });
    });
  }, [newsId]);

  return (
    <div style={{ alignSelf: 'center' }}>
      <HeaderBackgroundImage imageUrl={news?.image_path} />
      <Container>
        <NewsContentStyled>
          <Paper>
            <NewsPageTitle news={news} />

            <Output
              renderers={renderers}
              data={news?.content}
              classNames={{ paragraph: 'news-paragraph', list: { container: 'news-list' } }}
            />

            <div>
              <h2>Может быть интересно</h2>
              <YouMayAlsoLikeBlock>
                {newsAlsoLikeList.map(({ pk, description, created, category, ...restNews }, index) => (
                  <AlsoLikeItem
                    to={'/news/' + pk}
                    key={pk + ' - ' + index + 'lenta'}
                    created={created}
                    category={category.name}
                    {...restNews}
                  />
                ))}
              </YouMayAlsoLikeBlock>
            </div>
            <div>
              <h2>
                Больше в категории{' '}
                <CategoryLabel color={categoryColor[news?.category.name]?.color} style={{ marginBottom: 'auto' }}>
                  {news?.category.name}
                </CategoryLabel>
              </h2>

              <MoreInBlock>
                {newsMoreInList.map(({ pk, description, category, created, ...restNews }, index) => (
                  <FreshNewsItem
                    to={'/news/' + pk}
                    key={pk + ' - ' + index + 'fresh'}
                    created={created}
                    category={category.name}
                    {...restNews}
                  />
                ))}
              </MoreInBlock>
            </div>
          </Paper>
          <SideMenu />
        </NewsContentStyled>
      </Container>
    </div>
  );
});
