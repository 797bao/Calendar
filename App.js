import * as React from "react";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";
import DeleteEventView from "./components/DeleteEventView";
import procData from "./services/procData";
import { Dimensions, LogBox } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateActivityView from "./components/CreateActivityView";
import MetricsView from "./components/MetricsView";
import LoginScreen from "./components/login";

import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import AllJournals from "./components/AllJournals";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

let hourSize = Dimensions.get("window").height / 13.34;
const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const loggedItems = new Map();
const allActivities = new Map();

//default activity is called Event
allActivities.set("Event", "#485D99");
allActivities.set("School", "#9e3c31");
allActivities.set("Gym", "#487B1F");
allActivities.set("Cardio", "#E5AF36");

loggedItems.set(
  new Date(2022, 10, 27).toString(),
  procData(
    [
      {
        title: "BBQ with Friends",
        start: new Date(2022, 10, 27, 2, 21),
        end: new Date(2022, 10, 27, 4, 0),
        color: allActivities.get("Event"),
        activityName: "Event",
      },
      {
        title: "SE classes",
        start: new Date(2022, 10, 27, 8, 21),
        end: new Date(2022, 10, 27, 12, 20),
        color: allActivities.get("School"),
        activityName: "School",
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
  console.log("JOURNAL SCREEN RE-RENDER");
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <TabNavigator />
    </ApplicationProvider>
  );
}

function loginScreen({ navigation }) {
  return (
    <LoginScreen
      logoImageSource={require("./icons/snack-icon.png")}
      onLoginPress={() => {
        console.log("navigation " + navigation);
        navigation.navigate("App");
      }}
      onSignupPress={() => {}}
      onEmailChange={() => {}}
      onPasswordChange={() => {}}
    />
  );
}

export default function App() {
  LogBox.ignoreAllLogs(true); //disable warnings of node_modules using deprecated dependencies
  const [log, setLog] = useState(loggedItems);
  const [activities, setActivities] = useState(allActivities);

  //user created a new activity
  const pushActivity = (activityName, activityColor) => {
    //add duplication handling
    allActivities.set(activityName, activityColor);
    setActivities(allActivities);
    ////console.log("ALL ACTIVTIES " + JSON.stringify(allActivities));
  };

  //user logged an activity
  const setLoggedItems = (key, childData) => {
    if (loggedItems.get(key.toString()) == null) {
      //if the data doesn't exist
      //create a new entry for that date and push the data
      loggedItems.set(key.toString(), procData([childData], hourSize));
    } else {
      loggedItems.get(key.toString()).push(procData([childData], hourSize)[0]);
    }
    setLog(loggedItems);
    console.log("SET LOG ");
  };

  //user deleted an activity
  const deleteLoggedItem = (dataToDelete) => {
    let key = new Date(
      dataToDelete.start.getFullYear(),
      dataToDelete.start.getMonth(),
      dataToDelete.start.getDate()
    );
    key.setHours(0, 0, 0, 0);
    key = key.toString();

    let mappedData = log.get(key);
    //console.log(log.get(key));
    for (let i = 0; i < mappedData.length; i++) {
      if (
        mappedData[i].start == dataToDelete.start &&
        mappedData[i].end == dataToDelete.end &&
        mappedData[i].activity == dataToDelete.activity &&
        mappedData[i].title == dataToDelete.title &&
        mappedData[i].subtitle == dataToDelete.subtitle
      ) {
        mappedData.splice(i, 1);
      }
    }
  };

  function Drawers() {
    return (
      <Drawer.Navigator
        initialRouteName="Day"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Day"
          component={DailyView}
          options={{ headerShown: false, animationEnabled: true }}
          initialParams={{ loggedData: log }}
        />
        <Drawer.Screen name="Month" component={MonthlyView} />

        <Drawer.Screen
          name="Create Activity"
          component={CreateActivityView}
          options={{ headerShown: false }}
          initialParams={{
            activity: activities,
            updateData: pushActivity,
          }}
        />
        {(props) => <AddEventView {...props} loggedItems={loggedItems} />}
      </Drawer.Navigator>
    );
  }

  function appScreen() {
    return (
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Journal" component={JournalScreen} />
        <Tab.Screen
          name="Calendar"
          component={function CalendarScreen() {
            console.log("CALENDAR SCREEN Re-render");
            return (
              <Stack.Navigator
                initialRouteName="Day"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Drawer" component={Drawers} />
                <Drawer.Screen name="Month" component={MonthlyView} />
                <Stack.Screen
                  name="CreateActivityView"
                  component={CreateActivityView}
                  options={{ headerShown: false }}
                  initialParams={{
                    activity: activities,
                    updateData: pushActivity,
                  }}
                />
                <Stack.Screen
                  name="AddEventView"
                  component={AddEventView}
                  initialParams={{
                    activity: activities,
                    loggedData: log,
                    updateData: setLoggedItems,
                  }}
                />
                <Stack.Screen
                  name="DeleteEventView"
                  component={DeleteEventView}
                  initialParams={{
                    activity: activities,
                    loggedData: log,
                    updateData: setLoggedItems,
                    removeData: deleteLoggedItem,
                  }}
                />
                {(props) => (
                  <AddEventView {...props} loggedItems={loggedItems} />
                )}
              </Stack.Navigator>
            );
          }}
        />
        <Tab.Screen
          name="Metrics"
          component={function Metric() {
            console.log("METRIC SCREEN Re-render");
            return (
              <Stack.Navigator
                initialRouteName="Metric"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="Metric"
                  component={MetricsView}
                  initialParams={{
                    loggedData: log,
                  }}
                />
              </Stack.Navigator>
            );
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={loginScreen}
          screenOptions={{ headerShown: false }}
        />
        <Stack.Screen
          name="App"
          component={appScreen}
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        {(props) => <loginScreen {...props} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/** 
import * as React from "react";
import LoginScreen from "./components/login";

export default class App extends React.Component {
  render() {
    return (
      <LoginScreen
        logoImageSource={require("./icons/snack-icon.png")}
        onLoginPress={() => {}}
        onSignupPress={() => {}}
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
      />
    );
  }
}
*/
