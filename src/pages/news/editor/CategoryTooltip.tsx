import { Tooltip } from '@mui/material';
import React from 'react';
import { Category } from 'store/api/__generated__';
import { categoryColor, CategoryLabel } from '../NewsListPage.styled';

export const CategoryTooltip = ({
  currentCategroy,
  setCurrentCategroy,
  categoryList,
}: {
  currentCategroy: Category;
  setCurrentCategroy: (s: Category) => void;
  categoryList: Category[];
}) => {
  const caterorySelecthandler = (category: Category) => {
    setCurrentCategroy(category);
  };
  return (
    <Tooltip
      componentsProps={{ tooltip: { sx: { backgroundColor: 'white' } } }}
      placement="bottom-start"
      title={
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categoryList.map((category, index, arr) => (
            <CategoryLabel
              key={'caegory-' + category.pk}
              color={categoryColor[category.name].color}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => caterorySelecthandler(category)}
            >
              {category.name}
            </CategoryLabel>
          ))}
        </div>
      }
    >
      <CategoryLabel
        color={categoryColor[currentCategroy?.name]?.color}
        style={{ marginBottom: 'auto', cursor: 'pointer' }}
      >
        {currentCategroy?.name}
      </CategoryLabel>
    </Tooltip>
  );
};
