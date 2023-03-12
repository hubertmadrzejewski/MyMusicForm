import {Alert} from 'react-native';

export const alertErrorCode = (code: string, onYesPressed?: () => void) => {
  switch (code) {
    case 'AccesUnavailable':
      Alert.alert('Acces Unavailable');
      break;
  }
};
