import React from 'react';
import moment from 'moment';
import {FlatList} from 'react-native';
import {useTheme, Card, Text, Divider, Button} from 'react-native-paper';
import {useAppDispatch} from '../store';
import {deleteAppointment} from '../store/appointments';

import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  appointments: any;
}

const ListAppointments = ({appointments, navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const _deleteAppointment = (id: string) => {
    dispatch(deleteAppointment(id));
    navigation.goBack();
  };

  const _modifyAppointment = (
    id: string,
    notes: string,
    date: Date,
    age: number,
    length: number,
    weight: number,
    head: number,
    babyId: number,
    hour: string,
  ) => {
    navigation.navigate('AddAppointment', {
      id,
      notes,
      date,
      age,
      length,
      weight,
      head,
      babyId,
      hour,
    });
  };
  const _renderItem = ({item}) => {
    const [key, itemData] = item;
    return (
      <Card
        mode="contained"
        style={[
          ContainerStyles.appointmentCardsContent,
          {backgroundColor: colors.background},
        ]}>
        <Card.Title
          title={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          titleStyle={{color: colors.primary}}
          subtitle={`Age: ${itemData.age} months`}
          subtitleStyle={{color: colors.secondary}}
        />
        <Card.Content style={[ContainerStyles.appointmentContent]}>
          <Text variant="bodyMedium">Length: {itemData.length} cm</Text>
          <Text variant="bodyMedium">Weight: {itemData.weight} g</Text>
          <Text variant="bodyMedium" style={{marginVertical: 10}}>
            Head: {itemData.head} cm
          </Text>
          <Text
            style={{marginBottom: 10}}
            variant="bodyMedium"
            numberOfLines={2}>
            {itemData.notes}
          </Text>
          <Divider />
        </Card.Content>
        <Card.Actions>
          <Button
            textColor={colors.inverseSurface}
            mode={'text'}
            icon={'calendar-edit'}
            onPress={() =>
              _modifyAppointment(
                key,
                itemData.notes,
                itemData.date,
                itemData.age,
                itemData.length,
                itemData.weight,
                itemData.head,
                itemData.babyId,
                itemData.hour,
              )
            }>
            Edit
          </Button>
          <Button
            textColor={colors.error}
            mode={'text'}
            icon={'trash-can-outline'}
            onPress={() => _deleteAppointment(key)}>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const _keyExtractor = item => {
    const [key] = item;
    return key;
  };

  return (
    <FlatList
      style={[ContainerStyles.appointmentContainer]}
      renderItem={_renderItem}
      data={Object.entries(appointments).sort((a, b) => {
        return new Date(b[1].date).getTime() - new Date(a[1].date).getTime();
      })}
      keyExtractor={_keyExtractor}
    />
  );
};

export default ListAppointments;
