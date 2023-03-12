import {Alert, Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkCameraPermission = (onSuccess: () => void) => {
  if (Platform.OS === 'ios') {
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert('Error', 'Access unavailable');
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          Alert.alert('Errors', 'Access denied');
          console.log(
            'The permission has not been requested / is denied but rerequestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          onSuccess();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          onSuccess();
          break;
        case RESULTS.BLOCKED:
          Alert.alert('Error', 'Access blocked');
          console.log('The permission is denied and not rerequestable anymore');
          break;
      }
    });
  }
  if (Platform.OS === 'android') {
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert('Error', 'Access unavailable');
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          Alert.alert('Errors', 'Access denied');
          console.log(
            'The permission has not been requested / is denied but rerequestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          onSuccess();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          onSuccess();
          break;
        case RESULTS.BLOCKED:
          Alert.alert('Error', 'Access blocked');
          console.log('The permission is denied and not rerequestable anymore');
          break;
      }
    });
  }
};

export const checkGalleryPermission = (onSuccess: () => void) => {
  if (Platform.OS === 'ios') {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert('Error', 'Access unavailable');
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          Alert.alert('Errors', 'Access denied');
          console.log(
            'The permission has not been requested / is denied but rerequestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          onSuccess();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          onSuccess();
          break;
        case RESULTS.BLOCKED:
          Alert.alert('Error', 'Access blocked');
          console.log('The permission is denied and not rerequestable anymore');
          break;
      }
    });
  }
  if (Platform.OS === 'android') {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert('Error', 'Access unavailable');
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          Alert.alert('Errors', 'Access denied');
          console.log(
            'The permission has not been requested / is denied but rerequestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          onSuccess();
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          onSuccess();
          break;
        case RESULTS.BLOCKED:
          Alert.alert('Error', 'Access blocked');
          console.log('The permission is denied and not rerequestable anymore');
          break;
      }
    });
  }
};
