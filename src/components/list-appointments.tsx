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
  const _renderItem = ({item}) => {
    const [_, itemData] = item;
    return (
      <Card
        mode="contained"
        style={[
          ContainerStyles.appointmentCardsContent,
          {backgroundColor: colors.surfaceVariant},
        ]}>
        <Card.Title
          title={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          titleStyle={{color: colors.primary}}
          subtitle={`Age: ${itemData.age} months`}
          subtitleStyle={{color: colors.secondary}}
        />
        <Divider />
        <Card.Content style={[ContainerStyles.appointmentContent]}>
          <Text variant="bodyLarge" style={{marginBottom: 5}}>
            Measurements
          </Text>
          <Text variant="bodyMedium">Length: {itemData.length} cm</Text>
          <Text variant="bodyMedium">Weight: {itemData.weight} g</Text>
          <Text variant="bodyMedium" style={{marginBottom: 10}}>
            Head: {itemData.head} cm
          </Text>
          <Divider />
          <Text variant="bodyLarge" style={{marginTop: 10, marginBottom: 5}}>
            Notes
          </Text>
          <Text variant="bodyMedium" numberOfLines={2}>
            {itemData.notes}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            icon={'trash-can-outline'}
            mode="contained"
            onPress={() => _deleteAppointment(itemData.id)}>
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
      style={[
        ContainerStyles.appointmentContainer,
        {backgroundColor: colors.background},
      ]}
      renderItem={_renderItem}
      data={Object.entries(appointments).reverse()}
      keyExtractor={_keyExtractor}
    />
  );
};

export default ListAppointments;
