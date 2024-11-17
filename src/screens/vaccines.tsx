import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ContainerStyles} from '../styles';

import ListVacciones from '../components/list-vaccines';

const Vaccines = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        ContainerStyles.vaccinesContainer,
        {backgroundColor: colors.background},
      ]}>
      <ListVacciones navigation={navigation} />
    </View>
  );
};

export default Vaccines;
