import React, { useEffect, useState } from 'react';

import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { ValidatedInput } from '../components/ValidatedInput';
import { PasswordInput } from '../components/PasswordInput';

import { useStores } from '../../../store';
import { observer } from 'mobx-react-lite';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthFormStack } from '../Auth.styled';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { ResetNewPassword } from 'store/api/__generated__';

const steps = ['Ввод данных', 'Отправка ссылки', 'Ввод нового пароля'];

export const ResetPasswordPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recoveryValues, setRecoveryValues] = useState<ResetNewPassword>({
    code: '',
    password: '',
    repeat_password: '',
  });
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setRecoveryValues({ password: '', repeat_password: '', code });
      setActiveStep(2);
    }
  }, []);

  const savePasswordHandler = async () => {
    setRequestStatus('loading');
    try {
      const res = await ApiStore.api.authorization.authorizationResetNewPasswordUpdate(recoveryValues);
      setRequestStatus('succsess');
      setMessage(`Пароль успешно изменен`);
    } catch (err) {
      setRequestStatus('error');
      setMessage(err.response.data.detail);
    }
  };

  const { ApiStore } = useStores();
  const [values, setValues] = useState({
    email: '',
    username: '',
  });
  const [requestStatus, setRequestStatus] = useState<'init' | 'loading' | 'error' | 'succsess'>('init');

  const [activeStep, setActiveStep] = useState(0);

  const [variant, setVariant] = useState<'byid' | 'byemail'>('byid');
  const [message, setMessage] = useState('');
  const sendLinkHandler = async () => {
    setRequestStatus('loading');
    try {
      const res = await ApiStore.api.authorization.authorizationResetPasswordUpdate(
        variant === 'byemail' ? { email: values.email } : { username: values.username },
      );
      setRequestStatus('succsess');
      setMessage(`На ${res.data.email} выслано письмо с инструкциями для смены пароля`);
    } catch (err) {
      setRequestStatus('error');
      setMessage(err?.response?.data?.detail || 'Что-то пошло не так');
    }
  };

  const handleRecoverByEmail = () => {
    setVariant('byemail');
    setActiveStep(activeStep + 1);
  };
  const handleRecoverById = () => {
    setVariant('byid');
    setActiveStep(activeStep + 1);
  };
  return (
    <Dialog open={true} maxWidth={'xs'} fullWidth={true}>
      <DialogTitle style={{ borderBottom: '1px solid #e5e5e5', marginBottom: '20px' }}>
        Восстановление пароля
      </DialogTitle>
      <DialogContent>
        <AuthFormStack>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {requestStatus === 'error' && <Alert severity="error">{message}</Alert>}
          {requestStatus === 'loading' && <CircularProgress />}
          {requestStatus === 'succsess' && <Alert severity="success">{message}</Alert>}

          {activeStep === 0 && (
            <>
              <Button variant="contained" fullWidth onClick={handleRecoverByEmail}>
                Восстановить по E-mail
              </Button>
              <Button variant="contained" fullWidth onClick={handleRecoverById}>
                Восстановить по ID
              </Button>
            </>
          )}
          {activeStep === 1 && (
            <>
              {variant === 'byid' && (
                <>
                  Введите ID учетной записи Greenway и мы пришлем ссылку для сброса пароля на связанный E-mail
                  <ValidatedInput
                    autoComplete="recovery section enter username"
                    isValid={(value) => !/^\d+$/.test(value)}
                    value={values.username}
                    setValue={(value) => setValues({ ...values, username: value })}
                    fullWidth
                    label={'GREENWAY ID'}
                  />
                </>
              )}
              {variant === 'byemail' && (
                <>
                  Введите электронную почту, которая использовалась для создания учетной записи, и мы пришлем ссылку для
                  сброса пароля
                  <ValidatedInput
                    autoComplete="recovery section enter email"
                    label="E-mail"
                    isValid={(value) => !/^\S+@\S+\.\S+$/.test(value)}
                    value={values.email}
                    setValue={(value) => setValues({ ...values, email: value })}
                    fullWidth
                  />
                </>
              )}

              <Button variant="contained" disabled={requestStatus === 'loading'} fullWidth onClick={sendLinkHandler}>
                Получить ссылку {(requestStatus === 'succsess' || requestStatus === 'error') && <>еще раз</>}
              </Button>

              <Button variant="contained" fullWidth onClick={() => setActiveStep(activeStep - 1)}>
                Назад
              </Button>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography>Введите новый пароль</Typography>
              <PasswordInput
                value={recoveryValues.password}
                isValid={(value) => !(value.length > 6)}
                setValue={(value) => setRecoveryValues({ ...recoveryValues, password: value })}
                autoComplete="recovery section enter password"
                label="Пароль"
                fullWidth
              />

              <PasswordInput
                value={recoveryValues.repeat_password}
                isValid={(value) => !(recoveryValues.password === value && value.length > 6)}
                setValue={(value) => setRecoveryValues({ ...recoveryValues, repeat_password: value })}
                autoComplete="recovery section repeat password"
                label="Повторите пароль"
                fullWidth
              />

              <Button
                variant="contained"
                fullWidth
                onClick={savePasswordHandler}
                disabled={requestStatus === 'succsess' || requestStatus === 'error'}
              >
                Сохранить
              </Button>
            </>
          )}

          <Link component={RouterLink} to="/">
            Вернуться на сайт
          </Link>
        </AuthFormStack>
      </DialogContent>
    </Dialog>
  );
});
