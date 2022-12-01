import * as React from "react";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  MaskedViewComponent,
} from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";
import DeleteEventView from "./components/DeleteEventView";
import procData from "./services/procData";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateActivityView from "./components/CreateActivityView";
import MetricsView from "./components/MetricsView";

import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import AllJournals from "./components/AllJournals";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";
import Svg from "react-native-svg";
import { StackedBarChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryStack,
  VictoryArea,
  VictoryAxis,
  VictoryTooltip,
  VictoryPie,
} from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "./components/MetricsHeader";
import { PropTypes } from "prop-types";
import Colors from "./constants/colors";

let hourSize = Dimensions.get("window").height / 13.34;
const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const loggedItems = new Map();
const allActivities = new Map();
let activityTotals = new Map();

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
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <TabNavigator />
    </ApplicationProvider>
  );
}

const data = [
  {
    month: new Date(2015, 0, 1),
    apples: 1,
    bananas: 1,
    cherries: 1,
    dates: 1,
  },
  {
    month: new Date(2015, 1, 1),
    apples: 2,
    bananas: 2,
    cherries: 2,
    dates: 2,
  },
  {
    month: new Date(2015, 2, 1),
    apples: 2,
    bananas: 2,
    cherries: 2,
    dates: 2,
  },
  {
    month: new Date(2015, 3, 1),
    apples: 2,
    bananas: 2,
    cherries: 2,
    dates: 2,
  },
  {
    month: new Date(2015, 3, 1),
    apples: 2,
    bananas: 2,
    cherries: 2,
    dates: 2,
  },
  {
    month: new Date(2015, 3, 1),
    apples: 2,
    bananas: 2,
    cherries: 2,
    dates: 4,
  },
];

let width = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();
function Draw() {
  return (
    <Drawer.Navigator initialRouteName="Calendar">
      <Drawer.Screen name="Add Event View" component={AddEventView} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="MonthlyView" component={MonthlyView} />
    </Drawer.Navigator>
  );
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const graphicColor = ["#9e3c31", "#E5AF36", "#487B1F", "#485D99"];
let barHeight = Dimensions.get("window").height / 23; //23 bars for the whole window

function getDayName(dayNo) {
  const date = new Date();
  date.setDate(dayNo - 1);
  return date.toLocaleString("en-US", { weekday: "short" });
}

let initialData = [];

function displayMonthBars(month, year) {
  let days = getDaysInMonth(month, year);
  //console.log("--------------------DAyS--------");

  let output = [];
  activityTotals = new Map();
  initialData = [];

  for (let i = 0; i < days; i++) {
    let d = new Date(year, month, i + 1);
    let key = d.toString();
    let dayNameShort = "" + getDayName(d.getDay());
    //console.log("DAYA SDAGDASFD  - - " + dayNameShort);
    dayNameShort = dayNameShort.substring(0, 3);
    let xName = "";
    if (d.getDate() >= 10) {
      xName = dayNameShort + " " + d.getDate();
    } else {
      xName = dayNameShort + "  " + d.getDate();
    }
    initialData.push({ x: xName, y: 0 });

    ////console.log("KEY " + key);
    if (loggedItems.has(key)) {
      let arr = loggedItems.get(key);
      let map = new Map();
      for (let x = 0; x < arr.length; x++) {
        //console.log("ELE  " + JSON.stringify(arr[x]));
        let currentActivity = arr[x].color;
        let endTime = arr[x].end.getHours() * 60 + arr[x].end.getMinutes();
        let startTime =
          arr[x].start.getHours() * 60 + arr[x].start.getMinutes();
        let totalHrs = (endTime - startTime) / 60;
        //console.log("TOTAL HRS " + totalHrs);

        if (map.has(currentActivity)) {
          map.set(currentActivity, map.get(currentActivity) + totalHrs);
          //console.log("GET " + map.get(currentActivity));
          //console.log("MAP " + JSON.stringify(map));
        }
        //there exists a similar logged activity

        //initial
        else {
          map.set(currentActivity, totalHrs);
          //console.log("GET " + map.get(currentActivity));
          //console.log("MAP " + JSON.stringify(map));
        }

        if (activityTotals.has(currentActivity))
          activityTotals.set(
            currentActivity,
            activityTotals.get(currentActivity) + totalHrs
          );
        else activityTotals.set(currentActivity, totalHrs);
      }

      let counter = 0;
      for (let [key, value] of map) {
        let newObj = { x: xName, y: value, fill: key };
        if (output.length <= counter) {
          output.push([newObj]);
        } else {
          output[counter].push(newObj);
        }
        counter++;
      }
    }
  }

  for (let [key, value] of activityTotals) {
    let roundedValue = Math.round(value * 10) / 10;
    activityTotals.set(key, roundedValue);
  }
  return output;
}

function renderStack() {
  const arr = displayMonthBars(10, 2022);
  arr.unshift(initialData);

  return arr.map((obj, index) => {
    const key = index;
    //console.log("HOW MANY TIMES");

    return (
      <VictoryBar
        data={arr[index]}
        labels={({ datum }) => {
          if (datum.y != 0) {
            let ret = Math.round(datum.y * 10) / 10;
            if (datum.y >= 1) return ret;
            else return ("" + ret).slice(1);
          }
        }}
        barRatio={0.75}
        labelComponent={
          <VictoryLabel
            dx={({ data, index }) => {
              return -data[index].y * 25;
            }}
            style={{
              fill: "white",
              fontSize: 17,
            }}
          />
        }
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
          },
        }}
        //color="#9e3c31"
      />
    );
  });
}

function MetricsScreen({ navigation }) {
  displayMonthBars(10, 2022); //pie data
  let pieData = [];

  let graphicColor = [];
  let total = 0;

  for (let [key, value] of activityTotals) {
    pieData.push({ x: "" + value, y: value, fill: key });
    graphicColor.push(key);
    total += value;
  }
  total = Math.round(total * 10) / 10;

  return (
    <SafeAreaView>
      <Header
        status_bar={PropTypes.bool}
        accent={Colors.blue}
        left_icon={PropTypes.node}
        header_color={Colors.light_gray}
      />
      <Svg
        width={width}
        height={220}
        viewBox="0 0 400 400"
        style={{ width: "100%", height: "auto" }}
      >
        <VictoryPie
          data={pieData}
          labels={({ datum }) => {
            if (datum.y != 0) return datum.y;
            else return "";
          }}
          padding={50}
          width={width}
          height={220}
          colorScale={graphicColor}
          innerRadius={45}
          style={{
            padding: -20,
            margin: -20,
            labels: {
              fill: (d) => d.datum.fill,
              fontSize: 23,
              fontFamily: "Courier",
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 40 }}
          x={200}
          y={200}
          text={total + "\nHours"}
        />
      </Svg>

      <Text
        style={{
          alignSelf: "center",
          fontSize: 15.5,
          color: "gray",
          fontWeight: "bold",
        }}
      >
        {"Hours"}
      </Text>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 250, //needs to be variable
        }}
      >
        <VictoryChart
          stroke
          height={barHeight * 31}
          padding={{ left: 90, right: 40, top: 30 }}
          domainPadding={{ x: 25 }}
        >
          <VictoryAxis
            color="gray"
            orientation="top"
            stroke={5}
            dependentAxis={true}
            style={{
              grid: { stroke: "grey", strokeWidth: 0.4 },
              axis: { stroke: "white", strokeWidth: 0.01 },
              tickLabels: {
                fontSize: 15.5,
                padding: 5,
                fill: "gray",
              },
            }}
          />
          <VictoryAxis
            invertAxis={true}
            dependentAxis={false}
            style={{
              axis: { stroke: "#756f6a" },
              tickLabels: {
                fontSize: 16.5,
                padding: 12,
                //fontWeight: "bold",
                fontFamily: "Courier",
                fill: "#171717",
              },
            }}
          />
          <VictoryAxis tickFormat={(x) => ``} />
          <VictoryStack sortOrder="ascending" horizontal>
            {renderStack()}
          </VictoryStack>
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

export default function App() {
  console.disableYellowBox = true; //disable warnings of node_modules using deprecated dependencies
  const [log, setLog] = useState(loggedItems);
  const [activities, setActivities] = useState(allActivities);

  //user created a new activity
  const pushActivity = (activityName, activityColor) => {
    //add duplication handling
    allActivities.set(activityName, activityColor);
    setActivities(allActivities);
    //console.log("ALL ACTIVTIES " + JSON.stringify(allActivities));
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

    let mappedData = this.state.log.get(key);
    console.log(this.state.log.get(key));
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
      //console.log("mapped Data");
      //console.log(JSON.stringify(mappedData));
    }
  };

  function drawers() {
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
              <Stack.Navigator
                initialRouteName="Day"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Drawer" component={drawers} />
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
          component={function metric() {
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
    </NavigationContainer>
  );
}
