import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  useTheme,
  FAB,
  ActivityIndicator,
  Text,
  Button,
  Appbar,
} from 'react-native-paper';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeBabies} from '../store/babies';

import ErrorMessage from '../components/error';
import ListBabies from '../components/list-babies';
import {ContainerStyles, GlobalStyles, TextStyles} from '../styles';
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';

const Appointments = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors, dark} = useTheme();
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const status = useAppSelector(({BABIES}: RootState) => BABIES.status);

  useEffect(() => {
    dispatch(initializeBabies());
  }, []);

  return (
    <>
      <Appbar.Header
        theme={appTheme}
        mode={'small'}
        style={{backgroundColor: appTheme.colors.primary}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Baby" />
      </Appbar.Header>
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
        {Object.entries(babies).length == 0 ? (
          <View style={[ContainerStyles.babyContainerEmpty]}>
            <Text
              variant="titleLarge"
              style={[TextStyles.babyTitleEmpty, {color: colors.primary}]}>
              No baby yet
            </Text>
            <Text variant="titleMedium" style={[{color: colors.secondary}]}>
              You have to add a baby to start tracking the growth and vaccine
              schedule.
            </Text>
            <Button
              style={{marginTop: 20}}
              onPress={() => {
                navigation.navigate('AddBaby');
              }}>
              Add Baby
            </Button>
          </View>
        ) : (
          <>
            <ListBabies babies={babies} navigation={navigation} />
            <FAB
              icon="plus"
              style={GlobalStyles.fab}
              onPress={() => navigation.navigate('AddBaby')}
            />
          </>
        )}
      </View>
    </>
  );
};

export default Appointments;
