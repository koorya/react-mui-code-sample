import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from 'routes/path';
import { useStores } from 'store';
import { Category, NewsCompact } from 'store/api/__generated__';
import { SideMenuContainer, SideDivider, Widget, PopularNews, CategoriesItem, Categories } from './NewsListPage.styled';

export const SideMenu = observer(({ isAutobonus = false }: { isAutobonus?: boolean }) => {
  const navigate = useNavigate();
  const {
    ApiStore,
    CategoryStore: { setCategory },
  } = useStores();
  const [newsList, setNewsList] = useState<NewsCompact[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  useEffect(() => {
    const categories = { include: isAutobonus ? ['автобонус'] : [], exclude: !isAutobonus ? ['автобонус'] : [] };
    ApiStore.api.news.newsPopularNewsList({ limit: 4, categories }).then(({ data }) => setNewsList(data));
    if (!isAutobonus) {
      ApiStore.api.news.newsCategoryList({ limit: 3 }).then(({ data }) => {
        setCategoryList(data);
      });
    }
  }, []);
  const categoryClickHandle = (category: Category) => {
    navigate('/' + Path.news);
    setCategory(category);
  };
  return (
    <SideMenuContainer>
      <Widget>
        <SideDivider>Популярное</SideDivider>
        {newsList.map(({ pk, name, ...restNews }, index) => (
          <PopularNews
            to={(isAutobonus ? '/autobonus/' : '/news/') + pk}
            key={pk + ' ' + index + 'popularNews'}
            name={name.match(/(\S*\s){7}/)?.shift() || name}
            {...restNews}
          />
        ))}
      </Widget>
      {!isAutobonus && (
        <Widget>
          <SideDivider>Категории</SideDivider>
          <Categories>
            {categoryList.map((category) => (
              <CategoriesItem
                key={category.pk + '-category'}
                label={category.name}
                onClick={() => categoryClickHandle(category)}
              />
            ))}
          </Categories>
        </Widget>
      )}
    </SideMenuContainer>
  );
});
