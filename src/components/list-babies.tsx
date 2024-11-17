import React from 'react';
import moment from 'moment';
import {FlatList} from 'react-native';
import {useTheme, Card, Text, Divider} from 'react-native-paper';

import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  babies: any;
}

const ListBabies = ({babies, navigation}: Props) => {
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
          title={itemData.name}
          titleStyle={{color: colors.primary}}
          subtitle={`Birth: ${moment(itemData.birth).format(
            'dddd, MMMM Do YYYY at h:mm a',
          )}`}
          subtitleStyle={{color: colors.secondary}}
        />
        <Divider />
        <Card.Content style={[ContainerStyles.noteMainContent]}>
          <Text variant="bodyLarge" style={{marginBottom: 5}}>
            Measurements
          </Text>
          <Text variant="bodyMedium">Length: {itemData.length} cm</Text>
          <Text variant="bodyMedium">Weight: {itemData.weight} g</Text>
          <Divider />
          <Text variant="bodyLarge" style={{marginBottom: 5}}>
            More info
          </Text>
          <Text variant="bodyMedium">ID: {itemData.id}</Text>
          <Text variant="bodyMedium">Place: {itemData.place}</Text>
          <Text variant="bodyMedium">Mother: {itemData.mother}</Text>
          <Text variant="bodyMedium">Father: {itemData.father}</Text>
          <Text variant="bodyMedium">
            Pediatrician: {itemData.pediatrician}
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
      data={Object.entries(babies).reverse()}
      keyExtractor={_keyExtractor}
    />
  );
};

export default ListBabies;