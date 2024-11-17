import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import ViewNote from '../screens/view';
import AddNote from '../screens/add';
import AddAppointment from '../screens/addAppointment';
import Appointments from '../screens/appointments';
import Vaccines from '../screens/vaccines';
import Preferences from '../screens/preferences';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Baby Track',
          }}
        />
        <Stack.Screen
          name="AddAppointment"
          component={AddAppointment}
          options={{title: 'New Appointment', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Appointments"
          component={Appointments}
          options={{title: 'Appointments', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Vaccines"
          component={Vaccines}
          options={{title: 'Vaccines', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNote}
          options={{title: 'New Note', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="ViewNote"
          component={ViewNote}
          options={{title: 'Note', headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{title: 'Preferences', headerBackTitleVisible: false}}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
