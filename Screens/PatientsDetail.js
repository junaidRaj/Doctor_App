import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Styles from './Styles';
import database from '@react-native-firebase/database';

export default function PatientsDetail({navigation, route}) {
  const [refresh, setRefresh] = useState(false);
  let [userId, setUserId] = useState(route.params);
  let [list, setList] = useState([]);
  let [text, setText] = useState('');

  useEffect(() => {
    setRefresh(true);
    database()
      .ref(`Patients/${userId}`)
      .once('value', dt => {
        if (dt.exists()) {
          setList(Object.values(dt.val()));
        } else {
          setText('No Patient Data');
        }
        setRefresh(false);
      });
  }, []);

  let refreshings = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };

  return (
    <View>
      <View style={{width: '100%', height: '100%'}}>
        <View style={[Styles.bgPrimary, Styles.p2]}>
          <Text style={[Styles.fs3, Styles.textCenter, Styles.textWhite]}>
            Patients Detail
          </Text>
        </View>

        {text ? (
          <View
            style={[
              Styles.justifyContentCenter,
              Styles.alignItemsCenter,
              Styles.h100,
            ]}>
            <Text style={[Styles.textBlack, Styles.fs3]}>{text}</Text>
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl onRefresh={refreshings} refreshing={refresh} />
            }>
            {list.map((x, i) => (
              <TouchableOpacity
                onPress={() => {
                  x.doctorId = userId;
                  navigation.navigate('Patient', x);
                }}
                style={[
                  Styles.p2,
                  {backgroundColor: 'lightgray'},
                  Styles.my1,
                  Styles.mx2,
                  Styles.rounded,
                  Styles.pb3,
                  Styles.shadow1,
                ]}
                key={i}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                    borderBottomColor: 'black',
                  }}>
                  Patient Name : {x.patientName}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                    borderBottomColor: 'black',
                  }}>
                  Date : {x.appointmentDate}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                    borderBottomColor: 'black',
                  }}>
                  Time : {x.appointmentTime}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                    borderBottomColor: 'black',
                  }}>
                  Disease : {x.disease}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
