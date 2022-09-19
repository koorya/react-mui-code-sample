import React from 'react';

import VkIcon from 'common/VkIcon';
import TelegramIcon from '@mui/icons-material/Telegram';

import { SocialIconsBlock } from '../MainLayout.styled';
import { Button, IconButton } from '@mui/material';

export const SocialIcons = () => (
  <SocialIconsBlock>
    <div>
      <IconButton size="small" component="a" href="https://t.me/zvezdy_team" sx={{ color: 'unset' }}>
        <TelegramIcon fontSize="small" />
      </IconButton>
      <Button
        size="small"
        component="a"
        href="https://vk.com/zvezdy_team"
        sx={{ color: 'unset' }}
        startIcon={<VkIcon fontSize="small" />}
      >
        ZVEZDY_TEAM
      </Button>
    </div>
    <div>
      <IconButton size="small" component="a" href="https://t.me/ecoschool_gw" sx={{ color: 'unset' }}>
        <TelegramIcon fontSize="small" />
      </IconButton>

      <Button
        size="small"
        component="a"
        href="https://vk.com/ecoschool_gw"
        sx={{ color: 'unset' }}
        startIcon={<VkIcon fontSize="small" />}
      >
        ECOSCHOOL_GW
      </Button>
    </div>
  </SocialIconsBlock>
);
