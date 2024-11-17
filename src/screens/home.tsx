import React, {useLayoutEffect, useEffect} from 'react';
import {View} from 'react-native';
import {useTheme, IconButton, Text} from 'react-native-paper';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeAppointments} from '../store/appointments';

import Welcome from '../components/welcome';
import {ContainerStyles, TextStyles} from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <IconButton
            icon="cog"
            iconColor={colors.primary}
            onPress={() => navigation.navigate('Preferences')}
          />
          <IconButton
            icon="calendar-month"
            iconColor={colors.primary}
            onPress={() => navigation.navigate('Appointments')}
          />
          <IconButton
            icon="needle"
            iconColor={colors.primary}
            onPress={() => navigation.navigate('Vaccines')}
          />
        </>
      ),
    });
  }, [navigation, colors]);

  useEffect(() => {
    dispatch(initializeAppointments());
  }, []);

  return (
    <View
      style={[
        ContainerStyles.homeContainer,
        {backgroundColor: colors.background, paddingTop: 20},
      ]}>
      {Object.entries(appointments).length == 0 ? (
        <Welcome navigation={navigation} />
      ) : (
        <>
          <Text
            variant="titleLarge"
            style={[TextStyles.homeTitle, {color: colors.primary}]}>
            Next appointment
          </Text>
          <Text style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
            You have {Object.entries(appointments).length} appointments
          </Text>
          <Text
            variant="titleMedium"
            style={[TextStyles.homeTitle, {color: colors.primary}]}>
            Growth graph
          </Text>
          <Text style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
            {/* TODO: Add growth graph */}
          </Text>
        </>
      )}
    </View>
  );
};

export default Home;
