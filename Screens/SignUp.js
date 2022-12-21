import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Style from '../Screens/Styles';
import SMinput from '../Components/SMinput';
import database from '@react-native-firebase/database';

export default function SignUp({navigation}) {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [model, setModel] = useState();
  let signUpUser = () => {
    setLoading(true);
    if (model.email && model.password) {
      auth()
        .createUserWithEmailAndPassword(model.email, model.password)
        .then(res => {
          database()
            .ref(`User/${res.user.uid}`)
            .set(model)
            .then(() => {
              navigation.navigate('Login', res.user.uid);
              setLoading(false);
            })
            .catch(err => {
              setLoading(false);
              ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT);
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setLoading(false);
      Alert.alert('validation', 'Enter Text Here...', [
        {
          text: 'okay',
          onPress: () => {
            console.log('On Press');
          },
        },
      ]);
    }
    setUserName('');
    setEmail('');
    setPassword('');
  };
  return (
    <View style={[Style.h100, Style.flexCenter, Style.bgThemeLight, Style.p1]}>
      <Text style={[Style.fs1, Style.textBlack, Style.mb1, Style.textBold]}>
        SignUp
      </Text>
      <View style={[Style.w100, Style.p1]}>
        <SMinput
          value={username}
          onChangeText={e => {
            setUserName(e);
            setModel({...model, UserName: e});
          }}
          lable="User Name"
        />
      </View>

      <View style={[Style.w100, Style.p1]}>
        <SMinput
          value={email}
          onChangeText={e => {
            setEmail(e);
            setModel({...model, email: e});
          }}
          lable="email"
        />
      </View>
      <View style={[Style.w100, Style.p1]}>
        <SMinput
          value={password}
          secureTextEntry={true}
          onChangeText={e => {
            setPassword(e);
            setModel({...model, password: e});
          }}
          maxLength={8}
          lable="Password"
        />
      </View>

      <View style={[Style.w100, Style.mb5, Style.p1]}>
        <TouchableOpacity style={[Style.btn, Style.mt1]} onPress={signUpUser}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              size="large"
              style={[Style.textWhite, Style.textCenter, Style.textBold]}>
              Create User
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={[Style.flexRow]}>
        <Text>Already have an Account.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{color: '#333', marginHorizontal: 5, fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
