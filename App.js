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

let test = "Test";

/** 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateItems = this.updateItems.bind(this);
  }

  updateItems(data) {
    loggedItems = data;
  }

  render() {
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
                    props={loggedItems}
                    component={DailyView}
                    options={{ headerShown: false }}
                    initialParams={{ loggedData: loggedItems }}
                  />
                  <Stack.Screen
                    name="AddEventView"
                    //props={loggedItems}
                    component={AddEventView}
                    initialParams={{
                      loggedData: loggedItems,
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
}
*/

/** 
let callbackFunction = (chosenStartDate, childData) => {
  const [logs, setLog] = useState(loggedItems);
  console.log("CALLBACK");

  if (loggedItems.get(chosenStartDate) == null) {
    //if the data doesn't exist
    //create a new entry for that date and push the data
    loggedItems.set(
      chosenStartDate.toString(),
      procData([childData], hourSize)
    );
  } else {
    loggedItems
      .get(chosenStartDate.toString())
      .push(procData([childData], hourSize));
  }

  //setLog(loggedItems);
  console.log("LOGGD ITEMS AFT#ER R - - - - -  -- ");
  console.log(loggedItems);
  console.log("LOGGD ITEMS AFT#ER R - - - - -  -- ");
};
*/

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

    console.log("LOGGD ITEMS AFT#ER R - - - - -  -- ");
    console.log(log);
    console.log("LOGGD ITEMS AFT#ER R - - - - -  -- ");
  };

  console.log("MAIN --------------------------------");
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
                  props={loggedItems}
                  component={DailyView}
                  options={{ headerShown: false }}
                  initialParams={{ loggedData: log }}
                />
                <Stack.Screen
                  name="AddEventView"
                  //props={loggedItems}
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

/**
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateItems = this.updateItems.bind(this);
  }

  updateItems(data) {
    loggedItems = data;
  }

  callbackFunction = (chosenStartDate, childData) => {
    const [logs, setLog] = useState(loggedItems);
    console.log("CALLBACK");

    if (loggedItems.get(chosenStartDate) == null) {
      //if the data doesn't exist
      //create a new entry for that date and push the data
      loggedItems.set(
        chosenStartDate.toString(),
        procData([childData], hourSize)
      );
    } else {
      loggedItems
        .get(chosenStartDate.toString())
        .push(procData([childData], hourSize));
    }

    //setLog(loggedItems);
    console.log("LOGGD ITEMS AFT#ER R - - - - -  -- ");
    console.log(loggedItems);
    console.log("LOGGD ITEMS AFT#ER R - - - - -  -- ");
  };

  render() {
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
                    props={loggedItems}
                    component={DailyView}
                    options={{ headerShown: false }}
                    initialParams={{ loggedData: loggedItems }}
                  />
                  <Stack.Screen
                    name="AddEventView"
                    //props={loggedItems}
                    component={AddEventView}
                    initialParams={{
                      loggedData: loggedItems,
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
}
 */

/**
export default function App() {
  //const [data, setData] = useState("data");
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
 */
