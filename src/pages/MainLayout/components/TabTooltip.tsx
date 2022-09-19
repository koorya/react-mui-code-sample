import React, { useState } from 'react';
import { Tab, TabProps, Tooltip } from '@mui/material';
import { ChildContainer, NoMaxWidthTooltip } from '../MainLayout.styled';
import { Path } from 'routes/path';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const TabTooltip = ({
  title,
  children,
  value,
  sx,
}: {
  children: JSX.Element;
  title: string | JSX.Element;
  value: TabProps['value'];
  sx?: TabProps['value'];
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Tab
      sx={{ ...sx, opacity: 1 }}
      onMouseLeave={() => setMenuOpen(false)}
      value={value}
      // onClick={() => setMenuOpen(!menuOpen)}
      label={
        <NoMaxWidthTooltip
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: 'unset',
                // boxShadow: '2', borderRadius: '0px'
              },
            },
          }}
          open={menuOpen}
          // open={true}
          onMouseEnter={() => setMenuOpen(true)}
          disableHoverListener
          title={children}
        >
          <ChildContainer>
            <span>{title}</span>
            <KeyboardArrowDownIcon />
          </ChildContainer>
        </NoMaxWidthTooltip>
      }
    />
  );
};
