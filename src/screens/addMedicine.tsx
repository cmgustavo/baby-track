import React from 'react';
import {useAppDispatch} from '../store';
import {useState} from 'react';
import {createMedicine} from '../store/kit';

import {View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {ContainerStyles} from '../styles';
import DatePicker from 'react-native-date-picker';
import ErrorMessage from '../components/error.tsx';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddMedicine = ({route, navigation}) => {
  const {
    id: idMedicine,
    name,
    dosage,
    quantity,
    expiration,
    notes,
  } = route.params || ({} as any);
  const dispatch = useAppDispatch();
  const [textAreaValue, setTextAreaValue] = useState<string>(
    notes ? notes : '',
  );
  const [expirationValue, setExpirationValue] = useState<Date>(
    expiration ? new Date(expiration) : new Date(),
  );
  const [idValue, setIdValue] = useState<string>(idMedicine || '');
  const [nameValue, setNameValue] = useState<string>(name ? name : '');
  const [dosageValue, setDosageValue] = useState<string>(dosage ? dosage : '');
  const [quantityValue, setQuantityValue] = useState<string>(
    quantity ? quantity.toString() : '',
  );
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);

  const IS_DEV = __DEV__;

  const _addMedicine = (
    _id: string,
    _name: string,
    _dosage?: string,
    _quantity?: number,
    _expiration?: Date,
    _notes?: string,
  ) => {
    if (!_name || !_id) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    const uniqueId = idMedicine ? idMedicine : getUniqueId();

    dispatch(
      createMedicine(uniqueId, {
        name: _name,
        dosage: _dosage,
        quantity: _quantity,
        expiration: _expiration,
        notes: _notes,
      }),
    );

    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Medicine" />
        {IS_DEV && (
          <Appbar.Action
            icon={'dev-to'}
            onPress={() => {
              setIdValue('123456789');
              setNameValue('Medicine');
              setDosageValue('1 pill');
              setQuantityValue('1');
              setExpirationValue(new Date());
              setTextAreaValue('This is a test medicine');
            }}
          />
        )}
      </Appbar.Header>
      {showError && (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Missing required parameters for medical kit creation'}
        />
      )}
      <View style={[ContainerStyles.formContainer]}>
        <TextInput
          style={[ContainerStyles.inputContainer]}
          mode="outlined"
          label="Name"
          value={nameValue}
          onChangeText={text => setNameValue(text)}
        />
        <TextInput
          style={[ContainerStyles.inputContainer]}
          mode="outlined"
          label="Dosage"
          value={dosageValue}
          onChangeText={text => setDosageValue(text)}
        />
        <TextInput
          style={[ContainerStyles.inputContainer]}
          mode="outlined"
          label="Quantity"
          value={quantityValue}
          onChangeText={text => setQuantityValue(text)}
        />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={expirationValue}
          onConfirm={date => {
            setOpen(false);
            setExpirationValue(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <TextInput
          style={[ContainerStyles.inputContainer]}
          mode="outlined"
          label="Notes"
          value={textAreaValue}
          onChangeText={text => setTextAreaValue(text)}
        />
        <Button
          icon="content-save"
          mode="contained"
          style={{marginTop: 20}}
          disabled={!idValue || !nameValue}
          onPress={() => {
            _addMedicine(
              idValue,
              nameValue,
              dosageValue,
              parseInt(quantityValue || '0', 10),
              expirationValue,
              textAreaValue,
            );
            setTextAreaValue('');
          }}>
          Save
        </Button>
      </View>
    </>
  );
};

export default AddMedicine;
