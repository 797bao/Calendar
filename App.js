import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";
import procData from "./services/procData";
import { Dimensions } from "react-native";

let hourSize = Dimensions.get("window").height / 13.34;
console.log("H SIZE " + hourSize);
const Stack = createNativeStackNavigator();

//all the scheduled items (bars) resides in a map, key = day, value = array of all values in that day
//procData adds a new field -> height to offset bars determined by start/end time
const loggedItems = new Map();
loggedItems.set(
  new Date(2022, 8, 25).toString(),
  procData(
    [
      {
        title: "TEST",
        subtitle: "",
        start: new Date(2022, 8, 25, 2, 21),
        end: new Date(2022, 8, 25, 4, 0),
        color: "#aa0000",
      },
    ],
    hourSize
  )
);

loggedItems.set(
  new Date(2022, 8, 26).toString(),
  procData(
    [
      {
        title: "Lunch Appointment",
        subtitle: "With John",
        start: new Date(2022, 8, 26, 1, 21),
        end: new Date(2022, 8, 26, 7, 20),
        color: "#390099",
      },
      {
        title: "Lunch Appointment",
        subtitle: "With Bao",
        start: new Date(2022, 8, 26, 4, 20),
        end: new Date(2022, 8, 26, 5, 20),
        color: "#ffff00",
      },
    ],
    hourSize
  )
);

loggedItems.set(
  new Date(2022, 8, 28).toString(),
  procData(
    [
      {
        title: "Lunch Appointment",
        subtitle: "With John",
        start: new Date(2022, 8, 28, 1, 21),
        end: new Date(2022, 8, 28, 6, 0),
        color: "#ff0000",
      },
    ],
    hourSize
  )
);

function App() {
  console.log("TEST LOGGED ITEMS");
  //console.log(loggedItems.get(new Date(2022, 8, 26).toString()));
  console.log("init " + loggedItems);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DailyView">
        <Stack.Screen name="MonthlyView" component={MonthlyView} />
        <Stack.Screen
          name="DailyView"
          props={loggedItems}
          component={DailyView}
          options={{ headerShown: false }}
          initialParams={{ loggedItems: loggedItems }}
        />
        {(props) => <DailyView {...props} loggedItems={loggedItems} />}
        <Stack.Screen
          name="AddEventView"
          component={AddEventView}
          initialParams={{ loggedItems: loggedItems }}
        />
        {(props) => <DailyView {...props} loggedItems={loggedItems} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
