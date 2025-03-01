import React, {useState} from 'react';
import moment from 'moment';
import {ScrollView, View} from 'react-native';
import {TextInput, Button, Appbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {useAppDispatch} from '../store';
import {createBaby, updateBaby} from '../store/babies';
import {ContainerStyles} from '../styles';
import ErrorMessage from '../components/error.tsx';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddBaby = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {
    id,
    dni,
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
    context,
  } = route.params || ({} as any);
  const [textAreaValue, setTextAreaValue] = useState<string>(
    notes ? notes : '',
  );
  const [birthValue, setBirthValue] = useState<Date>(
    birth ? new Date(birth) : new Date(),
  );
  const [idValue, setIdValue] = useState<string>(id || '');
  const [dniValue, setDniValue] = useState<string>(dni ? dni.toString() : '');
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
    pediatrician ? pediatrician : '',
  );
  const [showError, setShowError] = useState(false);

  const IS_DEV = __DEV__;

  const _addBaby = (
    _id: string,
    _dni: string,
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
    if (!_dni || !_name || !_birth) {
      setShowError(true);
      return;
    }
    if (context === 'edit') {
      dispatch(
        updateBaby(_id, {
          dni: Number(_dni),
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
        createBaby(_id, {
          dni: Number(_dni),
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
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add a new baby" />
        {IS_DEV ? (
          <Appbar.Action
            icon="bug"
            onPress={() => {
              setDniValue('30234211');
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
            label="ID (DNI)"
            value={dniValue}
            onChangeText={v => setDniValue(v)}
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
            disabled={!dniValue}
            onPress={() => {
              if (!idValue) {
                setIdValue(getUniqueId());
              }
              _addBaby(
                idValue,
                dniValue,
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
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default AddBaby;
