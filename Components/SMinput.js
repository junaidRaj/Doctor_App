import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Styles from '../Screens/Styles';

const SMinput = props => {
  const {lable, onChangeText, disabled, value, secureTextEntry, maxLength} =
    props;
  return (
    <>
      <TextInput
        style={[Styles.input]}
        placeholder={lable}
        value={value}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        placeholderTextColor="black"
        onChangeText={onChangeText}
      />
    </>
  );
};

export default SMinput;
