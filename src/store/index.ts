import { VITE_AUDIO_URL } from "common/const";
import { createContext, useContext } from "react";
import { AlertStore } from "./alertStore";
import { ApiStore } from "./api";
import { AudioPlayer } from "./audio";
import { CategoryStore } from "./category";
import { CounterStore } from "./counter";
import { LinksStore } from "./linksStore";
import { UserStore } from "./user";
import { UtilsStore } from "./utilsStore";

const createStore = () => {
  const counterStore = new CounterStore();

  const apiStore = new ApiStore();

  const userStore = new UserStore(apiStore);

  const utilsStore = new UtilsStore(apiStore, userStore);

  const categoryStore = new CategoryStore();

  const alertStore = new AlertStore();
  const audioPlayer = new AudioPlayer(VITE_AUDIO_URL);

  const linksStore = new LinksStore(utilsStore);

  return {
    CounterStore: counterStore,
    ApiStore: apiStore,
    UserStore: userStore,
    UtilsStore: utilsStore,
    CategoryStore: categoryStore,
    AlertStore: alertStore,
    AudioPlayer: audioPlayer,
    LinksStore: linksStore,
  };
};

export type RootStore = ReturnType<typeof createStore>;

export const StoresContext = createContext<RootStore | null>(null);

export const stores = createStore();

export const useStores = (): RootStore => {
  const stores = useContext(StoresContext);

  if (!stores) {
    throw new Error(
      "useStores() следует использовать внутри <StoresContext.provider />"
    );
  }

  return stores;
};
