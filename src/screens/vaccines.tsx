import React, {useEffect, useState} from 'react';
import {
  useTheme,
  Appbar,
  Portal,
  Modal,
  Text,
  Button,
} from 'react-native-paper';

import {ContainerStyles, TextStyles} from '../styles';

import ListConstantVaccines from '../components/list-constant-vaccines.tsx';
import ListVaccinesRegistered from '../components/list-vaccines-registered.tsx';
import {RootState, useAppSelector} from '../store';
import {View} from 'react-native';
import {BabyObj} from '../store/babies/babies.models.ts';

const Vaccines = ({navigation}) => {
  const {colors} = useTheme();
  const [showListVaccines, setShowListVaccines] = useState(false);
  const _babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const _vaccines = useAppSelector(
    ({VACCINES}: RootState) => VACCINES.vaccines,
  );

  // Select first baby by default
  const [baby, setBaby] = useState<BabyObj>(_babies[Object.keys(_babies)[0]]);
  const [babyId, setBabyId] = useState<string | undefined>(
    Object.keys(_babies)[0],
  );

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
  }, [_babies, _vaccines, babyId]);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Vaccines" />
        {baby ? (
          <Appbar.Action
            icon="plus"
            onPress={() => navigation.navigate('AddVaccineRegister')}
          />
        ) : null}
        <Appbar.Action icon="calendar" onPress={showModalVaccines} />
      </Appbar.Header>

      {!baby ? (
        <View style={[ContainerStyles.babyContainerEmpty]}>
          <Text
            variant="titleLarge"
            style={[TextStyles.babyTitleEmpty, {color: colors.primary}]}>
            No Vaccine Register
          </Text>
          <Text variant="titleMedium" style={[{color: colors.tertiary}]}>
            Please add a baby first to add a vaccine register.
          </Text>
          <Button
            mode={'contained'}
            style={{marginTop: 20}}
            onPress={() => {
              navigation.navigate('AddBaby');
            }}>
            Add Baby
          </Button>
        </View>
      ) : (
        <View style={ContainerStyles.vaccineContainer}>
          <ListVaccinesRegistered
            vaccines={vaccinesRegistered}
            navigation={navigation}
          />
        </View>
      )}

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
