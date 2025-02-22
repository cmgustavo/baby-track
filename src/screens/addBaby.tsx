import React, {useState} from 'react';
import moment from 'moment';
import {ScrollView, View} from 'react-native';
import {TextInput, Button, Appbar, useTheme} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {useAppDispatch} from '../store';
import {createBaby, updateBaby} from '../store/babies';
import {ContainerStyles} from '../styles';
import CombinedDarkTheme from '../themes/dark';
import CombinedDefaultTheme from '../themes/light';
import ErrorMessage from '../components/error.tsx';

const AddBaby = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {
    id: idBaby,
    name,
    gender,
    birth,
    length,
    weight,
    place,
    mother,
    father,
    peditrician,
    notes,
    context,
  } = route.params;
  const {dark} = useTheme();
  const appTheme = dark ? CombinedDarkTheme : CombinedDefaultTheme;
  const [textAreaValue, setTextAreaValue] = useState<string>(
    notes ? notes : '',
  );
  const [birthValue, setBirthValue] = useState<Date>(
    birth ? new Date(birth) : new Date(),
  );
  const [idValue, setIdValue] = useState<string>(
    idBaby ? idBaby.toString() : '',
  );
  const [nameValue, setNameValue] = useState<string>(name ? name : '');
  const [genderValue, setGenderValue] = useState<string>(
    gender ? gender : 'Male',
  );
  const [open, setOpen] = useState(false);
  const [lengthValue, setLenghtValue] = useState<string>(
    length ? length.toString() : '',
  );
  const [weightValue, setWeightValue] = useState<string>(
    weight ? weight.toString() : '',
  );
  const [placeValue, setPlaceValue] = useState<string>(place ? place : '');
  const [motherValue, setMotherValue] = useState<string>(mother ? mother : '');
  const [fatherValue, setFatherValue] = useState<string>(father ? father : '');
  const [pediatricianValue, setPediatricianValue] = useState<string>(
    peditrician ? peditrician : '',
  );
  const [showError, setShowError] = useState(false);

  const IS_DEV = __DEV__;

  const _addBaby = (
    _id: number,
    _name: string,
    _gender: string,
    _birth: Date,
    _length: number,
    _weight: number,
    _place: string,
    _mother: string,
    _father: string,
    _pediatrician: string,
    _notes: string,
  ) => {
    if (
      !_name ||
      !_gender ||
      !_birth ||
      !_length ||
      !_weight ||
      !_place ||
      !_mother ||
      !_father ||
      !_pediatrician
    ) {
      setShowError(true);
      return;
    }
    if (context === 'edit' && idBaby) {
      dispatch(
        updateBaby({
          id: _id,
          name: _name,
          gender: _gender,
          birth: _birth,
          length: _length,
          weight: _weight,
          place: _place,
          mother: _mother,
          father: _father,
          pediatrician: _pediatrician,
          notes: _notes,
        }),
      );
    } else {
      dispatch(
        createBaby({
          id: _id,
          name: _name,
          gender: _gender,
          birth: _birth,
          length: _length,
          weight: _weight,
          place: _place,
          mother: _mother,
          father: _father,
          pediatrician: _pediatrician,
          notes: _notes,
        }),
      );
    }
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
      {showError && (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Missing required parameters for baby creation'}
        />
      )}
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
              _addBaby(
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
