import { action, computed, makeObservable, observable, flow } from 'mobx';

import { TOKEN_KEY, API_BASE_URL } from 'common/const';
import { Api, RegistrationForm, TokenObtainPair, TokenRefresh } from './__generated__';

export class ApiStore {
  token: TokenRefresh | null;
  isFetching: boolean;

  constructor() {
    makeObservable(this, {
      isFetching: observable,
      token: observable,
      authorizationHeader: computed,
      api: computed,
      isAuth: computed,
      setToken: action,
      logOut: action.bound,
      readTokenFromLocalstorage: action,
      logIn: action.bound,
      register: action.bound,
    });
    this.token = null;
    this.readTokenFromLocalstorage();
    this.isFetching = false;
  }

  readTokenFromLocalstorage() {
    const localstorageTokenPair = localStorage.getItem(TOKEN_KEY);

    try {
      if (localstorageTokenPair != null) {
        this.token = JSON.parse(localstorageTokenPair);
      } else {
        throw new Error('localstorage token pair is empty');
      }
    } catch (e) {
      this.token = null;
    }
  }

  get authorizationHeader() {
    if (this.token != null) {
      const header = {
        Authorization: `Bearer ${this.token?.access}`,
      };

      return header;
    } else {
      return {};
    }
  }
  get api() {
    return new Api({
      baseURL: API_BASE_URL,
      headers: this.authorizationHeader,
    });
  }
  setToken(token: TokenRefresh) {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  async logIn(form: TokenObtainPair) {
    this.isFetching = true;
    try {
      const res = await this.api.authorization
        .authorizationTokenCreate(form);
      this.setToken(res.data)
    } catch (res) {
      throw res?.response?.data?.detail || 'Что-то пошло не так';
    }
    this.isFetching = false;

  }

  async register(form: RegistrationForm) {

    try {
      const res = await this.api.authorization.authorizationRegistrationCreate(form)
      return res;
    } catch (res) {
      throw res?.response?.data?.detail || 'Что-то пошло не так';
    }

  }

  logOut() {
    this.token = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  get isAuth() {
    return !!this.token && !this.isFetching;
  }
}
