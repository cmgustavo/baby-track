import React, {useEffect, useState} from 'react';
import {Appbar, Text} from 'react-native-paper';
import {View} from 'react-native';
import {ContainerStyles} from '../styles';

import {RootState, useAppSelector} from '../store';

import ListKit from '../components/list-kit.tsx';

const KitScreen = ({navigation}) => {
  const _medicalKit = useAppSelector(({KIT}: RootState) => KIT.kit);

  const [medicalKit, setMedicalKit] = useState(_medicalKit);

  useEffect(() => {
    if (medicalKit) {
      setMedicalKit(_medicalKit);
    }
  }, [_medicalKit]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Medical Kit" />
        <Appbar.Action
          icon={'plus'}
          onPress={() => navigation.navigate('AddMedicine')}
        />
      </Appbar.Header>
      <View style={[ContainerStyles.globalContainer]}>
        {medicalKit ? (
          <ListKit navigation={navigation} kit={medicalKit} />
        ) : (
          <Text>Medical Kit is empty</Text>
        )}
      </View>
    </>
  );
};

export default KitScreen;
