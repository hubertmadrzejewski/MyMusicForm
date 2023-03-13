import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Input, PhotoDialog} from './src/components';
import {Picture} from './assets';

const App = () => {
  const surnameInputRef = React.useRef<TextInput>(null);
  const identificationNumberInputRef = React.useRef<TextInput>(null);

  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [isCompany, setIsCompany] = React.useState<boolean>(false);
  const [identificationNumber, setIdentificationNumber] =
    React.useState<string>('');
  const [picturePickerVisible, setPicturePickerVisible] =
    React.useState<boolean>(false);
  const [pictureUri, setPictureUri] = React.useState<string | undefined | null>(
    null,
  );
  const [pictureType, setPictureType] = React.useState<
    string | undefined | null
  >(null);
  const [pictureFileName, setPictureFileName] = React.useState<
    string | undefined | null
  >(null);
  const [pictureAspectRatio, setPictureAspectRatio] = React.useState<
    number | undefined | null
  >(null);

  const validatePicture = () => {
    if (
      pictureFileName &&
      (pictureType === 'image/jpeg' || pictureType === 'image/jpg') &&
      pictureAspectRatio === 1
    ) {
      return true;
    }
    Alert.alert(
      'Form not submitted',
      'Image has to be .jpeg or .jpg and needs to be square',
    );
    return false;
  };

  const validateIdentificationNumber = () => {
    if (!isCompany) {
      if (identificationNumber.length !== 11) {
        Alert.alert(
          'Form not submitted',
          'Your identification numbers is wrong',
        );
        return false;
      }
      const numbers = identificationNumber
        .split('')
        .map(number => parseInt(number, 10));
      const controlSum =
        numbers[0] +
        3 * numbers[1] +
        7 * numbers[2] +
        9 * numbers[3] +
        numbers[4] +
        3 * numbers[5] +
        7 * numbers[6] +
        9 * numbers[7] +
        numbers[8] +
        3 * numbers[9] +
        numbers[10];
      if (controlSum % 10 !== 0) {
        Alert.alert(
          'Form not submitted',
          'Your identification numbers is wrong',
        );
        return false;
      }
      return true;
    }
    if (!identificationNumber || identificationNumber.length !== 10) {
      Alert.alert('Form not submitted', 'Your identification numbers is wrong');
      return false;
    }
    const numbers = identificationNumber
      .split('')
      .map(number => parseInt(number, 10));
    const controlSum =
      (numbers[0] * 6 +
        numbers[1] * 5 +
        numbers[2] * 7 +
        numbers[3] * 2 +
        numbers[4] * 3 +
        numbers[5] * 4 +
        numbers[6] * 5 +
        numbers[7] * 6 +
        numbers[8] * 7) %
      11;
    if (controlSum === numbers[9]) {
      return true;
    }
    Alert.alert('Form not submitted', 'Your identification numbers is wrong');
    return false;
  };

  const _submitForm = () => {
    if (name.length === 0 || surname.length === 0) {
      Alert.alert('Form not submitted', 'Please input your name and surname');
      return;
    }
    if (validatePicture()) {
      if (validateIdentificationNumber()) {
        const type = isCompany ? 'company' : 'person';
        fetch('https://localhost:60001/Contractor/Save', {
          method: 'POST',
          body: JSON.stringify({
            name,
            surname,
            type,
            identificationNumber,
            pictureUri,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            if (res.status === 404) {
              Alert.alert('Error', 'Nie znaleziono metody zapisu');
            }
          })
          .catch(err => console.log(err));
      }
    }
  };

  const showImage = () => {
    if (pictureUri) {
      return (
        <FastImage
          resizeMode="stretch"
          style={styles.image}
          source={{uri: pictureUri}}
        />
      );
    }
    return <Picture />;
  };

  const _handleSelectedPhoto = (
    photoUri: string | undefined,
    photoFileName: string | undefined,
    photoType: string | undefined,
    photoAspectRatio: number | null | undefined,
  ) => {
    setPictureFileName(photoFileName);
    setPictureUri(photoUri);
    setPictureType(photoType);
    setPictureAspectRatio(photoAspectRatio);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PhotoDialog
        picturePickerVisible={picturePickerVisible}
        setPicturePickerVisible={setPicturePickerVisible}
        onSelectedPhoto={_handleSelectedPhoto}
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={50}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.headerText}>{'Form'}</Text>
          <TouchableOpacity
            style={styles.pictureButton}
            onPress={() => setPicturePickerVisible(true)}>
            {showImage()}
          </TouchableOpacity>
          <Input
            style={styles.input}
            placeholderText={name ? name : 'Name'}
            value={name}
            OnChangeText={text => {
              setName(text);
            }}
            autoCapitalize="words"
            autoComplete="name-given"
            keyboardType="default"
            onSubmitEditing={() => {
              surnameInputRef.current?.focus();
            }}
          />
          <Input
            ref={surnameInputRef}
            style={styles.input}
            placeholderText="Surname"
            value={surname}
            OnChangeText={text => {
              setSurname(text);
            }}
            autoComplete="name-family"
            onSubmitEditing={() => {
              identificationNumberInputRef.current?.focus();
            }}
          />
          <View style={styles.switchContainer}>
            <Switch value={isCompany} onValueChange={setIsCompany} />
            <Text style={styles.text}>{'Company'}</Text>
          </View>
          <Input
            ref={identificationNumberInputRef}
            style={styles.input}
            placeholderText={isCompany ? 'VAT' : 'PESEL'}
            value={identificationNumber}
            OnChangeText={text => {
              setIdentificationNumber(text);
            }}
          />
          <TouchableOpacity style={styles.submitButton} onPress={_submitForm}>
            <Text style={styles.buttonText}>{'Submit'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardContainer: {
    marginHorizontal: 25,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: 32,
    color: 'black',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  pictureButton: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    height: 60,
    width: 120,
    alignSelf: 'center',
    backgroundColor: '#dddddd',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default App;
