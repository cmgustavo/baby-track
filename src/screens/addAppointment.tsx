import React, {useState} from 'react';
import moment from 'moment';
import {View, ScrollView} from 'react-native';
import {useTheme, TextInput, Button, Appbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-paper-dropdown';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {createAppointment, updateAppointment} from '../store/appointments';
import {ContainerStyles} from '../styles';
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';
import ErrorMessage from '../components/error.tsx';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddAppointment = ({route, navigation}) => {
  const {
    id: idAppointment,
    notes,
    date,
    age,
    length,
    weight,
    head,
    babyId,
  } = route.params;
  const dispatch = useAppDispatch();
  const {dark} = useTheme();
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [babyIdValue, setBabyIdValue] = useState<string | undefined>(
    babyId ? babyId.toString() : undefined,
  );
  const [textAreaValue, setTextAreaValue] = useState<string>(
    notes ? notes : '',
  );
  const [dateValue, setDateValue] = useState<Date>(
    date ? new Date(date) : new Date(),
  );
  const [open, setOpen] = useState(false);
  const [ageValue, setAgeValue] = useState<string>(age ? age.toString() : '');
  const [lengthValue, setLenghtValue] = useState<string>(
    length ? length.toString() : '',
  );
  const [weightValue, setWeightValue] = useState<string>(
    weight ? weight.toString() : '',
  );
  const [headValue, setHeadValue] = useState<string>(
    head ? head.toString() : '',
  );
  const [showError, setShowError] = useState(false);

  const IS_DEV = __DEV__;

  const _addAppointment = (
    _notes: string,
    _date: Date,
    _age: number,
    _length: number,
    _weight: number,
    _head: number,
    _babyId: number,
    _id?: string,
  ) => {
    if (!age || !length || !weight || !head || !babyId) {
      setShowError(true);
      return;
    }
    if (_id) {
      dispatch(
        updateAppointment({
          id: _id,
          notes: _notes,
          date: _date,
          age: _age,
          length: _length,
          weight: _weight,
          head: _head,
          babyId: _babyId,
        }),
      );
    } else {
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
    }
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
      {showError && (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Missing required parameters for appointment creation'}
        />
      )}
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
              _addAppointment(
                textAreaValue,
                dateValue,
                Number(ageValue),
                Number(lengthValue),
                Number(weightValue),
                Number(headValue),
                Number(babyIdValue),
                idAppointment,
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
