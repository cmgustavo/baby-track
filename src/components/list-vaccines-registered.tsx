import React, {useEffect, useState} from 'react';
import {useTheme, Text, Card, Button} from 'react-native-paper';
import {useAppDispatch} from '../store';
import {View, FlatList} from 'react-native';
import moment from 'moment';
import {VaccineObj} from '../store/vaccines/vaccines.models.ts';
import {vaccineDeleteRegister} from '../store/vaccines';
import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  vaccines: any;
}

const ListVaccinesRegistered = ({vaccines, navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const [vaccinesOrderedByDate, setVaccinesOrderedByDate] = useState<
    VaccineObj[]
  >([]);

  useEffect(() => {
    if (vaccines) {
      const _vaccinesOrderedByDate = vaccines.sort((a, b) => {
        return new Date(b[1].date) - new Date(a[1].date);
      });
      setVaccinesOrderedByDate(_vaccinesOrderedByDate);
    }
  }, [vaccines]);

  const _deleteVaccine = (id: string) => {
    dispatch(vaccineDeleteRegister(id));
  };

  const _renderItem = ({item}) => {
    const [key, itemData] = item;
    return (
      <Card
        mode="contained"
        style={[
          ContainerStyles.vaccineCardsContent,
          {backgroundColor: colors.surfaceVariant},
        ]}>
        <Card.Title
          titleNumberOfLines={2}
          titleVariant={'titleMedium'}
          title={itemData.name}
          titleStyle={{color: colors.primary}}
          subtitle={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          subtitleStyle={{color: colors.secondary}}
        />
        <Card.Content style={[ContainerStyles.vaccineContent]}>
          <Text style={{marginVertical: 10}} variant={'titleMedium'}>
            Dosage
          </Text>
          <Text variant={'bodyMedium'}>
            Age (months): {itemData.dosage.age}
          </Text>
          <Text variant={'bodyMedium'}>Dose: {itemData.dosage.dose}</Text>
          <Text variant={'bodyMedium'}>
            Unique: {itemData.dosage.unique ? 'Yes' : 'No'}
          </Text>
          <Text variant={'bodyMedium'}>
            Boost: {itemData.dosage.booster ? 'Yes' : 'No'}
          </Text>
          <Text style={{marginVertical: 10}} variant={'titleMedium'}>
            Notes
          </Text>
          <Text>{itemData.notes}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode={'text'}
            icon={'delete'}
            textColor={colors.error}
            onPress={() => {
              _deleteVaccine(key);
            }}>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={[ContainerStyles.vaccineContainer]}>
      <FlatList data={vaccinesOrderedByDate} renderItem={_renderItem} />
    </View>
  );
};

export default ListVaccinesRegistered;
