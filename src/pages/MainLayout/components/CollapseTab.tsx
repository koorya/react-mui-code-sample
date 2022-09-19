import React from 'react';
import { Collapse, CollapseProps, TabProps } from '@mui/material';

export const CollapseTab = (props: CollapseProps & Omit<TabProps, 'children'>) => (
  <Collapse in={props.in}>{props.children}</Collapse>
);
