import {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import SMbutton from '../Components/SMbutton';
import Styles from './Styles';
import database from '@react-native-firebase/database';

function TodoApp({navigation, route}) {
  let [userId, setUserId] = useState(route.params);
  const [loader, setLoader] = useState(false);

  let [model, setModel] = useState();
  let [patientName, setPatientName] = useState('');
  let [appointmentDate, setAppointmentDate] = useState('');
  let [appointmentTime, setAppointmentTime] = useState('');
  let [disease, setDisease] = useState('');

  const AddPatient = () => {
    setLoader(true);
    if (model) {
      model.id = database().ref(`Patients/${userId}/`).push().key;

      database()
        .ref(`Patients/${userId}/${model.id}`)
        .set(model)
        .then(() => {
          setLoader(false);
          ToastAndroid.show(
            'Patient Created Succesfully  ',
            ToastAndroid.SHORT,
          );
        })
        .catch(err => {
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

    setAppointmentDate('');
    setAppointmentTime('');
    setDisease('');
    setPatientName('');
  };

  return (
    <>
      <View style={[Styles.bgThemeLight, Styles.h100]}>
        <View style={[Styles.bgPrimary, Styles.p1]}>
          <Text style={style.font}>Add Patient</Text>
        </View>

        <View style={[Styles.flexCenter, Styles.py1, Styles.mt4]}>
          <View style={[style.container, Styles.w100]}>
            <TextInput
              style={Styles.input}
              value={patientName}
              placeholder="Patient Name"
              onChangeText={e => {
                setPatientName(e);
                setModel({...model, patientName: e});
              }}
            />
          </View>
          <View style={[style.container, Styles.w100]}>
            <TextInput
              style={Styles.input}
              value={appointmentDate}
              placeholder="Appointment Date"
              onChangeText={e => {
                setAppointmentDate(e);
                setModel({...model, appointmentDate: e});
              }}
            />
          </View>
          <View style={[style.container, Styles.w100]}>
            <TextInput
              style={Styles.input}
              value={appointmentTime}
              placeholder="Appointment Time"
              onChangeText={e => {
                setAppointmentTime(e);
                setModel({...model, appointmentTime: e});
              }}
            />
          </View>
          <View style={[style.container, Styles.w100]}>
            <TextInput
              style={Styles.input}
              value={disease}
              placeholder="Patient Disease"
              onChangeText={e => {
                setDisease(e);
                setModel({...model, disease: e});
              }}
            />
          </View>

          <View style={[Styles.w50, Styles.py1]}>
            <SMbutton
              isloading={loader}
              onPress={AddPatient}
              lable="Add Patient"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PatientsDetail', userId)}>
            <Text
              style={{color: '#333', marginVertical: 15, fontWeight: 'bold'}}>
              Show Saved Patients
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  Header: {
    width: '100%',
    backgroundColor: '#6495ED',
    padding: 20,
  },
  font: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  container: {
    padding: 10,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#6495ED',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    color: 'white',
    borderRadius: 8,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.45,
    shadowRadius: 11.3,

    elevation: 13,
  },
  card: {
    backgroundColor: '#6495ED',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  Btn: {
    padding: 30,
    borderRadius: 12,
  },
});
export default TodoApp;
