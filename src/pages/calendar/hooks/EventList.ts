import moment from "moment";
import { useEffect, useState } from "react";
import { stores } from "store";
import { CalendarEvent } from "store/api/__generated__";
import { ExtendedEventType } from "../utils/EventTypes";


export const useEventList = () => {

	const {
		ApiStore: { api, isAuth },
	} = stores;

	const [eventList, setEventList] = useState<ExtendedEventType[]>([]);

	const [originEventList, setOriginEventList] = useState<CalendarEvent[]>([]);
	const updateEvents = () => {
		new Promise(async (resolve, reject) => {
			if (!isAuth) {
				setEventList([]);
				return;
			}
			try {
				const eventList = (await api.calendarEvents.calendarEventsList())
					.data
					.sort((a, b) => moment(b.start_date).unix() - moment(a.start_date).unix());

				setOriginEventList(eventList);
				const extendedEvents = eventList.map(event => ({
					...event,
					date: new Date(event.start_date),
				}))
				setEventList(extendedEvents);
			} catch (e) {
				console.log(e)
				console.log(e.response.data.detail);
			}
		});
	}
	useEffect(updateEvents, [api, isAuth]);
	return { extendedEvents: eventList, eventList: originEventList, updateEvents };
};