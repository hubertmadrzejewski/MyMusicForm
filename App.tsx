/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
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
import {Picture} from './assets';

import {Input, PhotoDialog} from './src/components';

const App = () => {
  const surnameInputRef = React.useRef<TextInput>(null);

  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [isCompany, setIsCompany] = React.useState<boolean>(false);
  const [pictureUri, setPictureUri] = React.useState<string | undefined | null>(
    null,
  );
  const [pictureFileName, setPictureFileName] = React.useState<
    string | undefined | null
  >(null);
  const [picturePickerVisible, setPicturePickerVisible] =
    React.useState<boolean>(false);

  // const displayPhoto = () => {
  //   if (isCompany) {
  //     return <View style={{height: 50, width: 50, backgroundColor: 'grey'}} />;
  //   }
  //   return <View style={{height: 50, width: 50, backgroundColor: 'grey'}} />;
  // };

  const showImage = () => {
    if (pictureUri) {
      return <FastImage style={styles.image} source={{uri: pictureUri}} />;
    }
    return <Picture />;
  };

  const _handleSelectedPhoto = (
    photoUri: string | undefined,
    photoFileName: string | undefined,
  ) => {
    setPictureFileName(photoFileName);
    setPictureUri(photoUri);
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
          <Text style={styles.headerText}>Form</Text>
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
          />
          <View style={styles.switchContainer}>
            <Switch value={isCompany} onValueChange={setIsCompany} />
            <Text style={styles.text}>Company</Text>
          </View>
          <Input
            style={styles.input}
            placeholderText={isCompany ? 'VAT' : 'PESEL'}
            value={surname}
            OnChangeText={text => {
              setSurname(text);
            }}
          />
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
  },
  image: {
    width: 86,
    height: 86,
    borderRadius: 20,
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
});

export default App;
