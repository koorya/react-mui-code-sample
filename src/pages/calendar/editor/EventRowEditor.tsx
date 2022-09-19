import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import { CalendarEvent } from 'store/api/__generated__';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';

const durationList = [
  { label: '0ч', value: 0 },
  { label: '1ч', value: 1 },
  { label: '2ч', value: 2 },
  { label: '3ч', value: 3 },
  { label: '4ч', value: 4 },
  { label: '5ч', value: 5 },
  { label: '6ч', value: 6 },
  { label: '7ч', value: 7 },
  { label: '8ч', value: 8 },
  { label: '9ч', value: 9 },
  { label: '10ч', value: 10 },
  { label: '2д', value: 24 * 1 },
  { label: '3д', value: 24 * 2 },
  { label: '4д', value: 24 * 3 },
  { label: '5д', value: 24 * 4 },
];

export const EventRowEditor = observer(
  ({
    saveHandler,
    event: selectedEvent,
    cancelHandler,
  }: {
    saveHandler: (event: CalendarEvent) => Promise<void>;
    event: CalendarEvent;
    cancelHandler: () => void;
  }) => {
    const {
      UtilsStore: { calendarEventTypes },
    } = useStores();

    const [event, setEvent] = useState<CalendarEvent>({ ...selectedEvent });

    const handleChange = (property: Partial<CalendarEvent>) => {
      setEvent({ ...event, ...property });
    };

    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="right">
          <Stack direction={'row'}>
            <IconButton onClick={() => saveHandler(event)} aria-label="edit">
              <SaveIcon />
            </IconButton>

            <IconButton onClick={cancelHandler} aria-label="cancel">
              <RestoreIcon />
            </IconButton>
          </Stack>
        </TableCell>

        <TableCell component="th" scope="row">
          <TextField
            multiline
            fullWidth
            label="Название"
            variant="standard"
            value={event.name}
            onChange={(e) => handleChange({ name: e.currentTarget.value })}
          />
        </TableCell>
        <TableCell align="right">
          <DateTimePicker
            InputProps={{ fullWidth: true, size: 'small', sx: { minWidth: '170px' } }}
            label="Дата и время"
            value={moment(event.start_date).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => handleChange({ start_date: moment(e).format('YYYY-MM-DDTHH:mmZ') })}
            renderInput={(params) => <TextField {...params} />}
          />
        </TableCell>

        <TableCell align="right">
          <FormControl fullWidth>
            <InputLabel id="duration-select-label">Сроки</InputLabel>
            <Select
              size="small"
              labelId="duration-select-label"
              id="duration-select"
              value={event.duration_hours}
              label="Сроки"
              onChange={(e) => handleChange({ duration_hours: e.target.value as number })}
            >
              {durationList.slice(1).map(({ label, value }) => (
                <MenuItem value={value} key={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>

        <TableCell align="left">
          <TextField
            multiline
            fullWidth
            label="Описание"
            variant="standard"
            value={event.description}
            onChange={(e) => handleChange({ description: e.currentTarget.value })}
          />
        </TableCell>
        <TableCell align="right">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={event.type.pk}
              label="Тип"
              onChange={(e) => handleChange({ type: calendarEventTypes.find(({ pk }) => pk == e.target.value) })}
            >
              {calendarEventTypes.map(({ pk, name }) => (
                <MenuItem value={pk} key={pk}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="right">
          <TextField
            multiline
            fullWidth
            label="Адресс"
            variant="standard"
            value={event.address}
            onChange={(e) => handleChange({ address: e.currentTarget.value })}
          />
        </TableCell>
      </TableRow>
    );
  },
);
