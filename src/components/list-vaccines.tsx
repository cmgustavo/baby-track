import React from 'react';
import {View, FlatList} from 'react-native';
import {useTheme, Text, Divider} from 'react-native-paper';

import {ContainerStyles} from '../styles';

import {calendarVaccines} from '../constants/vaccines';

interface Props {
  navigation: any;
}

const ListVaccines = ({navigation}: Props) => {
  const {colors} = useTheme();
  const _secondRenderItem = item => {
    const {item: itemData} = item;
    return (
      <View style={{marginTop: 10}}>
        <Text variant="labelMedium">
          Dosis: {itemData.dose}, {itemData.stage}
        </Text>
      </View>
    );
  };
  const _renderItem = item => {
    const {item: itemData} = item;
    return (
      <View>
        <Text variant="titleMedium">{itemData.name}</Text>
        <FlatList renderItem={_secondRenderItem} data={itemData.vaccines} />
        <Text variant="bodyMedium">{itemData.description}</Text>
        <Divider />
      </View>
    );
  };
  const _listHeader = () => {
    return (
      <View style={[ContainerStyles.vaccinesTitleContainer]}>
        <Text
          variant="titleLarge"
          style={{marginBottom: 20, color: colors.primary}}>
          Vaccines Calendar
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={_listHeader}
      style={[
        ContainerStyles.vaccinesListContainer,
        {backgroundColor: colors.background},
      ]}
      renderItem={_renderItem}
      data={calendarVaccines}
    />
  );
};

export default ListVaccines;
