import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { CalendarTab, CalendarTabsList } from './Calendar.styled';
import { observer } from 'mobx-react-lite';
import { useStores } from 'store';

const allEventTypeSintetic = { name: 'Все мероприятия', backgroundcss: '#D02A79', pk: -1 };

export const CalendarFilterTabs = observer(
  ({ eventTypePk, setEventType }: { eventTypePk: number; setEventType: (newValue: number) => void }) => {
    const {
      UtilsStore: { calendarEventTypes },
    } = useStores();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setEventType(newValue);
    };
    return (
      <TabsUnstyled value={eventTypePk} onChange={handleChange}>
        <CalendarTabsList>
          {[allEventTypeSintetic, ...calendarEventTypes].map(({ name, backgroundcss, pk }) => (
            <CalendarTab key={'tab' + name} value={pk} color={backgroundcss}>
              {name}
            </CalendarTab>
          ))}
        </CalendarTabsList>
      </TabsUnstyled>
    );
  },
);
