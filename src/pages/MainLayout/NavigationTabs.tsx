import React, { useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { AntTabs, MenuButtonTitle } from './MainLayout.styled';
import { Path } from 'routes/path';
import { Tab, TabsProps } from '@mui/material';

import { useStores } from 'store';
import ExitIcon from '@mui/icons-material/ExitToApp';
import { ProfileTabLabel } from './components/ProfileTabLabel';
import { observer } from 'mobx-react-lite';
import PlayerTab from './components/Player/Player';
import { TabTooltip } from './components/TabTooltip';
import { CalendarPanel } from '@pages/calendar/CalendarPanel';

import CreateIcon from '@mui/icons-material/Create';
import { TooltipList } from './components/TooltipList';
import { CollapsedLinksList } from './components/CollapsedLinksList';

export const NavigationTabs = observer(
  (props: { matchedLocation: string; isAuth: boolean; isMobile: boolean } & TabsProps) => {
    const {
      ApiStore: { logOut },
      UserStore: { canEdit },
      LinksStore: { editorLinks, learningLinks },
    } = useStores();

    const navigate = useNavigate();

    const { matchedLocation, isAuth, isMobile } = props;

    const [isMenuOpen, setIsMenuOpen] = useState({ one: false, two: false });

    return (
      <AntTabs value={matchedLocation} aria-label="basic tabs example" isMobile={isMobile}>
        {isAuth && (
          <Tab component={RouteLink} to={`/${Path.news}`} value={`/${Path.news}`} label={<div>Новости</div>} />
        )}
        <Tab
          component={RouteLink}
          to={`/${Path.autobonus}`}
          value={`/${Path.autobonus}`}
          label={<div>Автобонус</div>}
        />
        {isAuth &&
          (isMobile ? (
            CollapsedLinksList(<div>Обучение</div>, Path.studying, learningLinks, isMenuOpen.one, () =>
              setIsMenuOpen({ ...isMenuOpen, one: !isMenuOpen.one }),
            )
          ) : (
            // <>s</>
            <TabTooltip value={`/${Path.studying}`} title={'Обучение'}>
              <TooltipList prefix={Path.studying} items={learningLinks} />
            </TabTooltip>
          ))}
        {isAuth && !isMobile ? (
          <TabTooltip value={`/${Path.calendar}`} title={'Календарь'}>
            <CalendarPanel />
          </TabTooltip>
        ) : (
          ''
        )}

        {isAuth && isMobile && (
          <Tab
            component={RouteLink}
            to={`/${Path.calendar}`}
            value={`/${Path.calendar}`}
            label={<div>Календарь</div>}
          />
        )}
        {isAuth && (
          <Tab component={RouteLink} to={`/${Path.respect}`} value={`/${Path.respect}`} label={<div>Признание</div>} />
        )}

        <PlayerTab />
        <Tab sx={{ marginLeft: 'auto', minWidth: '0px', width: '0px', padding: '0px' }} />

        {isAuth &&
          canEdit &&
          (isMobile ? (
            CollapsedLinksList(
              <MenuButtonTitle>
                <CreateIcon />
                <span>Редактор</span>
              </MenuButtonTitle>,
              Path.editor,
              editorLinks,
              isMenuOpen.two,
              () => setIsMenuOpen({ ...isMenuOpen, two: !isMenuOpen.two }),
            )
          ) : (
            <TabTooltip value={`/${Path.editor}`} title={<CreateIcon />}>
              <TooltipList prefix={Path.editor} items={editorLinks} />
            </TabTooltip>
          ))}

        {isAuth && (
          <Tab component={RouteLink} to={`/${Path.profile}`} value={`/${Path.profile}`} label={<ProfileTabLabel />} />
        )}

        {isAuth && (
          <Tab
            onClick={() => {
              logOut();
              navigate(Path.default);
            }}
            label={
              <MenuButtonTitle>
                <ExitIcon />
                <span>Выйти</span>
              </MenuButtonTitle>
            }
          />
        )}
      </AntTabs>
    );
  },
);
