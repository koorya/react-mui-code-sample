import { action, makeObservable, observable } from "mobx";

export class CounterStore {
  count: number = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      setCount: action.bound,
    });
  }

  setCount(count: number) {
    this.count = count;
  }
}
