import React, {useCallback, useEffect, useState} from 'react';
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
  TouchableRipple,
  Card,
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
    // Order by date by newest to oldest and get the first one
    const _last = _latestAppointment.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (!_last) {
      return;
    } else if (_last && (_last[0].length || _last[0].weight || _last[0].head)) {
      return _last[0];
    } else {
      return _last[1];
    }
  };

  const [nextAppointment, setNextAppointment] = useState<
    AppointmentObj | undefined
  >();
  // Show next appointment if length, weight and head are not set
  const showNextAppointment = useCallback(() => {
    const _nextAppointment = Object.values(appointments);
    // check if there is an appointment with length, weight and head not set
    const _next = _nextAppointment.find(
      appointment =>
        appointment.length === 0 ||
        appointment.weight === 0 ||
        appointment.head === 0,
    );
    if (_next) {
      return _next;
    }
  }, [appointments]);

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
    const entries = Object.values(data).filter(
      entry => entry.length !== 0 && entry.weight !== 0 && entry.head !== 0,
    );
    const sortedEntries = entries.sort((a, b) => a.age - b.age);
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
      const _nextAppointment = showNextAppointment();
      setNextAppointment(_nextAppointment);
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
                variant="titleSmall"
                style={[TextStyles.homeSubtitle, {color: colors.secondary}]}>
                Age:
                {moment().diff(baby?.birth, 'years') === 0
                  ? ' ' + moment().diff(baby?.birth, 'months') + ' months'
                  : ' ' + moment().diff(baby?.birth, 'years') + ' years'}
              </Text>
              {hasAppointments && nextAppointment ? (
                <TouchableRipple
                  onPress={() => goTo('Appointments')}
                  style={[
                    ContainerStyles.nextAppointmentContainer,
                    {backgroundColor: colors.surfaceVariant, borderRadius: 10},
                  ]}>
                  <View>
                    <Text
                      variant="titleMedium"
                      style={{textAlign: 'center', marginBottom: 10}}>
                      Next appointment
                    </Text>
                    <Text style={{marginBottom: 5}} variant="titleMedium">
                      {moment(nextAppointment.date).format(
                        'dddd, MMMM Do YYYY',
                      )}
                    </Text>
                    <Text variant="bodyLarge">
                      Time: {nextAppointment.hour} hs.
                    </Text>
                  </View>
                </TouchableRipple>
              ) : null}
              {latestVaccine && (
                <Card
                  mode={'contained'}
                  onPress={() => goTo('Vaccines')}
                  style={[
                    ContainerStyles.lastAppointmentContainer,
                    {
                      backgroundColor: colors.background,
                    },
                  ]}>
                  <Card.Title
                    title="Last Vaccine"
                    titleStyle={{fontWeight: 'bold'}}
                    subtitle={moment(latestVaccine.date).format(
                      'dddd, MMMM Do YYYY',
                    )}
                  />
                  <Card.Content style={{alignSelf: 'center'}}>
                    <Text variant="bodyLarge">{latestVaccine.name}</Text>
                  </Card.Content>
                </Card>
              )}
              {hasAppointments && lastAppointment ? (
                <View>
                  <Card
                    onPress={() => goTo('Appointments')}
                    mode={'contained'}
                    style={[
                      ContainerStyles.lastAppointmentContainer,
                      {
                        backgroundColor: colors.background,
                      },
                    ]}>
                    <Card.Title
                      title="Last Appointment"
                      titleStyle={{fontWeight: 'bold'}}
                      subtitle={moment(lastAppointment.date).format(
                        'dddd, MMMM Do YYYY',
                      )}
                    />
                    <Card.Content>
                      <Text variant="bodySmall">
                        Age {lastAppointment.age} months
                      </Text>
                      <Text variant="bodySmall">
                        Length: {lastAppointment.length} cm
                      </Text>
                      <Text variant="bodySmall">
                        Weight: {lastAppointment.weight} Kg
                      </Text>
                      <Text variant="bodySmall">
                        Head: {lastAppointment.head} cm
                      </Text>
                    </Card.Content>
                  </Card>
                  <Divider />
                  <Text style={{marginVertical: 20}} variant="titleMedium">
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
