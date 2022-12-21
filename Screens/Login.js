import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Style from '../Screens/Styles';
import SMinput from '../Components/SMinput';

export default function Login({navigation}) {
  const [model, setModel] = useState();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let LoginUser = () => {
    if (model.email && model.password) {
      setLoader(true);
      auth()
        .signInWithEmailAndPassword(model.email, model.password)
        .then(res => {
          let OP = res.user.uid;
          navigation.navigate('Home', OP);
          setLoader(false);
        })
        .catch(err => {
          ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT);
          setLoader(false);
          console.log(err);
        });
    } else {
      setLoader(false);
      Alert.alert('validation', 'Enter Text Here...', [
        {
          text: 'okay',
          onPress: () => {
            console.log('On Press');
          },
        },
      ]);
    }
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <View
        style={[Style.h100, Style.flexCenter, Style.bgThemeLight, Style.p1]}>
        <Text style={[Style.fs1, Style.textBlack, Style.mb1, Style.textBold]}>
          Login
        </Text>
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
            maxLength={8}
            onChangeText={e => {
              setPassword(e);
              setModel({...model, password: e});
            }}
            lable="Password"
          />
        </View>
        <View style={[Style.w100, Style.mb5, Style.p1]}>
          <TouchableOpacity style={[Style.btn, Style.mt1]} onPress={LoginUser}>
            {loader ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={[Style.textWhite, Style.textCenter, Style.textBold]}>
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={[Style.flexRow]}>
          <Text>Are You New? Please</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{color: '#333', marginHorizontal: 5, fontWeight: 'bold'}}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
