import React, {useLayoutEffect, useEffect, useState} from 'react';
import moment from 'moment';
import {View, ScrollView} from 'react-native';
import {useTheme, IconButton, Text, Button} from 'react-native-paper';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeAppointments} from '../store/appointments';
import {initializeBabies} from '../store/babies';
import {BabyObj} from '../store/babies/babies.models';

import Welcome from '../components/welcome';
import BabyGrowthCharts from '../components/baby-growth-charts';
import {ContainerStyles, TextStyles} from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );
  const hasAppointments = Object.entries(appointments).length > 0;
  const [baby, setBaby] = useState<BabyObj>();

  const formatData = data => {
    const entries = Object.values(data); // Convert object to array
    const sortedEntries = entries.sort((a, b) => a.age - b.age); // Sort by age

    return {
      ages: sortedEntries.map(entry => entry.age),
      lengths: sortedEntries.map(entry => entry.length),
      weights: sortedEntries.map(entry => entry.weight),
    };
  };

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
      {Object.entries(babies).length == 0 ? (
        <Welcome navigation={navigation} />
      ) : (
        <ScrollView>
          <View style={ContainerStyles.homeContainer}>
            <Text
              variant="titleLarge"
              style={[TextStyles.homeTitle, {color: colors.primary}]}>
              {baby?.name}
            </Text>
            <Text
              variant="bodyMedium"
              style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
              {moment(baby?.birth).format('dddd, MMMM Do YYYY, H:mm')}
            </Text>
            {hasAppointments ? (
              <>
                <Text
                  variant="titleLarge"
                  style={[TextStyles.homeTitle, {color: colors.primary}]}>
                  Growth graph
                </Text>
                <Text
                  style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
                  <BabyGrowthCharts
                    data={formatData(appointments)}
                    navigation={navigation}
                  />
                </Text>
              </>
            ) : (
              <>
                <Text variant="titleSmall">
                  You need to add an appointment to see the growth graph
                </Text>
                <Button onPress={() => navigation.navigate('AddAppointment')}>
                  Add Appointment
                </Button>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
