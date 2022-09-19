import React, { useState } from 'react';
import { Path } from 'routes/path';
import { List, Tab } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CollapseTab } from './CollapseTab';
import { ListItemStyled } from '../MainLayout.styled';
import { LinkItem } from 'store/LinkItem';
export const CollapsedLinksList = (
  label: JSX.Element,
  prefix: Path,
  items: LinkItem[],
  isMenuOpen: boolean,
  toggleMenuOpen: () => void,
) => {
  return [
    <Tab
      key={'tab-mobile-learning'}
      value={`/${prefix}`}
      onClick={toggleMenuOpen}
      label={
        <div style={{ display: 'flex', width: '100%' }}>
          {label}
          <div style={{ marginLeft: 'auto' }}>{isMenuOpen ? <ExpandLess /> : <ExpandMore />}</div>
        </div>
      }
    />,
    <CollapseTab in={isMenuOpen} key={'CollapseTab-mobile-learning'}>
      <List>
        {items.map((child_route, index, arr) => (
          <ListItemStyled
            to={`/${prefix}/${child_route.path}`}
            key={`Tab-${child_route.path}`}
            hasBorderBotttom={index < arr.length - 1}
          >
            {child_route.label}
          </ListItemStyled>
        ))}
      </List>
    </CollapseTab>,
  ];
};
