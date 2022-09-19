import React, { useEffect, useState } from 'react';
import { Container } from '@pages/MainLayout/MainLayout.styled';
import { useStores } from 'store';
import { Respect } from 'store/api/__generated__';
import { observer } from 'mobx-react-lite';
import { PanelTitle } from 'common/PanelTitle';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  Stack,
  Link,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { RespectRowEditor } from './RespectRowEditor';

export const RespectEditor = observer(() => {
  const {
    ApiStore: { api },
  } = useStores();
  const [respectList, setRespectList] = useState<Respect[]>([]);

  const updateRespectList = () => {
    api.respect.respectList().then(({ data }) => {
      setRespectList(data.sort((a, b) => new Date(b.video_date).getTime() - new Date(a.video_date).getTime()));
    });
  };

  useEffect(updateRespectList, [api]);

  const [selectedRespect, setSelectedRespect] = useState<Respect>(null);

  const deleteHandler = async (respect: Respect) => {
    console.log(await api.editor.editorRespectDelete(respect.pk.toString()));

    updateRespectList();
  };

  const editHandler = (respect) => {
    setSelectedRespect(respect);
  };

  const cancelHandler = () => {
    if (selectedRespect.pk == maxPk) respectList.shift();
    setSelectedRespect(null);
  };

  const saveHandler = async (respect: Respect) => {
    try {
      if (selectedRespect.pk == maxPk) {
        console.log(await api.editor.editorRespectCreate({ ...respect }));
      } else {
        console.log(await api.editor.editorRespectUpdate(selectedRespect.pk.toString(), { ...respect }));
      }
      updateRespectList();
    } catch (e) {
      console.log(e.response.data);
    }
    setSelectedRespect(null);
  };

  const [maxPk, setMaxPk] = useState(0);
  const addHandler = () => {
    let maxPk = 0;
    respectList.forEach(({ pk }) => (pk > maxPk ? (maxPk = pk) : undefined));
    const newRespect: Respect = {
      name: '',
      video_date: moment().format('YYYY-MM-DDTHH:mm'),
      pk: maxPk + 1,
      description: '',
      video_id: '',
    };
    setMaxPk(newRespect.pk);
    respectList.splice(0, 0, newRespect);
    setSelectedRespect(newRespect);
  };

  return (
    <Container>
      <PanelTitle text={'Редактор признание'} />

      <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {!selectedRespect && (
                  <IconButton onClick={addHandler} aria-label="new item">
                    <AddIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">Название</TableCell>
              <TableCell align="right" sx={{ minWidth: '100px' }}>
                Дата
              </TableCell>
              <TableCell align="right">Описание</TableCell>
              <TableCell align="right">Ссылка</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {respectList.map((respect) => {
              const { pk, name, description, video_date, video_id } = respect;
              return selectedRespect === respect ? (
                <RespectRowEditor
                  key={name + '-' + pk}
                  saveHandler={saveHandler}
                  respect={respect}
                  cancelHandler={cancelHandler}
                />
              ) : (
                <TableRow key={name + '-' + pk} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="right">
                    {!selectedRespect && (
                      <Stack direction={'row'}>
                        <IconButton onClick={() => editHandler(respect)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteHandler(respect)} aria-label="delete">
                          <DeleteForeverIcon color="warning" />
                        </IconButton>
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{moment(video_date).format('YYYY-MM-DD')}</TableCell>
                  <TableCell align="left">{description}</TableCell>
                  <TableCell align="left">
                    <Link href={'https://vimeo.com/' + video_id} target="_blank">
                      {'https://vimeo.com/' + video_id}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
});
// src="https://player.vimeo.com/video/701776139?"
