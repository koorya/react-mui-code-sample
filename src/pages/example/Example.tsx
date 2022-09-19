import logo from '../../assets/logo.svg';
import React from 'react';
import { AppButton, AppContainer, AppHeader, AppLink, AppLogo } from './Example.styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../store';

export const Example = observer(() => {
  const {
    CounterStore: { count, setCount },
    ApiStore,
  } = useStores();

  return (
    <AppContainer>
      <AppHeader>
        <pre>{ApiStore.token && JSON.stringify(ApiStore.token, null, 2)}</pre>
        <AppLogo src={logo} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <AppButton type="button" onClick={() => setCount(count + 1)}>
            count is: {count}
          </AppButton>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </AppLink>
          {' | '}
          <AppLink href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener noreferrer">
            Vite Docs
          </AppLink>
        </p>
      </AppHeader>
    </AppContainer>
  );
});
