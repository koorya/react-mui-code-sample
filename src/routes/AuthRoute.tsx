import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { useStores } from 'store';
import { Path } from './path';

export const AuthRoute = observer(() => {
  const {
    ApiStore: { isFetching, isAuth },
    UserStore: { isLoading },
  } = useStores();

  return isAuth ? <Outlet /> : isFetching ? <CircularProgress /> : <Navigate to={`/${Path.default}`} replace />;
});

export const EditorRoute = observer(() => {
  const {
    UserStore: { canEdit },
  } = useStores();
  return canEdit ? <AuthRoute /> : <Navigate to={`/${Path.default}`} replace />;
});

export const QualificatedRoute = observer(({ step }: { step: 'no_active' | 'active' | 's' | 'l' }) => {
  const {
    ApiStore: { token, isFetching },
    UtilsStore: {
      userRegalia: { qualification, lo },
      isFetching: utilIsFetching,
    },
  } = useStores();

  const isAllowed =
    token &&
    !isFetching &&
    !utilIsFetching &&
    (step === 'no_active' ||
      (step === 'active' && lo > 50) ||
      (step === 's' && qualification?.match(/^(s|l|m|g).*/)) ||
      (step === 'l' && qualification?.match(/^(l|m|g).*/)));

  return isAllowed ? (
    <Outlet />
  ) : isFetching || utilIsFetching ? (
    <CircularProgress />
  ) : (
    <Navigate to={`/${Path.default}`} replace />
  );
});
