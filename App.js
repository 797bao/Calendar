import * as React from "react";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";
import procData from "./services/procData";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chart } from "react-google-charts";

import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import AllJournals from "./components/AllJournals";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";
import { WebView } from "react-native-webview";

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
        subtitle: "TEST",
        start: new Date(2022, 10, 20, 2, 21),
        end: new Date(2022, 10, 20, 4, 0),
        color: "#aa0000",
      },
      {
        title: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        subtitle: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        start: new Date(2022, 10, 20, 8, 21),
        end: new Date(2022, 10, 20, 12, 20),
        color: "#390099",
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

export const data = [
  ["City", "2010 Population", "2000 Population"],
  ["New York City, NY", 8175000, 8008000],
  ["Los Angeles, CA", 3792000, 3694000],
  ["Chicago, IL", 2695000, 2896000],
  ["Houston, TX", 2099000, 1953000],
  ["Philadelphia, PA", 1526000, 1517000],
];

export const options = {
  title: "Population of Largest U.S. Cities",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
};

function MetricsScreen({ navigation }) {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

/** 
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
*/

let test = "Test";

export default function App() {
  const [log, setLog] = useState(loggedItems);

  const callbackFunction = (chosenStartDate, childData) => {
    console.log("CALLBACK ");
    console.log(" ");
    console.log(chosenStartDate);
    console.log(" ");

    if (loggedItems.get(chosenStartDate.toString()) == null) {
      //if the data doesn't exist
      //create a new entry for that date and push the data
      loggedItems.set(
        chosenStartDate.toString(),
        procData([childData], hourSize)
      );
    } else {
      loggedItems
        .get(chosenStartDate.toString())
        .push(procData([childData], hourSize)[0]);
    }

    setLog(loggedItems);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen
          name="Calendar"
          component={function CalendarScreen() {
            return (
              <Stack.Navigator initialRouteName="DailyView">
                <Stack.Screen name="MonthlyView" component={MonthlyView} />

                <Stack.Screen
                  name="DailyView"
                  component={DailyView}
                  options={{ headerShown: false }}
                  initialParams={{ loggedData: log }}
                />
                <Stack.Screen
                  name="AddEventView"
                  component={AddEventView}
                  initialParams={{
                    loggedData: log,
                    test: test,
                    updateData: callbackFunction,
                  }}
                />
                {(props) => (
                  <AddEventView {...props} loggedItems={loggedItems} />
                )}
              </Stack.Navigator>
            );
          }}
        />
        <Tab.Screen name="Metrics" component={MetricsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
