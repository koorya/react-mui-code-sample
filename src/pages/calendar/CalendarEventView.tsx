import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { ExtendedEventType } from './utils/EventTypes';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const CalendarEventView = ({
  extendedEvent,
  isMobile,
  showEndTime: s,
}: {
  extendedEvent: ExtendedEventType;
  isMobile?: boolean;
  showEndTime?: boolean;
}) => {
  const timeStartText = extendedEvent.date.toLocaleString('ru', { hour: '2-digit', minute: '2-digit' });
  const showEndTime = extendedEvent.duration_hours && extendedEvent.duration_hours < 24;
  const timeEndText = showEndTime
    ? new Date(extendedEvent.date.getTime() + 1000 * 60 * 60 * extendedEvent.duration_hours).toLocaleString('ru', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : undefined;
  return (
    <Paper
      sx={{
        padding: '20px 50px',
        boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.05)',
        borderRadius: '0px',
        minHeight: '405px',
        height: '405px',
        maxWidth: '350px',
        margin: '0px auto',
        boxSizing: 'border-box',
      }}
    >
      <Stack>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: '900',
            lineHeight: '29px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#333333',

            marginBottom: '8px',
          }}
        >
          {extendedEvent.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '300',
            lineHeight: '21px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#787885',
          }}
        >
          {extendedEvent.description}
        </Typography>
      </Stack>

      <Stack direction={'row'} gap="10px" marginTop={'10px'}>
        <AccessTimeIcon color="error" />
        <Stack>
          <Typography color="error" sx={{ fontWeight: '600' }}>
            {timeStartText}
            {!!timeEndText && <>— {timeEndText}</>}
          </Typography>
          <Typography color="GrayText" fontSize={'14px'}>
            {extendedEvent.date
              .toLocaleDateString('ru', { dateStyle: 'full' })
              .split(' ')
              .slice(0, 3)
              .map((value, index) => (index ? value : value[0].toUpperCase() + value.slice(1)))
              .join(' ')}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '21px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#333333',
            marginBottom: '8px',
          }}
        >
          Адрес мероприятия:
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '300',
            lineHeight: '21px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#333333',
            marginTop: '8px',
          }}
        >
          {extendedEvent.address}
        </Typography>
      </Stack>
      {/* <Button
        sx={{
          'textDecoration': 'underline',
          'textTransform': 'none',
          'color': '#EE303A',
          'fontWeight': '600',
          'fontSize': '18px',
          '&:hover': {
            textDecoration: 'underline',
          },
          'marginTop': 'auto',
        }}
        fullWidth
      >
        Принять участие
      </Button> */}
    </Paper>
  );
};
