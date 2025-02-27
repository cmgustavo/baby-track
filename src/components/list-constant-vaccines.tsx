import React from 'react';
import {View, FlatList} from 'react-native';
import {Text, Divider, IconButton} from 'react-native-paper';

import {ContainerStyles} from '../styles';

import {
  vaccinesConstantList, // array of key-value pairs
  dosageByVaccine,
} from '../constants/vaccines';

interface Props {
  onDismiss: any;
}

const ListConstantVaccines = ({onDismiss}: Props) => {
  // Group dosages by vaccineId
  const groupedDosages = dosageByVaccine.reduce((acc, dose) => {
    if (!acc[dose.vaccineId]) acc[dose.vaccineId] = [];
    acc[dose.vaccineId].push(dose);
    return acc;
  }, {} as Record<number, typeof dosageByVaccine>);

  const vaccineArray = Object.entries(vaccinesConstantList).map(
    ([id, data]) => ({
      id,
      ...data,
      dosages: groupedDosages[Number(id)] || [], // Get corresponding dosages
    }),
  );

  const renderItem = ({
    item,
  }: {
    item: {id: string; name: string; description: string; dosages: any[]};
  }) => (
    <View>
      <Divider />
      <View style={ContainerStyles.vaccinesModalConstantList}>
        <Text variant="titleMedium" style={{marginBottom: 5}}>
          {item.name}
        </Text>
        <Text variant="bodySmall">{item.description}</Text>
      </View>
      <View style={ContainerStyles.dosageContainer}>
        {item.dosages.map(dose => (
          <Text key={dose.dose}>
            • {dose.stage} (Dose {dose.dose}) {dose.booster ? '- Boost' : ''}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={ContainerStyles.vaccinesModalHeader}>
        <Text variant="titleLarge" style={{marginLeft: 15}}>
          Vaccines Calendar
        </Text>
        <IconButton icon={'close'} onPress={onDismiss} />
      </View>
      <FlatList
        style={[ContainerStyles.vaccinesListContainer]}
        renderItem={renderItem}
        data={vaccineArray}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListConstantVaccines;
