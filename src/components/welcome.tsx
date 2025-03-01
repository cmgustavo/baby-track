import React from 'react';
import {View} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';

import {ContainerStyles, TextStyles} from '../styles';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={ContainerStyles.welcomeContainer}>
      <Text
        variant="titleLarge"
        style={[
          TextStyles.title,
          {color: colors.primary, borderColor: colors.surfaceVariant},
        ]}>
        Welcome to <Text style={TextStyles.highlight}>Baby Tracker</Text>
      </Text>
      <Text style={[TextStyles.subtitle, {color: colors.secondary}]}>
        Get start tracking your baby's growth and vaccine schedule.
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('AddBaby');
        }}>
        Add baby
      </Button>
    </View>
  );
};

export default Welcome;
