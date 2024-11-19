// nameSlice.js
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export type t_AdsRemote = {
  isOn: boolean;
  id: string;
};

export type t_AdsRemoteState = {
  ads_inter_splash: t_AdsRemote;
  ads_inter_splash_high: t_AdsRemote;
  ads_banner_splash: t_AdsRemote;
  ads_native_onboarding: t_AdsRemote;
  ads_native_language: t_AdsRemote;
  ads_native_language_high: t_AdsRemote;
  ads_native_language_dup: t_AdsRemote;
  ads_native_language_dup_high: t_AdsRemote;
  ads_app_open_resume: t_AdsRemote;
  ads_banner_home: t_AdsRemote;
  ads_banner_others: t_AdsRemote;
  ads_native_onboarding_full_screen: t_AdsRemote;
};

// Define a type for the slice state
interface AdsRemoteState {
  value: t_AdsRemoteState;
}

// Define the initial state using that type
const initialState: AdsRemoteState = {
  value: {
    ads_inter_splash: {isOn: false, id: ''},
    ads_inter_splash_high: {isOn: false, id: ''},
    ads_banner_splash: {isOn: false, id: ''},
    ads_native_onboarding: {isOn: false, id: ''},
    ads_native_language: {isOn: false, id: ''},
    ads_native_language_high: {isOn: false, id: ''},
    ads_native_language_dup: {isOn: false, id: ''},
    ads_native_language_dup_high: {isOn: false, id: ''},
    ads_app_open_resume: {isOn: false, id: ''},
    ads_banner_home: {isOn: false, id: ''},
    ads_banner_others: {isOn: false, id: ''},
    ads_native_onboarding_full_screen: {isOn: false, id: ''},
  },
};

export const adsRemoteSlice = createSlice({
  name: 'adsRemote',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStateAdsRemote: (state, action: PayloadAction<t_AdsRemoteState>) => {
      state.value = {...action.payload};
    },
  },
});

export const {setStateAdsRemote} = adsRemoteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const stateAdsRemote = (state: RootState) => state.adsRemoteSlice.value;

export default adsRemoteSlice.reducer;
