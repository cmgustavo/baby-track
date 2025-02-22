import React from 'react';
import moment from 'moment';
import {FlatList, View} from 'react-native';
import {useTheme, Card, Text, Divider, Button} from 'react-native-paper';

import {deleteBaby} from '../store/babies';
import {BabiesObj} from '../store/babies/babies.models.ts';
import {ContainerStyles} from '../styles';
import {useAppDispatch} from '../store';

interface Props {
  navigation: any;
  babies: BabiesObj;
}

const ListBabies = ({babies, navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const _deleteBaby = (id: string) => {
    dispatch(deleteBaby(id));
    navigation.goBack();
  };

  const _modifyBaby = (
    id: number,
    name: string,
    birth: Date,
    gender: string,
    length: number,
    weight: number,
    place: string,
    mother: string,
    father: string,
    pediatrician: string,
    notes: string,
    context: string,
  ) => {
    navigation.navigate('AddBaby', {
      id,
      name,
      birth,
      gender,
      length,
      weight,
      place,
      mother,
      father,
      pediatrician,
      notes,
      context,
    });
  };

  const _renderItem = ({item}) => {
    const [_, itemData] = item;
    return (
      <Card
        mode="contained"
        style={[
          ContainerStyles.babyCardsContent,
          {backgroundColor: colors.surfaceVariant},
        ]}>
        <Card.Title
          title={itemData.name}
          titleStyle={{color: colors.primary}}
          subtitle={moment(itemData.birth).format('dddd, MMMM Do YYYY, H:mm')}
          subtitleStyle={{color: colors.secondary}}
        />
        <Divider />
        <Card.Content style={[ContainerStyles.babyContent]}>
          <View style={{marginVertical: 10}}>
            <Text variant="bodyLarge" style={{marginVertical: 10}}>
              Measurements
            </Text>
            <Text variant="bodyMedium">Length: {itemData.length} cm</Text>
            <Text variant="bodyMedium">Weight: {itemData.weight} Kg</Text>
          </View>
          <Divider />
          <View style={{marginVertical: 10}}>
            <Text variant="bodyLarge" style={{marginVertical: 10}}>
              More info
            </Text>
            <Text variant="bodyMedium">ID: {itemData.id}</Text>
            <Text variant="bodyMedium">Gender: {itemData.gender}</Text>
            <Text variant="bodyMedium">Place: {itemData.place}</Text>
            <Text variant="bodyMedium">Mother: {itemData.mother}</Text>
            <Text variant="bodyMedium">Father: {itemData.father}</Text>
            <Text variant="bodyMedium">
              Pediatrician: {itemData.pediatrician}
            </Text>
          </View>
          {itemData.notes && (
            <>
              <Divider />
              <Text
                variant="bodyLarge"
                style={{marginTop: 10, marginBottom: 5}}>
                Notes
              </Text>
              <Text variant="bodyMedium" numberOfLines={2}>
                {itemData.notes}
              </Text>
            </>
          )}
          <Card.Actions>
            <Button
              mode={'text'}
              textColor={colors.inverseSurface}
              icon={'calendar-edit'}
              onPress={() =>
                _modifyBaby(
                  itemData.id,
                  itemData.name,
                  itemData.birth,
                  itemData.gender,
                  itemData.length,
                  itemData.weight,
                  itemData.place,
                  itemData.mother,
                  itemData.father,
                  itemData.pediatrician,
                  itemData.notes,
                  'edit',
                )
              }>
              Edit
            </Button>
            <Button
              mode={'text'}
              textColor={colors.error}
              icon={'trash-can-outline'}
              onPress={() => _deleteBaby(itemData.id)}>
              Delete
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    );
  };

  const _keyExtractor = item => {
    const [key] = item;
    return key;
  };

  return (
    <FlatList
      style={[
        ContainerStyles.babyContainer,
        {backgroundColor: colors.background},
      ]}
      renderItem={_renderItem}
      data={Object.entries(babies).reverse()}
      keyExtractor={_keyExtractor}
    />
  );
};

export default ListBabies;
