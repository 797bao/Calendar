import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";

const Stack = createNativeStackNavigator();
/** 
import { useNavigation } from "@react-navigation/native";


const n = useNavigation();

function navigation() {
  return n;
}
*/

function App() {
  //const n = useNavigation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DailyView">
        <Stack.Screen name="MonthlyView" component={MonthlyView} />
        <Stack.Screen
          name="DailyView"
          component={DailyView}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddEventView" component={AddEventView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
