declare module 'react-native-config' {
  export interface NativeConfig {
    ENV: string;
    ANDROID_NATIVE_ADV: string;
    ANDROID_NATIVE_VIDEO_ADV: string;
    IOS_NATIVE_ADV: string;
    IOS_NATIVE_VIDEO_ADV: string;
    API_KEY_GENAI: string;
    AI_MODEL: string;
    inter_splash: string;
    inter_splash_high: string;
    banner_splash: string;
    native_onboarding: string;
    native_language: string;
    native_language_high: string;
    native_language_dup: string;
    native_language_dup_high: string;
    app_open_resume: string;
    banner_home: string;
    banner_others: string;
    native_onboarding_full_screen: string
  }

  export const Config: NativeConfig;
  export default Config;
}
