import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
//import TempHome from './components/TempHome';
import MonthlyView from './components/MonthlyView';
import DailyView from './components/DailyView';
import AddEvent from './components/AddEvent';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="MonthlyView" component={MonthlyView} />
        <Stack.Screen name="DailyView" component={DailyView} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
