import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  useTheme,
  FAB,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native-paper';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeAppointments} from '../store/appointments';
import {initializeBabies} from '../store/babies';

import ErrorMessage from '../components/error';
import ListAppointments from '../components/list-appointments';
import {ContainerStyles, GlobalStyles, TextStyles} from '../styles';

const Appointments = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const status = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.status,
  );

  useEffect(() => {
    dispatch(initializeAppointments());
    dispatch(initializeBabies());
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
          style={ContainerStyles.babyContainerEmpty}
        />
      ) : null}
      {status === 'failed' ? (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Could not load the page'}
        />
      ) : null}
      {Object.entries(appointments).length == 0 ? (
        <View style={[ContainerStyles.babyContainerEmpty]}>
          <Text
            variant="titleLarge"
            style={[TextStyles.babyTitleEmpty, {color: colors.primary}]}>
            No appointment yet
          </Text>
          <Text
            variant="titleMedium"
            style={[TextStyles.babyTitleEmpty, {color: colors.secondary}]}>
            You have to add an appointment to start tracking the growth and
            vaccine schedule.
          </Text>
          {Object.entries(babies).length == 0 ? (
            <>
              <Text variant="titleSmall" style={[{color: colors.tertiary}]}>
                Please add a baby first to add an appointment.
              </Text>
              <Button
                style={{marginTop: 20}}
                onPress={() => {
                  navigation.navigate('AddBaby');
                }}>
                Add Baby
              </Button>
            </>
          ) : (
            <Button
              style={{marginTop: 20}}
              onPress={() => {
                navigation.navigate('AddAppointment');
              }}>
              Add Appointment
            </Button>
          )}
        </View>
      ) : (
        <>
          <ListAppointments
            appointments={appointments}
            navigation={navigation}
          />
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
