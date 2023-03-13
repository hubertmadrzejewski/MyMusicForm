import React from 'react';
import {View, Platform, TextInput, StyleSheet} from 'react-native';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native/types';

type Props = {
  value: string;
  placeholderText: string;
  style?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoComplete?:
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'gender'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined;
  numberOfLines?: number;
  OnChangeText?: (text: string) => void;
};

const Input = React.forwardRef<TextInput, Props>(
  (
    {
      value,
      placeholderText,
      style,
      keyboardType,
      textContentType,
      autoCapitalize,
      autoComplete,
      numberOfLines,
      OnChangeText,
      onSubmitEditing,
    }: Props,
    ref?: React.ForwardedRef<TextInput>,
  ) => {
    return (
      <View style={[styles.wrapper, style]}>
        <View style={styles.inputContainer}>
          <TextInput
            value={value}
            ref={ref}
            style={styles.input}
            numberOfLines={numberOfLines}
            placeholder={placeholderText}
            placeholderTextColor={'#dddddd'}
            onChangeText={text => {
              if (OnChangeText) {
                OnChangeText(text);
              }
            }}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            textContentType={textContentType}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: 60,
    flex: 1,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    borderRadius: 10,
    height: 60,
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: 'black',
    minHeight: 58,
    ...(Platform.OS === 'android' && {
      marginTop: 5,
    }),
  },
});

export default Input;
