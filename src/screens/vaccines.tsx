import React, {useEffect, useState} from 'react';
import {useTheme, Appbar, Portal, Modal, Text} from 'react-native-paper';
import moment from 'moment';

import {ContainerStyles} from '../styles';

import ListConstantVaccines from '../components/list-constant-vaccines.tsx';
import ListVaccinesRegistered from '../components/list-vaccines-registered.tsx';
import {RootState, useAppSelector} from '../store';
import {View} from 'react-native';

const Vaccines = ({navigation}) => {
  const {colors} = useTheme();
  const [showListVaccines, setShowListVaccines] = useState(false);
  const _babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const _vaccines = useAppSelector(
    ({VACCINES}: RootState) => VACCINES.vaccines,
  );

  // Select first baby by default
  const [baby, setBaby] = useState(_babies[Object.keys(_babies)[0]]);
  const [babyId, setBabyId] = useState(Object.keys(_babies)[0]);

  // List vaccines using the baby selected by default [VaccineId]: {... babyId: string}
  const [vaccinesRegistered, setVaccinesRegistered] = useState(
    Object.entries(_vaccines).filter(([_, value]) => value.babyId === babyId),
  );

  const showModalVaccines = () => setShowListVaccines(true);
  const hideModalVaccines = () => setShowListVaccines(false);

  useEffect(() => {
    setBaby(_babies[Object.keys(_babies)[0]]);
    setBabyId(Object.keys(_babies)[0]);
    setVaccinesRegistered(
      Object.entries(_vaccines).filter(([_, value]) => value.babyId === babyId),
    );
  }, [_babies, _vaccines]);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Vaccines" />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate('AddVaccineRegister')}
        />
        <Appbar.Action icon="calendar" onPress={showModalVaccines} />
      </Appbar.Header>

      <View style={ContainerStyles.vaccinesContainer}>
        <Text style={{textAlign: 'center'}} variant={'titleLarge'}>
          {baby.name}
        </Text>
        <Text style={{textAlign: 'center'}} variant={'titleSmall'}>
          {moment().diff(baby.birth, 'years') === 0
            ? moment().diff(baby.birth, 'months') + ' months'
            : moment().diff(baby.birth, 'years') + ' years'}
        </Text>
        <ListVaccinesRegistered
          vaccines={vaccinesRegistered}
          navigation={navigation}
        />
      </View>

      <Portal>
        <Modal
          visible={showListVaccines}
          onDismiss={hideModalVaccines}
          contentContainerStyle={[
            ContainerStyles.vaccinesModalContainer,
            {backgroundColor: colors.background},
          ]}>
          <ListConstantVaccines onDismiss={hideModalVaccines} />
        </Modal>
      </Portal>
    </>
  );
};

export default Vaccines;
