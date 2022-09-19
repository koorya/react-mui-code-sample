import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconButton, Stack, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import { Respect } from 'store/api/__generated__';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';

export const RespectRowEditor = ({
  saveHandler,
  respect: selectedRespect,
  cancelHandler,
}: {
  saveHandler: (respect: Respect) => Promise<void>;
  respect: Respect;
  cancelHandler: () => void;
}) => {
  const [respect, setRespect] = useState<Respect>({ ...selectedRespect });

  const handleChange = (property: Partial<Respect>) => {
    setRespect({ ...respect, ...property });
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="right">
        <Stack direction={'row'}>
          <IconButton onClick={() => saveHandler(respect)} aria-label="edit">
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
          value={respect.name}
          onChange={(e) => handleChange({ name: e.currentTarget.value })}
        />
      </TableCell>
      <TableCell align="right">
        <DatePicker
          InputProps={{ fullWidth: true, size: 'small', sx: { minWidth: '130px' } }}
          label="Дата"
          value={moment(respect.video_date).format('YYYY-MM-DDTHH:mm')}
          onChange={(e) => handleChange({ video_date: moment(e).format('YYYY-MM-DDTHH:mmZ') })}
          renderInput={(params) => <TextField {...params} />}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          multiline
          fullWidth
          label="Описание"
          variant="standard"
          value={respect.description}
          onChange={(e) => handleChange({ description: e.currentTarget.value })}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          multiline
          fullWidth
          label="vimeo"
          variant="standard"
          value={'https://vimeo.com/' + respect.video_id}
          onChange={(e) =>
            /\/(\d+$)/.test(e.currentTarget.value)
              ? handleChange({ video_id: e.currentTarget.value.match(/\/(\d+$)/)[1] })
              : 0
          }
        />
      </TableCell>
    </TableRow>
  );
};
