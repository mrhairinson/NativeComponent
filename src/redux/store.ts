// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import nameSlice from './slices/nameSlice';
import langSlice from './slices/langSlice';
import adsOpenSlice from './slices/adsOpenSlice';
import adsRemoteSlice from './slices/remoteAdsSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    name: nameSlice,
    lang: langSlice,
    adsOpenSlice: adsOpenSlice,
    adsRemoteSlice:adsRemoteSlice
  },
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']