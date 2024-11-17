import React, {useLayoutEffect, useEffect, useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useTheme, IconButton, Text} from 'react-native-paper';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeAppointments} from '../store/appointments';
import {initializeBabies} from '../store/babies';
import {BabyObj} from '../store/babies/babies.models';

import Welcome from '../components/welcome';
import {ContainerStyles, TextStyles} from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [baby, setBaby] = useState<BabyObj>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <IconButton
            icon="baby-face"
            iconColor={colors.primary}
            onPress={() => navigation.navigate('Babies')}
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
          <IconButton
            icon="cog"
            iconColor={colors.primary}
            onPress={() => navigation.navigate('Preferences')}
          />
        </>
      ),
    });
  }, [navigation, colors]);

  useEffect(() => {
    dispatch(initializeAppointments());
    dispatch(initializeBabies());
    if (Object.entries(babies).length > 0) {
      setBaby(Object.values(babies)[0]);
    }
  }, []);

  return (
    <View
      style={[
        ContainerStyles.globalContainer,
        {backgroundColor: colors.background},
      ]}>
      {Object.entries(babies).length == 0 && !baby ? (
        <Welcome navigation={navigation} />
      ) : (
        <View style={ContainerStyles.homeContainer}>
          <Text
            variant="titleLarge"
            style={[TextStyles.homeTitle, {color: colors.primary}]}>
            {baby?.name}
          </Text>
          <Text style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
            {moment(baby?.birth).format('dddd, MMMM Do YYYY')}
          </Text>
          <Text
            variant="titleMedium"
            style={[TextStyles.homeTitle, {color: colors.primary}]}>
            Growth graph
          </Text>
          <Text style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
            {/* TODO: Add growth graph */}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;
