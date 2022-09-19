import { action, computed, makeObservable, observable, observe, reaction } from "mobx";
import { ApiStore } from "./api";

import { User } from './api/__generated__'

export class UserStore {
  userData: User;
  avatar: string;
  apiStore: ApiStore;
  _isLoading: boolean;
  constructor(apiStore: ApiStore) {
    makeObservable(this, {
      userData: observable,
      avatar: observable,
      updateUserData: action.bound,
      updateAvatar: action.bound,
      isAvatarEmpty: computed,
      isLoading: computed,
      canEdit: computed,
    });
    this.apiStore = apiStore;
    reaction(() => this.apiStore.api, () => this.updateUserData());
    this._isLoading = false;
    this.updateUserData();
  }

  async updateUserData() {
    this._isLoading = true;
    console.log('this._isLoading: ', this._isLoading);
    if (!this.apiStore.token) {

      this.userData = null;
      this.avatar = '';

    } else {
      const userData = (await this.apiStore.api.user.userRead()).data;
      this.userData = userData;
      this.avatar = (await this.apiStore.api.avatar.avatarRead()).data.base64_image;
    }
    this._isLoading = false;
    console.log('this._isLoading: ', this._isLoading);
  }

  async updateAvatar(new_avatar: string) {
    if (this.apiStore.token) {
      this.avatar = (await this.apiStore.api.avatar.avatarUpdate({ base64_image: new_avatar })).data.base64_image;
    }
  }
  get isAvatarEmpty() {
    return this.avatar && !(this.avatar === "");
  }
  get canEdit() {
    if (!this.userData) return false;
    return !!this.userData.groups.find(({ name }) => ['admin', 'editor'].includes(name));
  }
  get isLoading() {
    // return false;
    return this._isLoading;
  }
}
