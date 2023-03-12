import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import {styles} from './FormScreen.styles';

const FormScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles().container}>
        <Text>FOrmSCreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default FormScreen;
