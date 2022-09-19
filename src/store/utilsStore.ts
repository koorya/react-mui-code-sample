import { action, computed, makeObservable, observable, observe, reaction } from "mobx";
import { ApiStore } from "./api";

import { CalendarEventType, Status, Step, User } from './api/__generated__'
import { UserStore } from "./user";

class UserRegalia {
  qualification: Status['name'] = "s1";
  nearestQualification: Status['name'] = "s1";
  rank: Step['name'] = "start";
  lo: User['pv'] = 0;
  firstLineParthners: number = 0;
  firstLineParthnersNewbies: number = 0;
}

export class UtilsStore {
  apiStore: ApiStore;

  statusList: Status[];
  stepList: Step[];
  userRegalia: UserRegalia;
  isFetching: boolean;
  userStore: UserStore;
  calendarEventTypes: CalendarEventType[];
  constructor(apiStore: ApiStore, userStore: UserStore) {
    makeObservable(this, {
      userRegalia: observable,
      calendarEventTypes: observable,
      isFetching: observable,
      updateData: action.bound,
    });
    this.userStore = userStore;
    this.isFetching = false;
    this.apiStore = apiStore;
    this.userRegalia = new UserRegalia();
    reaction(() => this.apiStore.isAuth, () => this.updateData());
    this.calendarEventTypes = [];
    this.updateData();
  }

  async updateData() {
    this.isFetching = true;
    if (this.apiStore.isAuth) {

      this.statusList = (await this.apiStore.api.status.statusList()).data;
      this.stepList = (await this.apiStore.api.step.stepList()).data;

      const firstLineParthners = (await this.apiStore.api.firstLine.firstLineRead()).data.length;
      const firstLineParthnersNewbies = (await this.apiStore.api.newFirstLine.newFirstLineRead()).data.length;

      const userData = (await this.apiStore.api.user.userRead()).data;
      const steps = userData.steps;

      const getRank = (stepList: Step[], steps: number[]) => {
        const last_step = steps.sort()[steps.length - 1] || 1;

        const sorted_by_seq = stepList.filter(item => item.type === 'rank')
          .sort((a, b) => b.sequence - a.sequence);

        const max_seq_index = sorted_by_seq.findIndex(item => item.sequence <= last_step);

        return sorted_by_seq[max_seq_index]?.name;
      }
      this.userRegalia = {
        qualification: this.statusList[userData.degree]?.name,
        nearestQualification: this.statusList[userData.degree != null ? userData.degree : 0]?.name,
        rank: getRank(this.stepList, steps),
        lo: userData?.pv,
        firstLineParthners,
        firstLineParthnersNewbies
      };

      this.calendarEventTypes = (await this.apiStore.api.calendarEvents.calendarEventsTypesList()).data;


      this.isFetching = false;
    }
  }

}
