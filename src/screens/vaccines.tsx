import React from 'react';
import {View} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';

import {ContainerStyles} from '../styles';
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';

import ListVacciones from '../components/list-vaccines';

const Vaccines = ({navigation}) => {
  const {colors, dark} = useTheme();
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <>
      <Appbar.Header
        theme={appTheme}
        mode={'small'}
        style={{backgroundColor: appTheme.colors.primary}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Vaccines Calendar" />
      </Appbar.Header>
      <View
        style={[
          ContainerStyles.vaccinesContainer,
          {backgroundColor: colors.background},
        ]}>
        <ListVacciones navigation={navigation} />
      </View>
    </>
  );
};

export default Vaccines;
