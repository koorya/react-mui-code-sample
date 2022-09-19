import React from 'react';
import { stores, StoresContext } from 'store';
import { BrowserRouter } from 'react-router-dom';
import { BASE_URL_PREFIX } from 'common/const';
import { CustomRoutes } from 'routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/dist/locale/ru';

export const App = () => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <StoresContext.Provider value={stores}>
      <BrowserRouter basename={BASE_URL_PREFIX}>
        <CustomRoutes />
      </BrowserRouter>
    </StoresContext.Provider>
  </LocalizationProvider>
);

export default App;
