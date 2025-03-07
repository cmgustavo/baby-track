import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View, ScrollView, Platform} from 'react-native';
import {
  useTheme,
  IconButton,
  Text,
  Button,
  Menu,
  Divider,
  Appbar,
} from 'react-native-paper';

import {useAppSelector, RootState} from '../store';
import {BabyObj} from '../store/babies/babies.models';

import Welcome from '../components/welcome';
import BabyGrowthCharts from '../components/baby-growth-charts';
import {ContainerStyles, TextStyles} from '../styles';
import {VaccineObj} from '../store/vaccines/vaccines.models.ts';
import {AppointmentObj} from '../store/appointments/appointments.models.ts';

const Home = ({navigation}) => {
  const {colors} = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const MAIN_MENU = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [baby, setBaby] = useState<BabyObj>(Object.values(babies)[0]);
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );
  const [hasAppointments, setHasAppointments] = useState<boolean>(false);

  const [lastAppointment, setLastAppointment] = useState<
    AppointmentObj | undefined
  >();
  const showLastAppointment = () => {
    const _latestAppointment = Object.values(appointments);
    if (_latestAppointment.length === 0) {
      return;
    }
    return _latestAppointment.reduce((a, b) => (a.date > b.date ? a : b));
  };

  const vaccines = useAppSelector(({VACCINES}: RootState) => VACCINES.vaccines);
  const babyVaccines = Object.entries(vaccines)
    .filter(([_, value]) => value.babyId === Object.keys(babies)[0])
    .map(([_, value]) => value);
  const getLatestVaccine = () => {
    if (babyVaccines.length === 0) {
      return;
    }
    return babyVaccines.reduce((a, b) => (a.date > b.date ? a : b));
  };
  const [latestVaccine, setLatestVaccine] = useState<VaccineObj | undefined>();

  const formatData = data => {
    const entries = Object.values(data); // Convert object to array
    const sortedEntries = entries.sort((a, b) => a.age - b.age); // Sort by age

    return {
      ages: sortedEntries.map(entry => entry.age),
      lengths: sortedEntries.map(entry => entry.length),
      weights: sortedEntries.map(entry => entry.weight),
    };
  };

  const goTo = (screen: string) => {
    setShowMenu(false);
    navigation.navigate(screen);
  };

  useEffect(() => {
    if (Object.entries(babies).length > 0) {
      setBaby(Object.values(babies)[0]);
      setHasAppointments(Object.keys(appointments).length > 0);
      setLatestVaccine(getLatestVaccine());
    }
  }, [babies, appointments, vaccines]);

  useEffect(() => {
    if (babyVaccines) {
      const _latestVaccine = getLatestVaccine();
      if (_latestVaccine) {
        setLatestVaccine(_latestVaccine);
      }
    }
  }, [babyVaccines]);

  useEffect(() => {
    if (appointments) {
      setHasAppointments(Object.keys(appointments).length > 0);
      const _lastAppointment = showLastAppointment();
      if (_lastAppointment) {
        setLastAppointment(_lastAppointment);
      }
    }
  }, [appointments]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Baby Track" />
        <Menu
          style={{marginTop: 55, minWidth: 250}}
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <IconButton icon={MAIN_MENU} onPress={() => setShowMenu(true)} />
          }>
          <Menu.Item
            leadingIcon={'baby-face'}
            onPress={() => goTo('Babies')}
            title="Babies"
          />
          <Menu.Item
            leadingIcon={'calendar-month'}
            onPress={() => goTo('Appointments')}
            title="Appointments"
          />
          <Menu.Item
            leadingIcon={'needle'}
            onPress={() => goTo('Vaccines')}
            title="Vaccines"
          />
          <Menu.Item
            leadingIcon={'medical-bag'}
            onPress={() => goTo('KitScreen')}
            title={'Medicine Kit'}
          />
          <Divider />
          <Menu.Item
            leadingIcon={'cog'}
            onPress={() => goTo('Preferences')}
            title="Preferences"
          />
        </Menu>
      </Appbar.Header>
      <View style={[ContainerStyles.globalContainer]}>
        {Object.entries(babies).length === 0 ? (
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
              {latestVaccine && (
                <View style={ContainerStyles.lastAppointmentContainer}>
                  <Text variant="titleMedium">Last vaccine</Text>
                  <Text style={{marginBottom: 10}} variant="bodyLarge">
                    {moment(latestVaccine.date).format('dddd, MMMM Do YYYY')}
                  </Text>
                  <Text variant="bodyMedium">{latestVaccine.name}</Text>
                  <Text variant="bodyMedium">
                    Dose: {latestVaccine.dosage.dose}
                  </Text>
                  <Text variant="bodyMedium">
                    Stage: {latestVaccine.dosage.stage}
                  </Text>
                  <Text variant="bodyMedium">
                    {latestVaccine.dosage.unique ? 'Unique' : 'Not unique'}
                  </Text>
                  <Text variant="bodyMedium">
                    {latestVaccine.dosage.booster ? 'Booster' : 'Not booster'}
                  </Text>
                </View>
              )}
              {hasAppointments && lastAppointment ? (
                <View>
                  <View style={ContainerStyles.lastAppointmentContainer}>
                    <Text variant="titleMedium">Last appointment</Text>
                    <Text style={{marginBottom: 10}} variant="bodyLarge">
                      {moment(lastAppointment.date).format(
                        'dddd, MMMM Do YYYY',
                      )}
                    </Text>
                    <Text variant="bodyMedium">
                      Age {lastAppointment.age} months
                    </Text>
                    <Text variant="bodyMedium">
                      Length: {lastAppointment.length} cm
                    </Text>
                    <Text variant="bodyMedium">
                      Weight: {lastAppointment.weight} Kg
                    </Text>
                    <Text variant="bodyMedium">
                      Head: {lastAppointment.head} cm
                    </Text>
                  </View>
                  <Text style={{marginBottom: 20}} variant="titleMedium">
                    Growth graph
                  </Text>
                  <BabyGrowthCharts
                    data={formatData(appointments)}
                    navigation={navigation}
                  />
                </View>
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
    </>
  );
};

export default Home;
