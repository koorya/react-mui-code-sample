import { Button, Dialog, DialogContent, DialogTitle, Fade, IconButton, Tab, Tabs, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserIcon from '@mui/icons-material/Person';

import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';
import { useStores } from 'store';
import { MenuButtonTitle, screenSize } from '@pages/MainLayout/MainLayout.styled';
import { useMediaQuery } from 'react-responsive';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const isActive = value === index;
  return (
    <Fade in={isActive} timeout={500}>
      <div
        role="tabpanel"
        hidden={!isActive}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {isActive && (
          <Box sx={{ py: 3 }}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    </Fade>
  );
}

export const AuthPopup = () => {
  const { ApiStore } = useStores();
  const isMounted = useDelayUnmount(!ApiStore.token, 100);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login_tab');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const closeDialogHandler = () => {
    setIsDialogOpen(false);
  };
  const openDialogHandler = () => {
    setIsDialogOpen(true);
  };

  const isMobile = useMediaQuery({ query: `(max-width: ${screenSize.tablet})` });
  if (isMounted)
    return (
      <>
        {!isMobile ? (
          <Button color="inherit" onClick={openDialogHandler} startIcon={<UserIcon />}>
            Вход
          </Button>
        ) : (
          <IconButton onClick={openDialogHandler}>
            <UserIcon />
          </IconButton>
        )}
        <Dialog
          open={isDialogOpen}
          onClose={closeDialogHandler}
          maxWidth={'xs'}
          fullWidth={true}
          PaperProps={{ style: { alignSelf: 'flex-start', marginTop: '10vh' } }}
        >
          <DialogTitle style={{ borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ display: 'flex' }}>
              <Tabs
                value={activeTab}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab value="login_tab" label="Вход" />
                <Tab value="signin_tab" label="Регистрация" />
              </Tabs>
              <IconButton style={{ marginLeft: 'auto' }} onClick={closeDialogHandler}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <TabPanel value={activeTab} index={'login_tab'}>
              <LoginForm loginHandler={closeDialogHandler} />
            </TabPanel>
            <TabPanel value={activeTab} index={'signin_tab'}>
              <RegistrationForm />
            </TabPanel>
          </DialogContent>
        </Dialog>
      </>
    );
  else return <></>;
};
