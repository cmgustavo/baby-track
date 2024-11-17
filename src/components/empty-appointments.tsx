import React from 'react';
import {View, FlatList} from 'react-native';
import {useTheme, Text, Divider} from 'react-native-paper';

import {ContainerStyles, TextStyles} from '../styles';

import {calendarVaccines} from '../constants/vaccines';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
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
      <View>
        <Text style={[TextStyles.subtitle, {color: colors.secondary}]}>
          Get start tracking your baby's growth and vaccine schedule.
        </Text>
        <Text variant="headlineMedium" style={{marginBottom: 20}}>
          Vaccines
        </Text>
      </View>
    );
  };
  return (
    <View style={ContainerStyles.welcomeContainer}>
      <FlatList
        ListHeaderComponent={_listHeader}
        style={[
          ContainerStyles.notesContainer,
          {backgroundColor: colors.background},
        ]}
        renderItem={_renderItem}
        data={calendarVaccines}
      />
    </View>
  );
};

export default Welcome;
