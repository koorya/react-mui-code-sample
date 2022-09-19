import React, { useState } from 'react';

import { Alert, Button, CircularProgress, Link, Stack } from '@mui/material';

import { PasswordInput } from './components/PasswordInput';
import { ValidatedInput } from './components/ValidatedInput';
import { useStores } from 'store';
import { observer } from 'mobx-react-lite';
import { AuthFormStack } from './Auth.styled';

export const RegistrationForm = observer(() => {
  const { ApiStore } = useStores();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    repeat_password: '',
  });

  const [status, setStatus] = useState<'init' | 'loading' | 'error' | 'succsess'>('init');

  const [errorMessage, setErrorMessage] = useState('error');
  const registerHandler = async () => {
    setStatus('loading');
    try {
      await ApiStore.register(values);
      setStatus('succsess');
    } catch (err) {
      setStatus('error');
      console.log(err);
      setErrorMessage(err);
    }
  };

  return (
    <AuthFormStack>
      {status === 'error' && <Alert severity="error">{errorMessage}</Alert>}
      {status === 'loading' && <CircularProgress />}
      {status === 'succsess' && (
        <Alert severity="success">На ваш Email выслано письмо для подтверждения регистрации</Alert>
      )}

      <ValidatedInput
        autoComplete="registration section enter username"
        label="GREENWAY ID"
        isValid={(value) => !/^\d+$/.test(values.username)}
        value={values.username}
        setValue={(value) => setValues({ ...values, username: value })}
        fullWidth
      />
      <ValidatedInput
        autoComplete="registration section enter email"
        label="E-mail"
        isValid={(value) => !/^\S+@\S+\.\S+$/.test(value)}
        value={values.email}
        setValue={(value) => setValues({ ...values, email: value })}
        fullWidth
      />
      <label>
        E-mail, указанный при регистрации на{' '}
        <Link component="a" href="https://new.mygreenway.com/" target={'_blank'}>
          Greenway
        </Link>
      </label>

      <PasswordInput
        value={values.password}
        isValid={(value) => !(value.length > 6)}
        setValue={(value) => setValues({ ...values, password: value })}
        autoComplete="registration section enter password"
        label="Пароль"
        fullWidth
      />

      <PasswordInput
        value={values.repeat_password}
        isValid={(value) => !(values.password === value && value.length > 6)}
        setValue={(value) => setValues({ ...values, repeat_password: value })}
        autoComplete="registration section repeat password"
        label="Повторите пароль"
        fullWidth
      />

      <Button
        fullWidth
        variant="contained"
        onClick={() => registerHandler()}
        disabled={status === 'succsess' || status === 'loading'}
      >
        Зарегистрироваться
      </Button>
    </AuthFormStack>
  );
});
