import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTheme, TextInput, Button, Appbar} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Dropdown, Option} from 'react-native-paper-dropdown';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {ContainerStyles} from '../styles';
import ErrorMessage from '../components/error.tsx';
import moment from 'moment/moment';
import {dosageByVaccine, vaccinesConstantList} from '../constants/vaccines';
import {VaccineDosage} from '../store/vaccines/vaccines.models.ts';
import {vaccineCreateRegister} from '../store/vaccines';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddVaccineRegister = ({navigation}) => {
  const {colors} = useTheme();
  const IS_DEV = __DEV__;
  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState(false);
  const babies = useAppSelector(({BABIES}: RootState) => BABIES.babies);
  const [babyIdValue, setBabyIdValue] = useState<string | undefined>(
    Object.keys(babies)[0],
  );

  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [openCalendar, setOpenCalendar] = useState(false);

  const [selectedConstantVaccineId, setSelectedConstantVaccineId] = useState<
    string | undefined
  >('0');
  const [selectedDosageVaccine, setSelectedDosageVaccine] = useState<
    string | undefined
  >('0');

  const [listDosageVaccine, setListDosageVaccine] = useState<Option[]>();
  const [dosageData, setDosageData] = useState<VaccineDosage>({});
  const [vaccineName, setVaccineName] = useState<string>('');

  const BABY_OPTIONS = Object.entries(babies).map(([_, value]) => ({
    value: _,
    label: value.name,
  }));

  const CALENDAR_VACCINES_OPTIONS = Object.entries(vaccinesConstantList).map(
    ([id, value]) => ({
      value: id,
      label: value.name,
    }),
  );

  useEffect(() => {
    const _filteredDosage = dosageByVaccine.filter(
      d => d.vaccineId === Number(selectedConstantVaccineId),
    );
    const _filteredDosageObj = Object.entries(_filteredDosage).map(
      ([id, value]) => ({
        value: id,
        label:
          'Dose: ' +
          value.dose +
          ' - Stage: ' +
          value.stage +
          (value.booster ? ' - Boost' : ''),
      }),
    );
    setListDosageVaccine(_filteredDosageObj);
    setVaccineName(
      vaccinesConstantList[Number(selectedConstantVaccineId)].name,
    );
  }, [selectedConstantVaccineId]);

  useEffect(() => {
    if (selectedDosageVaccine) {
      const _dosage = dosageByVaccine.filter(
        d => d.vaccineId === Number(selectedConstantVaccineId),
      );
      const _selectedDosage = _dosage[Number(selectedDosageVaccine)];
      setDosageData({
        age: _selectedDosage.age,
        dose: _selectedDosage.dose,
        unique: _selectedDosage.unique,
        booster: _selectedDosage.booster,
        stage: _selectedDosage.stage,
      });
    }
  }, [selectedDosageVaccine, selectedConstantVaccineId]);

  const _saveVaccineRegister = () => {
    if (
      !babyIdValue ||
      !vaccineName ||
      !selectedConstantVaccineId ||
      !selectedDosageVaccine ||
      !dateValue
    ) {
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
        dosage: dosageData,
        babyId: babyIdValue,
        notes: textAreaValue,
      }),
    );
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Vaccine Register" />
        {IS_DEV && (
          <Appbar.Action
            icon="bug"
            onPress={() => {
              const randomDate = moment()
                .add(Math.random() * 100, 'days')
                .toDate();
              setDateValue(randomDate);
              const randomVaccineId = Math.floor(
                Math.random() * CALENDAR_VACCINES_OPTIONS.length,
              ).toString();
              setSelectedConstantVaccineId(randomVaccineId);
              setTextAreaValue(
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
              value={selectedConstantVaccineId}
              onSelect={setSelectedConstantVaccineId}
              mode={'outlined'}
              menuContentStyle={{backgroundColor: colors.background}}
              hideMenuHeader={true}
            />
          </View>
          {listDosageVaccine && (
            <View style={{marginBottom: 10}}>
              <Dropdown
                label="Dosage"
                placeholder="Select Dosage"
                options={listDosageVaccine}
                value={selectedDosageVaccine}
                onSelect={setSelectedDosageVaccine}
                mode={'outlined'}
                menuContentStyle={{backgroundColor: colors.background}}
                hideMenuHeader={true}
              />
            </View>
          )}
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
              _saveVaccineRegister();
              setTextAreaValue('');
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
};
export default AddVaccineRegister;
