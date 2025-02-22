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
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';

const Home = ({navigation}) => {
  const {colors, dark} = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const MAIN_MENU = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [baby, setBaby] = useState<BabyObj>(Object.values(babies)[0]);
  const appointments = useAppSelector(
    ({APPOINTMENTS}: RootState) => APPOINTMENTS.appointments,
  );
  const [hasAppointments, setHasAppointments] = useState<boolean>(
    Object.keys(appointments).length > 0,
  );

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
    }
  }, [babies, appointments]);

  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;
  return (
    <>
      <Appbar.Header
        theme={appTheme}
        mode={'small'}
        style={{backgroundColor: appTheme.colors.primary}}>
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
          <Divider />
          <Menu.Item
            leadingIcon={'cog'}
            onPress={() => goTo('Preferences')}
            title="Preferences"
          />
        </Menu>
      </Appbar.Header>
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
                    style={[TextStyles.contentTitle, {color: colors.tertiary}]}>
                    Growth graph
                  </Text>
                  <BabyGrowthCharts
                    data={formatData(appointments)}
                    navigation={navigation}
                  />
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
    </>
  );
};

export default Home;
