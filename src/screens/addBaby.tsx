import React, {useState} from 'react';
import moment from 'moment';
import {ScrollView, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {useAppDispatch} from '../store';
import {createBaby} from '../store/babies';
import {ContainerStyles} from '../styles';

const AddBaby = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [birthValue, setBirthValue] = useState<Date>(new Date());
  const [idValue, setIdValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [open, setOpen] = useState(false);
  const [lengthValue, setLenghtValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [placeValue, setPlaceValue] = useState('');
  const [motherValue, setMotherValue] = useState('');
  const [fatherValue, setFatherValue] = useState('');
  const [pediatricianValue, setPediatricianValue] = useState('');

  const addBaby = (
    id: number,
    name: string,
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
  );
};

export default AddBaby;
