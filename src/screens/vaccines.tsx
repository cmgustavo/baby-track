import React from 'react';
import {View, FlatList} from 'react-native';
import {useTheme, Text, Divider} from 'react-native-paper';

import {ContainerStyles, TextStyles} from '../styles';

import {calendarVaccines} from '../constants/vaccines';

const Vaccines = ({navigation}) => {
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
        <Text variant="titleLarge" style={[{color: colors.primary}]}>
          Calendar Vaccines
        </Text>
        <Text
          variant="titleMedium"
          style={[TextStyles.subtitle, {color: colors.secondary}]}>
          Check the vaccines your baby needs to get.
        </Text>
      </View>
    );
  };
  return (
    <View style={ContainerStyles.welcomeContainer}>
      <FlatList
        ListHeaderComponent={_listHeader}
        style={[
          ContainerStyles.vaccineContainer,
          {backgroundColor: colors.background},
        ]}
        renderItem={_renderItem}
        data={calendarVaccines}
      />
    </View>
  );
};

export default Vaccines;
