import React from 'react';
import { Path } from 'routes/path';
import { MenuItemStyled } from '../MainLayout.styled';
import { Paper } from '@mui/material';
import { LinkItem } from '../../../store/LinkItem';

export const TooltipList = ({ prefix, items }: { prefix: Path; items: LinkItem[] }) => {
  return (
    <Paper>
      {items?.map((child_route, index, arr) => (
        <MenuItemStyled
          to={`/${prefix}/${child_route.path}`}
          key={`menuitem-${child_route.path}`}
          hasBorderBotttom={index < arr.length - 1}
        >
          {child_route.label}
        </MenuItemStyled>
      ))}
    </Paper>
  );
};
