import React from 'react';
import moment from 'moment';
import {FlatList} from 'react-native';
import {useTheme, Card, Text, Divider} from 'react-native-paper';

import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  appointments: any;
}

const ListAppointments = ({appointments, navigation}: Props) => {
  const {colors} = useTheme();

  const _renderItem = ({item}) => {
    const [_, itemData] = item;
    return (
      <Card
        mode="contained"
        style={[
          ContainerStyles.noteContainer,
          {backgroundColor: colors.surfaceVariant},
        ]}>
        <Card.Title
          title={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          titleStyle={{color: colors.primary}}
          subtitle={`Age: ${itemData.age} months`}
          subtitleStyle={{color: colors.secondary}}
        />
        <Divider />
        <Card.Content style={[ContainerStyles.noteMainContent]}>
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
        ContainerStyles.notesContainer,
        {backgroundColor: colors.background},
      ]}
      renderItem={_renderItem}
      data={Object.entries(appointments).reverse()}
      keyExtractor={_keyExtractor}
    />
  );
};

export default ListAppointments;
