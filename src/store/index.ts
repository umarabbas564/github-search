import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./users";
import RepoReducer from "./repos";

const persistUserConfig = {
  key: "user",
  storage,
};
const persistRepoConfig = {
  key: "repo",
  storage,
};

const userPersistedReducer = persistReducer(persistUserConfig, UserReducer);
const repoPersistedReducer = persistReducer(persistRepoConfig, RepoReducer);

const store = configureStore({
  reducer: {
    users: userPersistedReducer,
    repos: repoPersistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
