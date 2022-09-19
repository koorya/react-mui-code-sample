import { action, makeObservable, observable } from "mobx";
import { Category } from "./api/__generated__";

export class CategoryStore {
  category: Category = null;

  constructor() {
    makeObservable(this, {
      category: observable,
      setCategory: action.bound,
    });
  }

  setCategory(category: Category | null) {
    this.category = category;
  }
}
