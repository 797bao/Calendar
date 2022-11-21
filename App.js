import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";
import procData from "./services/procData";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import AllJournals from "./components/AllJournals";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";

let hourSize = Dimensions.get("window").height / 13.34;
const { Navigator, Screen } = createBottomTabNavigator();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const loggedItems = new Map();
loggedItems.set(
  new Date(2022, 10, 20).toString(),
  procData(
    [
      {
        title: "TEST",
        subtitle: "",
        start: new Date(2022, 10, 20, 2, 21),
        end: new Date(2022, 10, 20, 4, 0),
        color: "#aa0000",
      },
    ],
    hourSize
  )
);

loggedItems.set(
  new Date(2022, 10, 21).toString(),
  procData(
    [
      {
        title: "Lunch Appointment",
        subtitle: "With John",
        start: new Date(2022, 10, 21, 1, 21),
        end: new Date(2022, 10, 21, 7, 20),
        color: "#390099",
      },
      {
        title: "Lunch Appointment",
        subtitle: "With Bao",
        start: new Date(2022, 10, 21, 4, 20),
        end: new Date(2022, 10, 21, 5, 20),
        color: "#ffff00",
      },
    ],
    hourSize
  )
);

loggedItems.set(
  new Date(2022, 10, 28).toString(),
  procData(
    [
      {
        title: "Lunch Appointment",
        subtitle: "With John",
        start: new Date(2022, 10, 28, 1, 21),
        end: new Date(2022, 10, 28, 6, 0),
        color: "#ff0000",
      },
    ],
    hourSize
  )
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    tabBarVisible={false}
    headerShown={false}
  >
    <BottomNavigationTab title="Create" />
    <BottomNavigationTab title="All Notes" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Create" component={CreateNote} />
    <Screen name="AllJournals" component={AllJournals} headerShown={false} />
    <Screen name="Note" component={Note} />
  </Navigator>
);

function JournalScreen({ navigation }) {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <TabNavigator />
    </ApplicationProvider>
  );
}

function CalendarScreen() {
  return (
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
  );
}

function MetricsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Metrics Screen Work In Progress"
        onPress={() => console.log("placeholder")}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Metrics" component={MetricsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
