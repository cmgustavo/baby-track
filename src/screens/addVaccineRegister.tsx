import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  useTheme,
  TextInput,
  Button,
  Appbar,
  Text,
  Switch,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown, Option} from 'react-native-paper-dropdown';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {ContainerStyles} from '../styles';
import ErrorMessage from '../components/error.tsx';
import moment from 'moment/moment';
import {vaccinesConstantList} from '../constants/vaccines';
import {vaccineCreateRegister} from '../store/vaccines';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddVaccineRegister = ({navigation}) => {
  const {colors} = useTheme();
  const IS_DEV = __DEV__;
  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState(false);

  // Baby
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [babyIdValue, setBabyIdValue] = useState<string | undefined>();
  const [BABY_OPTIONS, setBABY_OPTIONS] = useState<Option[]>([]);

  // Date and calendar
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  // Extra fields
  const [notesValue, setNotesValue] = useState<string>('');

  // Dosage fields
  const [ageValue, setAgeValue] = useState<number | undefined>();
  const [doseValue, setDoseValue] = useState<number | undefined>();
  const [uniqueValue, setUniqueValue] = useState(false);
  const onToggleUniqueSwitch = () => setUniqueValue(!uniqueValue);
  const [boosterValue, setBoosterValue] = useState(false);
  const onToggleBoosterSwitch = () => setBoosterValue(!boosterValue);

  // Vaccine name
  const CALENDAR_VACCINES_OPTIONS = Object.entries(vaccinesConstantList).map(
    ([id, value]) => ({
      value: id,
      label: value.name,
    }),
  );
  const [vaccineIdValue, setVaccineIdValue] = useState<string | undefined>();
  const [vaccineName, setVaccineName] = useState('');

  useEffect(() => {
    if (babies) {
      setBABY_OPTIONS(
        Object.entries(babies).map(([id, value]) => ({
          value: id,
          label: value.name,
        })),
      );
      // Select first baby by default
      setBabyIdValue(Object.keys(babies)[0]);
    }
  }, [babies]);

  useEffect(() => {
    if (vaccineIdValue) {
      const _vaccineId = Number(vaccineIdValue);
      setVaccineName(vaccinesConstantList[_vaccineId].name);
    }
  }, [vaccineIdValue]);

  const _saveVaccineRegister = () => {
    if (!babyIdValue || !vaccineName || !dateValue) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    dispatch(
      vaccineCreateRegister(getUniqueId(), {
        name: vaccineName,
        date: dateValue,
        dosage: {
          age: ageValue || 0,
          dose: doseValue || 0,
          unique: uniqueValue,
          booster: boosterValue,
        },
        babyId: babyIdValue,
        notes: notesValue,
      }),
    );
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Vaccine" />
        {IS_DEV && (
          <Appbar.Action
            icon="bug"
            onPress={() => {
              const randomDate = moment()
                .add(Math.random() * 100, 'days')
                .toDate();
              setDateValue(randomDate);
              const randomVaccine = Math.floor(Math.random() * 4).toString();
              setVaccineIdValue(randomVaccine);
              const randomAge = Math.floor(Math.random() * 50);
              setAgeValue(randomAge);
              const randomDose = Math.floor(Math.random() * 5);
              setDoseValue(randomDose);
              setNotesValue(
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              );
            }}
          />
        )}
      </Appbar.Header>
      {showError && (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Missing required parameters for register a vaccine'}
        />
      )}
      <ScrollView>
        <View style={[ContainerStyles.formContainer]}>
          <View style={{marginBottom: 10}}>
            <Dropdown
              label="Baby"
              placeholder="Select Baby"
              options={BABY_OPTIONS}
              value={babyIdValue}
              disabled={true}
              onSelect={setBabyIdValue}
            />
          </View>
          <Text variant={'titleSmall'}>Vaccine</Text>
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            editable={false}
            label="Date"
            value={moment(dateValue).format('dddd, MMMM Do YYYY')}
            right={
              <TextInput.Icon
                onPress={() => setOpenCalendar(true)}
                icon="calendar-month"
              />
            }
          />
          <DatePicker
            modal
            mode="date"
            open={openCalendar}
            date={dateValue}
            onConfirm={date => {
              setOpenCalendar(false);
              setDateValue(date);
            }}
            onCancel={() => {
              setOpenCalendar(false);
            }}
          />
          <View style={{marginBottom: 10}}>
            <Dropdown
              label="Vaccine"
              placeholder="Select Vaccine"
              options={CALENDAR_VACCINES_OPTIONS}
              value={vaccineIdValue}
              onSelect={setVaccineIdValue}
              mode={'outlined'}
              menuContentStyle={{backgroundColor: colors.background}}
              hideMenuHeader={true}
            />
          </View>
          <Text variant={'titleSmall'}>Dosage</Text>
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Age (months)"
            value={ageValue ? ageValue.toString() : ''}
            onChangeText={v => setAgeValue(Number(v))}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Dose"
            value={doseValue ? doseValue.toString() : ''}
            onChangeText={v => setAgeValue(Number(v))}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              paddingLeft: 5,
            }}>
            <Text variant={'bodyMedium'} style={{fontWeight: 'bold'}}>
              Unique
            </Text>
            <Switch value={uniqueValue} onValueChange={onToggleUniqueSwitch} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              paddingLeft: 5,
            }}>
            <Text variant={'bodyMedium'} style={{fontWeight: 'bold'}}>
              Booster
            </Text>
            <Switch
              value={boosterValue}
              onValueChange={onToggleBoosterSwitch}
            />
          </View>
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Notes"
            value={notesValue}
            onChangeText={v => setNotesValue(v)}
            multiline={true}
          />
          <Button
            icon="content-save"
            mode="contained"
            style={{marginTop: 20}}
            disabled={!babyIdValue || !dateValue}
            onPress={() => {
              _saveVaccineRegister();
              setNotesValue('');
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
};
export default AddVaccineRegister;
