import React from 'react';
import {FlatList} from 'react-native';

import {ContainerStyles} from '../styles';
import {Card, Divider, useTheme, Text, Button} from 'react-native-paper';
import moment from 'moment/moment';

import {deleteMedicine} from '../store/kit';
import {useAppDispatch} from '../store';

interface Props {
  navigation: any;
  kit: any;
}

const ListKit = ({kit, navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const _deleteMedicine = (id: string) => {
    dispatch(deleteMedicine(id));
  };

  const _modifyMedicine = (id: string) => {
    navigation.navigate('AddMedicine', {
      id,
      name: kit[id].name,
      dosage: kit[id].dosage,
      quantity: kit[id].quantity,
      expiration: kit[id].expiration,
      notes: kit[id].notes,
    });
  };

  const _renderItem = ({item}) => {
    const [key, itemData] = item;
    return (
      <Card
        mode="contained"
        style={[
          ContainerStyles.kitCardsContent,
          {backgroundColor: colors.background},
        ]}>
        <Card.Title
          title={itemData.name}
          titleStyle={{fontWeight: 'bold'}}
          subtitle={itemData.notes}
        />
        <Card.Content style={[ContainerStyles.kitContent]}>
          {itemData.dosage ? (
            <Text variant="bodySmall">Dosage: {itemData.dosage}</Text>
          ) : null}
          {itemData.quantity ? (
            <Text variant="bodySmall">Quantity: {itemData.quantity}</Text>
          ) : null}
          {itemData.expiration ? (
            <Text variant="bodySmall">
              Expires:{' '}
              {moment(itemData.expiration).format('dddd, MMMM Do YYYY')}
            </Text>
          ) : null}
          <Divider style={{marginTop: 10}} />
        </Card.Content>
        <Card.Actions>
          <Button
            textColor={colors.secondary}
            mode={'text'}
            icon={'note-edit-outline'}
            onPress={() => _modifyMedicine(key)}>
            Edit
          </Button>

          <Button
            textColor={colors.error}
            mode={'text'}
            icon={'trash-can-outline'}
            onPress={() => _deleteMedicine(key)}>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <FlatList
      style={[ContainerStyles.kitContainer]}
      data={Object.entries(kit)}
      renderItem={_renderItem}
      keyExtractor={([key]) => key}
    />
  );
};

export default ListKit;
