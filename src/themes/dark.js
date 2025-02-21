import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3DarkTheme} from 'react-native-paper';
import merge from 'deepmerge';

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
};

const {DarkTheme} = adaptNavigationTheme({
  reactNavigationDark: CustomDarkTheme,
});

const MD3CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(120, 180, 210)',
    onPrimary: 'rgb(0, 30, 50)',
    primaryContainer: 'rgb(70, 130, 160)',
    onPrimaryContainer: 'rgb(220, 240, 255)',
    secondary: 'rgb(150, 200, 220)',
    onSecondary: 'rgb(20, 50, 70)',
    secondaryContainer: 'rgb(80, 140, 170)',
    onSecondaryContainer: 'rgb(220, 240, 255)',
    tertiary: 'rgb(130, 190, 215)',
    onTertiary: 'rgb(10, 40, 60)',
    tertiaryContainer: 'rgb(90, 150, 180)',
    onTertiaryContainer: 'rgb(220, 245, 255)',
    error: 'rgb(210, 90, 90)',
    onError: 'rgb(60, 10, 10)',
    errorContainer: 'rgb(130, 60, 60)',
    onErrorContainer: 'rgb(245, 200, 200)',
    background: 'rgb(20, 30, 40)',
    onBackground: 'rgb(210, 230, 240)',
    surface: 'rgb(20, 30, 40)',
    onSurface: 'rgb(210, 230, 240)',
    surfaceVariant: 'rgb(50, 70, 90)',
    onSurfaceVariant: 'rgb(160, 190, 210)',
    outline: 'rgb(110, 140, 160)',
    outlineVariant: 'rgb(80, 110, 130)',
    shadow: 'rgba(10, 20, 30, 0.8)',
    scrim: 'rgba(20, 40, 60, 0.5)',
    inverseSurface: 'rgb(200, 220, 235)',
    inverseOnSurface: 'rgb(30, 50, 70)',
    inversePrimary: 'rgb(180, 220, 240)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(40, 60, 80)',
      level2: 'rgb(50, 70, 90)',
      level3: 'rgb(60, 80, 100)',
      level4: 'rgb(70, 90, 110)',
      level5: 'rgb(80, 100, 120)',
    },
    surfaceDisabled: 'rgba(210, 230, 240, 0.12)',
    onSurfaceDisabled: 'rgba(210, 230, 240, 0.38)',
    backdrop: 'rgba(50, 70, 90, 0.4)',
  },
};

const CombinedDarkTheme = merge(DarkTheme, MD3CustomDarkTheme);

export default CombinedDarkTheme;
