import {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const useCameraRollPermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkAndroidPermission = async () => {
    const getCheckPermissionPromise = async () => {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    };

    return await getCheckPermissionPromise();
  };

  const requestAndroidPermission = async () => {
    const getRequestPermissionPromise = async () => {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => {
        return status === PermissionsAndroid.RESULTS.GRANTED;
      });
    };

    return await getRequestPermissionPromise();
  };

  const checkPermissions = useCallback(async () => {
    const granted = await checkAndroidPermission();
    if (!granted) {
      const permissionResult = await requestAndroidPermission();
      console.log('is granted', permissionResult);
      setHasPermission(permissionResult);
    } else {
      setHasPermission(granted);
    }
  }, []);

  const updatePermissions = useCallback(async () => {
    const granted = await checkAndroidPermission();
    setHasPermission(granted);
  }, []);

  //   useEffect(() => {
  //     checkPermissions();
  //   }, [checkPermissions]);

  return {
    hasPermission,
    CameraRoll,
    refreshPermissions: checkPermissions,
    updatePermissions,
  };
};
