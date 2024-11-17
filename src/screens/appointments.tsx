import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTheme, FAB, ActivityIndicator, Text} from 'react-native-paper';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeAppointments} from '../store/appointments';

import ErrorMessage from '../components/error';
import List from '../components/list';
import {ContainerStyles, GlobalStyles} from '../styles';

const Appointments = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );
  const status = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.status,
  );

  useEffect(() => {
    dispatch(initializeAppointments());
  }, []);

  return (
    <View
      style={[
        ContainerStyles.globalContainer,
        {backgroundColor: colors.background},
      ]}>
      {!status ? (
        <ActivityIndicator
          size="large"
          style={ContainerStyles.welcomeContainer}
        />
      ) : null}
      {status === 'failed' ? (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Could not load the page'}
        />
      ) : null}
      {Object.entries(appointments).length == 0 ? (
        <Text>No appointments</Text>
      ) : (
        <>
          <List appointments={appointments} navigation={navigation} />
          <FAB
            icon="plus"
            style={GlobalStyles.fab}
            onPress={() => navigation.navigate('AddAppointment')}
          />
        </>
      )}
    </View>
  );
};

export default Appointments;
