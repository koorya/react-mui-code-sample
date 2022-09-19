import { CalendarEvent } from "store/api/__generated__";

export type ExtendedEventType = {
	date: Date;
} & CalendarEvent;


