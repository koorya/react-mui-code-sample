import { Grid, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CalendarWidget } from './CalenarWidget';
import { ExtendedEventType } from './utils/EventTypes';
import { observer } from 'mobx-react-lite';
import { useEventList } from './hooks/EventList';

import { CalendarEventView } from './CalendarEventView';
import { PanelTitle } from '../../common/PanelTitle';
import { CalendarFilterTabs } from './CalendarFilterTabs';
import { Container } from '@pages/MainLayout/MainLayout.styled';

export const CalendarPanel = observer(({ isMobile }: { isMobile?: boolean }) => {
  const { extendedEvents } = useEventList();

  const [eventType, setEventType] = useState(-1);

  const [selectedEvent, setSelectedEvent] = useState<ExtendedEventType>(null);
  useEffect(() => {
    if (extendedEvents.length) setSelectedEvent(extendedEvents[0]);
  }, [extendedEvents]);

  return !isMobile ? (
    <Paper
      sx={{
        padding: '35px',
        maxWidth: '1100px',
        // maxWidth: '500px',
      }}
    >
      <PanelTitle text={'календарь мероприятий'} />
      <Grid container spacing={2}>
        <Grid container item xs={8} spacing={2} direction={'column'}>
          <Grid item xs>
            <CalendarFilterTabs eventTypePk={eventType} setEventType={setEventType} />
          </Grid>
          <Grid item xs>
            <CalendarWidget
              setCurrentEvent={setSelectedEvent}
              eventList={extendedEvents}
              activeEventTypePk={eventType}
            />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {!!selectedEvent && <CalendarEventView extendedEvent={selectedEvent} />}
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <Container>
      <PanelTitle text={'календарь мероприятий'} isMobile />
      <CalendarFilterTabs eventTypePk={eventType} setEventType={setEventType} />
      <CalendarWidget
        smallView
        setCurrentEvent={setSelectedEvent}
        eventList={extendedEvents}
        activeEventTypePk={eventType}
      />

      {!!selectedEvent && <CalendarEventView isMobile extendedEvent={selectedEvent} />}
    </Container>
  );
});
