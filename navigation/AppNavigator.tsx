import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import { ThemeContext } from '../context/ThemeContext';
import { TouchableOpacity, Text } from 'react-native';

export type RootStackParamList = {
  JobFinderScreen: undefined;
  SavedJobsScreen: undefined; 
  ApplicationFormScreen: { job?: any; fromSaved?: boolean } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            color: theme.colors.text,
          },
        }}
      >
        <Stack.Screen
          name="JobFinderScreen"
          component={JobFinderScreen}
          options={{
            title: 'Job Finder',
            headerRight: () => (
              <HeaderThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} theme={theme} />
            ),
          }}
        />
        <Stack.Screen
          name="SavedJobsScreen"
          component={SavedJobsScreen}
          options={{
            title: 'Saved Jobs',
            headerRight: () => (
              <HeaderThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} theme={theme} />
            ),
          }}
        />
        <Stack.Screen
          name="ApplicationFormScreen"
          component={ApplicationFormScreen}
          options={{
            title: 'Apply',
            headerRight: () => (
              <HeaderThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} theme={theme} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// dark mode moment na di parin gumagana
type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
  theme: any;
};

const HeaderThemeToggle: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode, theme }) => (
  <TouchableOpacity
    onPress={toggleTheme}
    style={{ marginRight: 10 }}
  >
    <Text style={{ color: theme.colors.text }}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Text>
  </TouchableOpacity>
);

export default AppNavigator;
