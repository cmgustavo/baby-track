import React, {useState} from 'react';
import moment from 'moment';
import {View, ScrollView} from 'react-native';
import {useTheme, TextInput, Button, Appbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-paper-dropdown';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {createAppointment} from '../store/appointments';
import {ContainerStyles} from '../styles';
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddAppointment = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {dark} = useTheme();
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [babyIdValue, setBabyIdValue] = useState<string>();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [ageValue, setAgeValue] = useState('');
  const [lengthValue, setLenghtValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [headValue, setHeadValue] = useState('');

  const IS_DEV = __DEV__;

  const addAppointment = (
    notes: string,
    date: Date,
    age: number,
    length: number,
    weight: number,
    head: number,
    babyId: number,
  ) => {
    dispatch(
      createAppointment({
        id: getUniqueId(),
        notes,
        date,
        age,
        length,
        weight,
        head,
        babyId,
      }),
    );
  };

  const OPTIONS = Object.entries(babies).map(([_, value]) => ({
    value: value.id.toString(),
    label: value.name,
  }));

  return (
    <>
      <Appbar.Header
        theme={appTheme}
        mode={'small'}
        style={{backgroundColor: appTheme.colors.primary}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Appointment" />
        {IS_DEV && (
          <Appbar.Action
            icon="bug"
            onPress={() => {
              const randomDate = moment()
                .add(Math.random() * 100, 'days')
                .toDate();
              const randomAge = Math.floor(Math.random() * 100);
              const randomLength = Math.floor(Math.random() * 100);
              const randomWeight = Math.floor(Math.random() * 100);
              const randomHead = Math.floor(Math.random() * 100);
              const randomBabyId = Math.floor(Math.random() * 100);
              setDateValue(randomDate);
              setAgeValue(randomAge.toString());
              setLenghtValue(randomLength.toString());
              setWeightValue(randomWeight.toString());
              setHeadValue(randomHead.toString());
              setTextAreaValue('Notes');
              setBabyIdValue(randomBabyId.toString());
            }}
          />
        )}
      </Appbar.Header>
      <ScrollView>
        <View style={[ContainerStyles.formContainer]}>
          <View style={{marginBottom: 10}}>
            <Dropdown
              label="Baby"
              placeholder="Select Baby"
              options={OPTIONS}
              value={babyIdValue}
              onSelect={setBabyIdValue}
            />
          </View>
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            editable={false}
            label="Date"
            value={moment(dateValue).format('dddd, MMMM Do YYYY')}
            right={
              <TextInput.Icon
                onPress={() => setOpen(true)}
                icon="calendar-month"
              />
            }
          />
          <DatePicker
            modal
            mode="date"
            open={open}
            date={dateValue}
            onConfirm={date => {
              setOpen(false);
              setDateValue(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Age (Months)"
            value={ageValue}
            onChangeText={v => setAgeValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Length (centimeters)"
            value={lengthValue}
            onChangeText={v => setLenghtValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Weight (grams)"
            value={weightValue}
            onChangeText={v => setWeightValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Head circumference"
            value={headValue}
            onChangeText={v => setHeadValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Notes"
            value={textAreaValue}
            onChangeText={v => setTextAreaValue(v)}
            multiline={true}
          />
          <Button
            icon="content-save"
            mode="contained"
            style={{marginTop: 20}}
            disabled={!babyIdValue || !dateValue}
            onPress={() => {
              addAppointment(
                textAreaValue,
                dateValue,
                Number(ageValue),
                Number(lengthValue),
                Number(weightValue),
                Number(headValue),
                Number(babyIdValue),
              );
              setTextAreaValue('');
              navigation.goBack();
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default AddAppointment;
