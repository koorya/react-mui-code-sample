import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { Path } from 'routes/path';

import { categoryColor, CategoryLabel } from '../NewsListPage.styled';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { NewsTitle, TitleSizes } from '../NewsPage.styled';
import { News } from 'store/api/__generated__';

export const NewsPageTitle = observer((props: { news: News }) => {
  const { news } = props;
  const {
    UserStore: { canEdit },
  } = useStores();
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" justifyContent={'space-between'}>
        <CategoryLabel color={categoryColor[news?.category.name]?.color} style={{ marginBottom: 'auto' }}>
          {news?.category.name}
        </CategoryLabel>
        {canEdit && (
          <Button
            startIcon={<EditIcon />}
            onClick={() => navigate('/' + Path.editor + '/' + Path.news + '/' + news.pk)}
          >
            Редактировать
          </Button>
        )}
      </Stack>

      <NewsTitle size={TitleSizes.lg}>{news?.name}</NewsTitle>
    </>
  );
});
