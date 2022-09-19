import React, { useState } from 'react';

import { Alert, Button, Link } from '@mui/material';
import { ValidatedInput } from './components/ValidatedInput';
import { PasswordInput } from './components/PasswordInput';

import { useStores } from '../../store';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthFormStack } from './Auth.styled';
import { Link as RouterLink } from 'react-router-dom';

export const LoginForm = observer((props: { loginHandler: () => void }) => {
  const { ApiStore } = useStores();
  const [values, setValues] = useState({
    password: import.meta.env.VITE_PREFILL_PASSWORD as string,
    username: import.meta.env.VITE_PREFILL_LOGIN as string,
  });
  const [status, setStatus] = useState<'init' | 'loading' | 'error' | 'succsess'>('init');
  const [errorMessage, setErrorMessage] = useState('error');
  const loginHandler = async () => {
    setStatus('loading');
    try {
      await ApiStore.logIn(values);
      setStatus('succsess');
      props.loginHandler();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err);
    }
  };
  return (
    <AuthFormStack>
      {status === 'error' && <Alert severity="error">{errorMessage}</Alert>}
      {status === 'loading' && <CircularProgress />}
      {status === 'succsess' && <Alert severity="success">Вход удался</Alert>}

      <ValidatedInput
        autoComplete="login section enter username"
        isValid={(value) => !/^\d+$/.test(value)}
        value={values.username}
        setValue={(value) => setValues({ ...values, username: value })}
        fullWidth
        label={'GREENWAY ID'}
      />
      <PasswordInput
        value={values.password}
        isValid={(value) => !(value.length > 6)}
        setValue={(value) => setValues({ ...values, password: value })}
        autoComplete="registration section enter password"
        label="Пароль"
        fullWidth
      />
      <Button variant="contained" fullWidth onClick={loginHandler} disabled={status === 'loading'}>
        Войти
      </Button>
      <Link component={RouterLink} to={'/reset_password'}>
        Забыли пароль?
      </Link>
    </AuthFormStack>
  );
});
