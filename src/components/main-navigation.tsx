import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import Babies from '../screens/babies';
import AddBaby from '../screens/addBaby';
import AddAppointment from '../screens/addAppointment';
import Appointments from '../screens/appointments';
import Vaccines from '../screens/vaccines';
import Preferences from '../screens/preferences';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Babies"
          component={Babies}
        />
        <Stack.Screen
          name="AddBaby"
          component={AddBaby}
        />
        <Stack.Screen
          name="AddAppointment"
          component={AddAppointment}
        />
        <Stack.Screen
          name="Appointments"
          component={Appointments}
        />
        <Stack.Screen
          name="Vaccines"
          component={Vaccines}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
