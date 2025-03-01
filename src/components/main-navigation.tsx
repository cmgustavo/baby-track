import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import Babies from '../screens/babies';
import AddBaby from '../screens/addBaby';
import AddAppointment from '../screens/addAppointment';
import Appointments from '../screens/appointments';
import Vaccines from '../screens/vaccines';
import Preferences from '../screens/preferences';
import AddVaccineRegister from '../screens/addVaccineRegister.tsx';
import KitScreen from '../screens/kit.tsx';
import AddMedicine from '../screens/addMedicine.tsx';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Babies" component={Babies} />
        <Stack.Screen name="AddBaby" component={AddBaby} />
        <Stack.Screen name="AddAppointment" component={AddAppointment} />
        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="Vaccines" component={Vaccines} />
        <Stack.Screen
          name="AddVaccineRegister"
          component={AddVaccineRegister}
        />
        <Stack.Screen name="KitScreen" component={KitScreen} />
        <Stack.Screen name="AddMedicine" component={AddMedicine} />
        <Stack.Screen name="Preferences" component={Preferences} />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
