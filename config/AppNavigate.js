// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Patient from '../Screens/Patient';
import PatientsDetail from '../Screens/PatientsDetail';

const Stack = createNativeStackNavigator();

function AppNavigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Patient"
          component={Patient}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PatientsDetail"
          component={PatientsDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigate;
