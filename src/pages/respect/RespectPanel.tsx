import React, { useEffect, useState } from 'react';
import { Container, screenSize } from '@pages/MainLayout/MainLayout.styled';
import { PanelTitle } from 'common/PanelTitle';
import { Grid, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';
import { Respect } from 'store/api/__generated__';
import moment from 'moment';

export const RespectPanel = observer(() => {
  const {
    ApiStore: { api },
  } = useStores();
  const [respectList, setRespectList] = useState<Respect[]>([]);
  useEffect(() => {
    api.respect.respectList().then(({ data }) => {
      setRespectList(data.sort((a, b) => new Date(b.video_date).getTime() - new Date(a.video_date).getTime()));
    });
  }, [api]);

  const t = {};
  t[`@media (min-width: ${screenSize.tablet})`] = { flexBasis: '50%' };
  const headingDateStr = (videoDate: Date) => {
    const [firstLetter, ...rest] = moment(videoDate).format('MMMM YYYY [года]');
    return firstLetter.toUpperCase() + rest.join('');
  };
  return (
    <Container>
      <Stack gap={'30px'}>
        <PanelTitle text={'Признание'} />
        <Grid container spacing={6}>
          {respectList.map(({ name, description, video_id, video_date }, index) => (
            <Grid key={`iframe+${video_id}+${index}`} item sx={t}>
              <Stack>
                <iframe
                  src={`https://player.vimeo.com/video/${video_id}?`}
                  style={{ width: '100%', aspectRatio: '16 / 9', marginBottom: '30px' }}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
                <Typography
                  sx={{
                    fontFamily: 'Arial',
                    fontSize: '18px',
                    fontWeight: '700',
                    lineHeight: '23px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    marginBottom: '10px',
                  }}
                >
                  {name} - {headingDateStr(new Date(video_date))}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Arial',
                    fontSize: '13px',
                    fontWeight: '400',
                    lineHeight: '25px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#AFAFAF',
                  }}
                >
                  {description}
                </Typography>
              </Stack>
            </Grid>
          ))}
          <Grid item xs={6}></Grid>
        </Grid>
      </Stack>
    </Container>
  );
});
