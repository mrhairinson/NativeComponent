import {requireNativeComponent} from 'react-native';
type NativeType = {
    style:{}
}
export const MyViewManager =
  requireNativeComponent<NativeType>('MyViewManager');