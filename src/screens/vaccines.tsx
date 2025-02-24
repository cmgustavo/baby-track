import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

import {ContainerStyles} from '../styles';

import ListVacciones from '../components/list-vaccines';

const Vaccines = ({navigation}) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Vaccines Calendar" />
      </Appbar.Header>
      <View style={[ContainerStyles.vaccinesContainer]}>
        <ListVacciones navigation={navigation} />
      </View>
    </>
  );
};

export default Vaccines;
