import react, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ToastAndroid,
} from 'react-native';
import SMbutton from '../Components/SMbutton';
import Styles from './Styles';
import database from '@react-native-firebase/database';

function Patient({navigation, route}) {
  // States for Patient's Data
  let [model, setModel] = useState({});
  let [patientName, setPatientName] = useState('');
  let [appointmentDate, setAppointmentDate] = useState('');
  let [appointmentTime, setAppointmentTime] = useState('');
  let [disease, setDisease] = useState('');
  let [userId, setUserId] = useState('');

  let [index, setIndex] = useState();

  useEffect(() => {
    const data = route.params;
    setModel({
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      disease: data.disease,
      id: data.id,
      patientName: data.patientName,
    });
    setPatientName(data.patientName);
    setAppointmentDate(data.appointmentDate);
    setAppointmentTime(data.appointmentTime);
    setDisease(data.disease);
    setUserId(data.userId);
  }, []);

  const AddPatient = () => {
    database()
      .ref(`Patients/${route.params.doctorId}/${route.params.id}`)
      .set(model)
      .then(() => {
        // ToastAndroid.show('Booking Created'), ToastAndroid.SHORT;
        // setLoader(false);
      })
      .catch(err => {
        console.log(err);
      });

    setAppointmentDate('');
    setAppointmentTime('');
    setDisease('');
    setPatientName('');
  };

  const deletePatient = () => {
    database()
      .ref(`Patients/${route.params.doctorId}/${route.params.id}`)
      .remove();
  };

  return (
    <>
      <View style={[Styles.bgThemeLight, Styles.h100]}>
        <View style={[Styles.bgPrimary, Styles.p1]}>
          <Text style={style.font}>Edit Patient</Text>
        </View>

        <View style={[Styles.flexCenter, Styles.py1]}>
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
          <View style={[Styles.p2]}>
            <View style={[Styles.w100, Styles.flexRow]}>
              <SMbutton
                customStyle={Styles.me2}
                onPress={AddPatient}
                lable="Update"
              />
              <SMbutton lable="Delete" onPress={deletePatient} />
            </View>
          </View>
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
export default Patient;
