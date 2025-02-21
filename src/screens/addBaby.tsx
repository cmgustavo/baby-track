import React, {useState} from 'react';
import moment from 'moment';
import {ScrollView, View} from 'react-native';
import {TextInput, Button, Appbar, useTheme} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {useAppDispatch} from '../store';
import {createBaby} from '../store/babies';
import {ContainerStyles} from '../styles';
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';

const AddBaby = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {dark} = useTheme();
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;
  const [textAreaValue, setTextAreaValue] = useState('');
  const [birthValue, setBirthValue] = useState<Date>(new Date());
  const [idValue, setIdValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [open, setOpen] = useState(false);
  const [lengthValue, setLenghtValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [placeValue, setPlaceValue] = useState('');
  const [motherValue, setMotherValue] = useState('');
  const [fatherValue, setFatherValue] = useState('');
  const [pediatricianValue, setPediatricianValue] = useState('');

  const IS_DEV = __DEV__;

  const addBaby = (
    id: number,
    name: string,
    gender: string,
    birth: Date,
    length: number,
    weight: number,
    place: string,
    mother: string,
    father: string,
    pediatrician: string,
    notes: string,
  ) => {
    dispatch(
      createBaby({
        id,
        name,
        gender,
        birth,
        length,
        weight,
        place,
        mother,
        father,
        pediatrician,
        notes,
      }),
    );
  };

  return (
    <>
      <Appbar.Header
        theme={appTheme}
        mode={'small'}
        style={{backgroundColor: appTheme.colors.primary}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add a new baby" />
        {IS_DEV ? (
          <Appbar.Action
            icon="bug"
            onPress={() => {
              setIdValue('123456789');
              setNameValue('Baby');
              setGenderValue('Male');
              setBirthValue(new Date());
              setLenghtValue('1');
              setWeightValue('1');
              setPlaceValue('Place');
              setMotherValue('Mother');
              setFatherValue('Father');
              setPediatricianValue('Pediatrician');
              setTextAreaValue('Notes');
            }}
          />
        ) : null}
      </Appbar.Header>
      <ScrollView>
        <View style={[ContainerStyles.formContainer]}>
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="ID"
            value={idValue}
            onChangeText={v => setIdValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Name"
            value={nameValue}
            onChangeText={v => setNameValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            editable={false}
            label="Birth date"
            value={moment(birthValue).format('DD/MM/YYYY, H:mm')}
            right={
              <TextInput.Icon
                onPress={() => setOpen(true)}
                icon="calendar-month"
              />
            }
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Gender"
            value={genderValue}
            onChangeText={v => setGenderValue(v)}
          />
          <DatePicker
            modal
            mode="datetime"
            maximumDate={new Date(Date.now())}
            minimumDate={new Date(moment().subtract(1, 'year').format())}
            open={open}
            date={birthValue}
            onConfirm={date => {
              setOpen(false);
              setBirthValue(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
            label="Place"
            value={placeValue}
            onChangeText={v => setPlaceValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Mother"
            value={motherValue}
            onChangeText={v => setMotherValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Father"
            value={fatherValue}
            onChangeText={v => setFatherValue(v)}
          />
          <TextInput
            style={[ContainerStyles.inputContainer]}
            mode="outlined"
            label="Pediatrician"
            value={pediatricianValue}
            onChangeText={v => setPediatricianValue(v)}
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
            disabled={!idValue}
            onPress={() => {
              addBaby(
                Number(idValue),
                nameValue,
                genderValue,
                birthValue,
                Number(lengthValue),
                Number(weightValue),
                placeValue,
                motherValue,
                fatherValue,
                pediatricianValue,
                textAreaValue,
              );
              navigation.goBack();
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default AddBaby;
