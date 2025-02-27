import React from 'react';
import {useTheme, Text, Card} from 'react-native-paper';
import {useAppDispatch} from '../store';
import {View, FlatList} from 'react-native';
import moment from 'moment';

interface Props {
  navigation: any;
  vaccines: any;
}

const ListVaccinesRegistered = ({vaccines, navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const vaccinesOrderedByDate = vaccines.sort((a, b) => {
    return new Date(b[1].date) - new Date(a[1].date);
  });

  const _renderItem = ({item}) => {
    const [key, itemData] = item;
    return (
      <Card
        mode="contained"
        style={{
          marginVertical: 10,
          paddingVertical: 10,
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: colors.primary,
        }}>
        <Card.Title
          titleNumberOfLines={2}
          titleVariant={'titleMedium'}
          title={itemData.name}
          titleStyle={{color: colors.primary}}
          subtitle={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          subtitleStyle={{color: colors.secondary}}
        />
        <Card.Content>
          <Text style={{marginVertical: 10}} variant={'titleMedium'}>
            Dosage
          </Text>
          <Text variant={'bodyMedium'}>
            Age (months): {itemData.dosage.age}
          </Text>
          <Text variant={'bodyMedium'}>Dose: {itemData.dosage.dose}</Text>
          <Text variant={'bodyMedium'}>Stage: {itemData.dosage.stage}</Text>
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
      </Card>
    );
  };

  return (
    <View style={{marginVertical: 10}}>
      <FlatList data={vaccinesOrderedByDate} renderItem={_renderItem} />
    </View>
  );
};

export default ListVaccinesRegistered;
