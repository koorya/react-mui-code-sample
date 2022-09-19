import styled from "@emotion/styled";

import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

import { CalendarPicker, calendarPickerClasses } from '@mui/x-date-pickers';
import { Button } from "@mui/material";


export const CalendarTab = styled(TabUnstyled) <{ color: string; }>`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
	background: ${({ color }) => color};
	background-clip: padding-box;
  cursor: pointer;
  font-size: 0.875rem;
  /* font-weight: bold; */
  /* width: 100%; */
  padding: 10px 16px;
  margin: 6px 6px;
  border: 5px solid transparent;
	/* border: none; */
  border-radius: 10px;
  display: flex;
  justify-content: center;
	opacity: 0.5;


  &:hover {

		box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  }



  &.${tabUnstyledClasses.selected} {
		opacity: 1;
		box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
	}

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


export const CalendarTabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
	flex-wrap: wrap;
`;


export const BaseCalendarDayStyled = styled.div`
/* margin: auto; */
display: flex;
justify-content: center;
align-items: center;
width: 36px;
margin: 0px 2px;
height: 36px;
border-radius: 50%;

font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 400;
font-size: 0.75rem;
line-height: 1.66;
letter-spacing: 0.03333em;

`;

export const OutsideCalendarDayStyled = styled(BaseCalendarDayStyled)`
visibility: hidden;
`;

export const ActiveCalendarDayStyled = styled(Button) <{ event_background: string; }>`

background: ${({ event_background }) => event_background};
color: white;
cursor: pointer;

width: 36px;
margin: 0px 2px;
height: 36px;
border-radius: 50%;
padding: 0px;
min-width: 36px;
&:hover{
	background: ${({ event_background }) => event_background};
	filter: brightness(110%);
}

`;

export const StartActiveCalendarDay = styled(ActiveCalendarDayStyled)`
border-radius: 50%  0%  0% 50% ;
margin: 0px 0px 0px 2px;

min-width: 38px;

`;
export const MiddletActiveCalendarDay = styled(ActiveCalendarDayStyled)`
border-radius: 0% ;
margin: 0px;
min-width: 40px;
`;
export const FinishActiveCalendarDay = styled(ActiveCalendarDayStyled)`
border-radius: 0%  50%  50% 0% ;
margin: 0px 2px 0px 0px;

min-width: 38px;
`;



export const CalendarPickerStyled = styled(CalendarPicker)`
&.${calendarPickerClasses.root} > :nth-of-type(1){
	margin: auto;
}
& .PrivatePickersFadeTransitionGroup-root{
}
& .MuiPickersArrowSwitcher-root{
	display: none;
}
`;



