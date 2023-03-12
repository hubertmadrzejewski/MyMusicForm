import React, {Dispatch, SetStateAction} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker/lib/typescript/types';
import * as ImagePicker from 'react-native-image-picker';
import {
  checkCameraPermission,
  checkGalleryPermission,
} from '../utils/permissionUtils';

type Props = {
  picturePickerVisible: boolean;
  setPicturePickerVisible: Dispatch<SetStateAction<boolean>>;
  onSelectedPhoto: (
    photoUri: string | undefined,
    photoFileName: string | undefined,
  ) => void;
};

const PhotoDialog: React.FC<Props> = ({
  picturePickerVisible,
  setPicturePickerVisible,
  onSelectedPhoto,
}) => {
  const [picture, setPicture] = React.useState<ImagePickerResponse | null>(
    null,
  );

  const _handleCloseModal = () => {
    setPicturePickerVisible(false);
  };

  const _photoLibraryHandle = () => {
    const libraryAccess = () =>
      ImagePicker.launchImageLibrary({mediaType: 'photo'}, setPicture);
    checkGalleryPermission(libraryAccess);
  };

  const _photoCameraHandle = () => {
    const cameraAccess = () => {
      ImagePicker.launchCamera(
        {mediaType: 'photo', cameraType: 'front'},
        setPicture,
      );
    };
    checkCameraPermission(cameraAccess);
  };

  const _loadPicture = () => {
    if (!picture) {
      return;
    }
    if (picture.assets && picture.assets[0] && picture.assets[0].uri) {
      onSelectedPhoto(picture.assets[0].uri, picture.assets[0].fileName);
      _handleCloseModal();
      return;
    }
  };

  React.useEffect(() => {
    _loadPicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  return (
    <Modal transparent visible={picturePickerVisible}>
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.fakeView} />
        </TouchableWithoutFeedback>
        <View style={styles.modalCard}>
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.titleText}>{'Photo'}</Text>
              <TouchableOpacity onPress={() => _photoCameraHandle()}>
                <Text style={styles.descriptionText}>{'Take a photo'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _photoLibraryHandle()}>
                <Text style={styles.descriptionText}>
                  {'Choose from library'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => _handleCloseModal()}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fakeView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalCard: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 92,
    borderRadius: 15,
  },
  closeButton: {
    position: 'absolute',
    padding: 24,
    right: 0,
  },

  wrapper: {
    padding: 35,
  },
  titleText: {
    fontSize: 17,
    color: 'black',
  },
  descriptionText: {
    fontSize: 15,
    color: 'black',
    marginTop: 20,
  },
});

export default PhotoDialog;
