import React, { useState } from 'react';

import { Container } from '@pages/MainLayout/MainLayout.styled';
import { PanelTitle } from 'common/PanelTitle';
import { observer } from 'mobx-react-lite';
import { useEventList } from '../hooks/EventList';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Stack } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useStores } from 'store';
import { CalendarEvent } from 'store/api/__generated__';
import moment from 'moment';
import { EventRowEditor } from './EventRowEditor';

export const CalendarEditor = observer(() => {
  const {
    ApiStore: { api, isAuth },
    UtilsStore: { calendarEventTypes },
  } = useStores();

  const { eventList, updateEvents } = useEventList();

  const [selectedEvent, setSelectedEvent] = useState(null);

  const deleteHandler = async (event: CalendarEvent) => {
    console.log(await api.editor.editorCalendarEventDelete(event.pk.toString()));

    updateEvents();
  };

  const editHandler = (event) => {
    setSelectedEvent(event);
  };

  const cancelHandler = () => {
    if (selectedEvent.pk == maxPk) eventList.shift();
    setSelectedEvent(null);
  };

  const saveHandler = async (event: CalendarEvent) => {
    try {
      if (selectedEvent.pk == maxPk) {
        console.log(await api.editor.editorCalendarEventCreate({ ...event, type: event.type.pk }));
      } else {
        console.log(
          await api.editor.editorCalendarEventUpdate(selectedEvent.pk.toString(), { ...event, type: event.type.pk }),
        );
      }
      updateEvents();
    } catch (e) {
      console.log(e.response.data);
    }
    setSelectedEvent(null);
  };

  const [maxPk, setMaxPk] = useState(0);
  const addHandler = () => {
    let maxPk = 0;
    eventList.forEach(({ pk }) => (pk > maxPk ? (maxPk = pk) : undefined));
    const newEvent = {
      type: calendarEventTypes[0],
      name: '',
      start_date: moment().format('YYYY-MM-DDTHH:mm'),
      pk: maxPk + 1,
      duration_hours: 0,
    };
    setMaxPk(newEvent.pk);
    eventList.splice(0, 0, newEvent);
    setSelectedEvent(newEvent);
  };

  return (
    <Container>
      <PanelTitle text={'календарь мероприятий'} />

      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {!selectedEvent && (
                  <IconButton onClick={addHandler} aria-label="new item">
                    <AddIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">Название</TableCell>
              <TableCell align="right" sx={{ minWidth: '100px' }}>
                Дата
              </TableCell>
              <TableCell align="right">Сроки</TableCell>
              <TableCell align="right">Описание</TableCell>
              <TableCell align="right">Тип</TableCell>
              <TableCell align="right">Адресс</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList.map((event) => {
              const { pk, name, start_date, description, type, address, duration_hours: duration } = event;
              const duration_days = (duration / 24) | 0;
              const duration_hours = duration % 24;
              return selectedEvent === event ? (
                <EventRowEditor
                  key={name + '-' + pk}
                  saveHandler={saveHandler}
                  event={event}
                  cancelHandler={cancelHandler}
                />
              ) : (
                <TableRow key={name + '-' + pk} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="right">
                    {!selectedEvent && (
                      <Stack direction={'row'}>
                        <IconButton onClick={() => editHandler(event)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteHandler(event)} aria-label="delete">
                          <DeleteForeverIcon color="warning" />
                        </IconButton>
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{moment(start_date).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="left">
                    {duration_days ? duration_days + 1 + ' д.' : duration_hours + ' ч.'}
                  </TableCell>

                  <TableCell align="left">{description}</TableCell>
                  <TableCell align="right">{calendarEventTypes.find(({ pk }) => type.pk === pk)?.name}</TableCell>
                  <TableCell align="left">{address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
});
