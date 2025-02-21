import React from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useTheme, Text, Divider} from 'react-native-paper';

import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  data: any;
}

const BabyGrowthCharts = ({data, navigation}: Props) => {
  const {colors, dark} = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: dark ? colors.shadow : colors.background,
    backgroundGradientTo: dark ? colors.scrim : colors.surface,
    decimalPlaces: 1,
    color: () => colors.secondary,
    labelColor: () => colors.tertiary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {},
  };

  return (
    <ScrollView style={ContainerStyles.chartContainer}>
      <Text variant="titleMedium" style={{color: colors.primary}}>
        Length (centimeters) vs Age (months)
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
        chartConfig={chartConfig}
        style={ContainerStyles.chartItems}
      />
      <Divider style={{marginBottom: 20}} />
      <Text variant="titleMedium" style={{color: colors.primary}}>
        Weight (grams) vs Age (months)
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
        chartConfig={chartConfig}
        style={ContainerStyles.chartItems}
      />
    </ScrollView>
  );
};

export default BabyGrowthCharts;
