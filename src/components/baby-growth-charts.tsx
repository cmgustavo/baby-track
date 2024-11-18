import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useTheme, Text} from 'react-native-paper';

import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  data: any;
}

const BabyGrowthCharts = ({data, navigation}: Props) => {
  const {colors} = useTheme();
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={ContainerStyles.chartContainer}>
      <Text variant="titleSmall" style={{color: colors.primary}}>
        Length vs Age
      </Text>
      <LineChart
        data={{
          labels: data.ages.map(String),
          datasets: [
            {
              data: data.lengths,
              color: () => 'rgba(134, 65, 244, 1)', // Optional color
            },
          ],
        }}
        width={screenWidth - 32} // Adjust for padding
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f7f7f7',
          backgroundGradientTo: '#e8e8e8',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={ContainerStyles.chartItems}
      />

      <Text variant="titleSmall" style={{color: colors.primary}}>
        Weight vs Age
      </Text>
      <LineChart
        data={{
          labels: data.ages.map(String),
          datasets: [
            {
              data: data.weights,
              color: () => 'rgba(244, 67, 54, 1)', // Optional color
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f7f7f7',
          backgroundGradientTo: '#e8e8e8',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={ContainerStyles.chartItems}
      />
    </ScrollView>
  );
};

export default BabyGrowthCharts;
