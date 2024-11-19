import {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export const useCameraPermissions = () => {
  const [hasCamPermission, setHasCamPermission] = useState(false);

  const checkCamPermission = async () => {
    const getCheckPermissionPromise = async () => {
      let status = await check(PERMISSIONS.ANDROID.CAMERA)
      console.log("Cam permission:", status);
      return status === RESULTS.GRANTED;
    };

    return await getCheckPermissionPromise();
  };

  const requestCamPermission = async () => {
    const getRequestPermissionPromise = async () => {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ).then(status => {
        return status === PermissionsAndroid.RESULTS.GRANTED;
      });
    };

    return await getRequestPermissionPromise();
  };

  const camPermissions = useCallback(async () => {
    const granted = await checkCamPermission();
    if (!granted) {
      const permissionResult = await requestCamPermission();
      setHasCamPermission(permissionResult);
    } else {
      setHasCamPermission(granted);
    }
  }, []);

  const updateCamPermissions = useCallback(async () => {
    const granted = await checkCamPermission();
    setHasCamPermission(granted);
  }, []);

  //   useEffect(() => {
  //     checkPermissions();
  //   }, [checkPermissions]);

  return {
    checkCamPermission,
    hasCamPermission,
    refreshCamPermissions: camPermissions,
    updateCamPermissions,
  };
};
