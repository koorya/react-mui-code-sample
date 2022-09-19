import { Container } from '@pages/MainLayout/MainLayout.styled';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useStores } from 'store';
import { NewsCompact, NewsList } from 'store/api/__generated__';
import { NewsItem, NewsListStyled, NewsListPageStyled, FreshNews, FreshNewsItem } from './NewsListPage.styled';
import { SideMenu } from './SideMenu';
import Pagination from '@mui/material/Pagination';
import { Path } from 'routes/path';
import Chip from '@mui/material/Chip';
import { FeedbackForm } from './utils/FeedbackForm';

const FRESH_NEWS_COUNT = 4;
const NEWS_PER_PAGE = 6;

export const NewsListPage = observer(
  ({ title, path, categoryOnly }: { title: string; path: Path; categoryOnly?: string }) => {
    const {
      ApiStore: { api, isAuth },
      CategoryStore: { category, setCategory },
    } = useStores();
    const [freshNewsList, setFreshNewsList] = useState<NewsCompact[]>([]);
    const [newsList, setNewsList] = useState<NewsCompact[]>([]);
    const [freshNewsCount, setFreshNewsCount] = useState(FRESH_NEWS_COUNT);
    const showNewsPlate = freshNewsCount > 0;
    useEffect(() => {
      const handler = ({ data }: { data: NewsList }) => {
        const _freshNewsCount = data.total < 6 ? 0 : FRESH_NEWS_COUNT;
        setFreshNewsList(data.news.slice(0, _freshNewsCount));
        setNewsList(data.news.slice(_freshNewsCount, _freshNewsCount + NEWS_PER_PAGE));
        setPageCount(Math.round((data.total - _freshNewsCount) / NEWS_PER_PAGE));
        setFreshNewsCount(_freshNewsCount);
      };

      if (categoryOnly === 'автобонус') {
        api.news
          .newsList({ offset: 0, limit: FRESH_NEWS_COUNT + NEWS_PER_PAGE, categories: { include: ['автобонус'] } })
          .then(handler);
      } else {
        const categories = category ? { include: [category.name] } : { exclude: ['автобонус'] };
        api.news.newsList({ offset: 0, limit: FRESH_NEWS_COUNT + NEWS_PER_PAGE, categories }).then(handler);
      }
    }, [category]);
    const categoryDisableHandle = () => {
      setCategory(null);
      setPageCount(10);
    };
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(10);

    const paginationChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
      const offset = (page - 1) * NEWS_PER_PAGE + freshNewsCount;
      if (categoryOnly === 'автобонус') {
        api.news
          .newsList({ offset: offset, limit: NEWS_PER_PAGE, categories: { include: ['автобонус'] } })
          .then(({ data: { news } }) => {
            setNewsList(news);
          });
      } else {
        const categories = category ? { include: [category.name] } : { exclude: ['автобонус'] };
        api.news.newsList({ offset: offset, limit: NEWS_PER_PAGE, categories }).then(({ data: { news } }) => {
          setNewsList(news);
        });
      }
    };
    return (
      <Container>
        <NewsListPageStyled>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}>
            <h2>{title}</h2>
            {category && !categoryOnly && (
              <Chip
                label={category.name}
                variant="outlined"
                onDelete={categoryDisableHandle}
                size="medium"
                sx={{ fontSize: '15px' }}
              />
            )}
          </div>
          {showNewsPlate && (
            <>
              <FreshNews>
                {freshNewsList.map(({ pk, created, category, ...restNews }, index) => (
                  <FreshNewsItem
                    to={`/${path}/${pk}`}
                    key={pk + '- ' + index}
                    created={created}
                    category={category.name}
                    {...restNews}
                  />
                ))}
              </FreshNews>
            </>
          )}
          <NewsListStyled>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {newsList.map(({ pk, description, created, category, ...restNews }, index) => (
                <NewsItem
                  to={`/${path}/${pk}`}
                  key={pk + ' - ' + index + 'lenta'}
                  description={description ? description.trim() + '...' : ''}
                  created={created}
                  category={category.name}
                  {...restNews}
                />
              ))}
              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  page={page}
                  style={{ marginTop: 'auto', alignSelf: 'center' }}
                  onChange={paginationChangeHandler}
                />
              )}
              {isAuth && <FeedbackForm />}
            </div>
            <SideMenu isAutobonus={categoryOnly ? true : false} />
          </NewsListStyled>
        </NewsListPageStyled>
      </Container>
    );
  },
);
