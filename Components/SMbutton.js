import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Styles from '../Screens/Styles';

const SMbutton = props => {
  const {lable, onPress, isloading, customStyle} = props;
  return (
    <>
      <TouchableOpacity onPress={onPress} style={[Styles.btn, customStyle]}>
        {isloading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text
            style={[
              Styles.textCenter,
              Styles.textWhite,
              Styles.textBold,
              Styles.fs5,
            ]}>
            {lable}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

export default SMbutton;
