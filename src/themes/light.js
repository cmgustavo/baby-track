import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3LightTheme} from 'react-native-paper';
import merge from 'deepmerge';

const CustomLightTheme = {
  ...NavigationDefaultTheme,
  dark: false,
};

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: CustomLightTheme,
});

const MD3CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(135, 206, 235)',
    onPrimary: 'rgb(0, 50, 80)',
    primaryContainer: 'rgb(200, 230, 245)',
    onPrimaryContainer: 'rgb(0, 30, 50)',
    secondary: 'rgb(100, 160, 190)',
    onSecondary: 'rgb(0, 40, 60)',
    secondaryContainer: 'rgb(180, 220, 235)',
    onSecondaryContainer: 'rgb(0, 30, 50)',
    tertiary: 'rgb(120, 180, 210)',
    onTertiary: 'rgb(0, 45, 70)',
    tertiaryContainer: 'rgb(190, 225, 240)',
    onTertiaryContainer: 'rgb(0, 30, 50)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(245, 250, 255)',
    onBackground: 'rgb(20, 40, 60)',
    surface: 'rgb(245, 250, 255)',
    onSurface: 'rgb(20, 40, 60)',
    surfaceVariant: 'rgb(220, 235, 245)',
    onSurfaceVariant: 'rgb(50, 80, 100)',
    outline: 'rgb(100, 130, 150)',
    outlineVariant: 'rgb(150, 180, 200)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(40, 60, 80)',
    inverseOnSurface: 'rgb(230, 245, 255)',
    inversePrimary: 'rgb(200, 230, 245)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(235, 245, 250)',
      level2: 'rgb(225, 240, 250)',
      level3: 'rgb(215, 235, 245)',
      level4: 'rgb(205, 230, 240)',
      level5: 'rgb(195, 225, 235)',
    },
    surfaceDisabled: 'rgba(20, 40, 60, 0.12)',
    onSurfaceDisabled: 'rgba(20, 40, 60, 0.38)',
    backdrop: 'rgba(50, 80, 100, 0.4)',
  },
};

const CombinedDefaultTheme = merge(LightTheme, MD3CustomLightTheme);

export default CombinedDefaultTheme;
