import { Stack, Typography } from '@mui/material';
import React from 'react';

export const PanelTitle = ({ text, isMobile }: { text: string; isMobile?: boolean }) => (
  <Stack direction={'row'} alignItems={'center'} gap="13px" marginLeft={!isMobile ? '-33px' : '8px'}>
    {!isMobile && (
      <div
        style={{
          width: '21px',
          height: '21px',
          borderRadius: '10px',
          background: '#EE303A',
        }}
      ></div>
    )}
    <Typography
      sx={{
        color: '#33354C',

        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: isMobile ? '20px' : '28px',
        lineHeight: '32px',
      }}
    >
      {text.toUpperCase()}
    </Typography>
  </Stack>
);
