import React, {useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useTheme, TextInput, Text, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {useAppDispatch} from '../store';
import {createAppointment} from '../store/appointments';
import {ContainerStyles} from '../styles';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddAppointment = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [ageValue, setAgeValue] = useState('');
  const [lengthValue, setLenghtValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [headValue, setHeadValue] = useState('');

  const addAppointment = (
    notes: string,
    date: Date,
    age: number,
    length: number,
    weight: number,
    head: number,
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
      }),
    );
  };

  return (
    <View style={[ContainerStyles.formContainer]}>
      <TextInput
        style={[ContainerStyles.inputContainer]}
        mode="outlined"
        editable={false}
        label="Date"
        value={moment(dateValue).format('dddd, MMMM Do YYYY')}
        right={
          <TextInput.Icon onPress={() => setOpen(true)} icon="calendar-month" />
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
        label="Age"
        value={ageValue}
        onChangeText={v => setAgeValue(v)}
      />
      <TextInput
        style={[ContainerStyles.inputContainer]}
        mode="outlined"
        label="Length"
        value={lengthValue}
        onChangeText={v => setLenghtValue(v)}
      />
      <TextInput
        style={[ContainerStyles.inputContainer]}
        mode="outlined"
        label="Weight"
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
        disabled={textAreaValue.length === 0}
        onPress={() => {
          addAppointment(
            textAreaValue,
            dateValue,
            Number(ageValue),
            Number(lengthValue),
            Number(weightValue),
            Number(headValue),
          );
          setTextAreaValue('');
          navigation.goBack();
        }}>
        Save
      </Button>
    </View>
  );
};

export default AddAppointment;
