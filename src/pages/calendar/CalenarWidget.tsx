import React, { useCallback, useState } from 'react';

import { PickersDayProps } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { Button, Stack } from '@mui/material';
import {
  ActiveCalendarDayStyled,
  BaseCalendarDayStyled,
  CalendarPickerStyled,
  FinishActiveCalendarDay,
  MiddletActiveCalendarDay,
  OutsideCalendarDayStyled,
  StartActiveCalendarDay,
} from './Calendar.styled';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ExtendedEventType } from './utils/EventTypes';

export const CalendarWidget = ({
  setCurrentEvent,
  eventList,
  activeEventTypePk,
  smallView,
}: {
  setCurrentEvent: (event: ExtendedEventType) => void;
  eventList: ExtendedEventType[];
  activeEventTypePk: number;
  smallView?: boolean;
}) => {
  const [widgetDate, setWidgetDate] = useState(moment());
  const [widgetNextDate, setWidgetNextDate] = useState(moment().add(1, 'months'));

  const nextMonth = () => {
    const currentMonth = moment(widgetDate);
    setWidgetDate(moment(currentMonth).add(1, 'months'));
    setWidgetNextDate(moment(currentMonth).add(2, 'months'));
  };
  const prevMonth = () => {
    const currentMonth = moment(widgetDate);
    setWidgetDate(moment(currentMonth).add(-1, 'months'));
    setWidgetNextDate(moment(currentMonth));
  };

  const CalendarDay = useCallback(
    (day: Moment, selectedDays: Moment[], dayProps: PickersDayProps<Moment>) => {
      const nearestEvent = eventList
        .filter(({ date }) => day.isSameOrAfter(moment(date).startOf('date')))
        .sort(({ date: dateA }, { date: dateB }) => dateA.getTime() - dateB.getTime())
        .pop();
      const days = Math.round(nearestEvent?.duration_hours / 24);

      const dayOfMonth = day.date();
      const key = day.dayOfYear();

      if (dayProps.outsideCurrentMonth)
        return <OutsideCalendarDayStyled key={key}>{dayOfMonth}</OutsideCalendarDayStyled>;

      if (!nearestEvent) return <BaseCalendarDayStyled key={key}>{dayOfMonth}</BaseCalendarDayStyled>;

      if (activeEventTypePk !== -1 && nearestEvent.type.pk !== activeEventTypePk)
        return <BaseCalendarDayStyled key={key}>{dayOfMonth}</BaseCalendarDayStyled>;

      if (day.isSame(moment(nearestEvent.date).startOf('date'))) {
        if (!days)
          return (
            <ActiveCalendarDayStyled
              key={key}
              event_background={nearestEvent.type.backgroundcss}
              onClick={() => setCurrentEvent(nearestEvent)}
            >
              {dayOfMonth}
            </ActiveCalendarDayStyled>
          );
        return (
          <StartActiveCalendarDay
            key={key}
            event_background={nearestEvent.type.backgroundcss}
            onClick={() => setCurrentEvent(nearestEvent)}
          >
            {dayOfMonth}
          </StartActiveCalendarDay>
        );
      }

      if (day.isBefore(moment(nearestEvent.date).add(days, 'day').startOf('date')))
        return (
          <MiddletActiveCalendarDay
            key={key}
            event_background={nearestEvent.type.backgroundcss}
            onClick={() => setCurrentEvent(nearestEvent)}
          >
            {dayOfMonth}
          </MiddletActiveCalendarDay>
        );
      if (day.isSame(moment(nearestEvent.date).add(days, 'day').startOf('date')))
        return (
          <FinishActiveCalendarDay
            key={key}
            event_background={nearestEvent.type.backgroundcss}
            onClick={() => setCurrentEvent(nearestEvent)}
          >
            {dayOfMonth}
          </FinishActiveCalendarDay>
        );

      return <BaseCalendarDayStyled key={key}>{dayOfMonth}</BaseCalendarDayStyled>;
    },
    [setCurrentEvent, eventList, activeEventTypePk],
  );

  return (
    <Stack direction={'row'}>
      <Button sx={{ minWidth: '5px' }} onClick={prevMonth}>
        <ArrowBackIcon color="error" />
      </Button>

      <CalendarPickerStyled date={widgetDate} onChange={() => {}} renderDay={CalendarDay} disabled />
      {!smallView && (
        <CalendarPickerStyled date={widgetNextDate} onChange={() => {}} renderDay={CalendarDay} disabled />
      )}
      <Button sx={{ minWidth: '5px' }} onClick={nextMonth}>
        <ArrowForwardIcon color="error" />
      </Button>
    </Stack>
  );
};
