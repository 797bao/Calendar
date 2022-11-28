import * as React from "react";
import { useState } from "react";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MonthlyView from "./components/MonthlyView";
import DailyView from "./components/DailyView";
import AddEventView from "./components/AddEventView";
import procData from "./services/procData";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateActivityView from "./components/CreateActivityView";

import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import AllJournals from "./components/AllJournals";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";
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

let hourSize = Dimensions.get("window").height / 13.34;
const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const loggedItems = new Map();
const allActivities = new Map();

//default activity is called Event
allActivities.set("Event", "#485D99");
allActivities.set("School", "#9e3c31");

loggedItems.set(
  new Date(2022, 10, 27).toString(),
  procData(
    [
      {
        title: "TEST",
        start: new Date(2022, 10, 27, 2, 21),
        end: new Date(2022, 10, 27, 4, 0),
        color: allActivities.get("Event"),
        activitityName: "Event",
      },
      {
        title: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        start: new Date(2022, 10, 27, 8, 21),
        end: new Date(2022, 10, 27, 12, 20),
        color: allActivities.get("School"),
        activitityName: "School",
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

let height = (Dimensions.get("window").height / 25) * data.length;

const data1 = [1, 2, 3, 4, 5];
const data2 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

const colors = ["#7b4173", "#a55194", "#ce6dbd", "#de9ed6"];
const keys = ["apples", "bananas", "cherries", "dates"];

const contentInset = { top: 20, bottom: 20 };
let width = Dimensions.get("window").width;

const dataTest = [1, 2, 3, 4, 5, 6];
const xAxis = [1, 2, 3, 4, 5];
const style = { width: 20, height: 200 };

const vdata = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

let sampleData = [1, 2, 3, 4, 5];

const graphicColor = ["red", "orange", "green", "blue"];
let barHeight = Dimensions.get("window").height / 23; //23 bars for the whole window

function displayMonthBars(month, year) {
  //0 = jan, dec = 11
  let days = getDaysInMonth(month, year);
  let output = new Array(5);

  for (let i = 0; i < days.length; i++) {
    let key = days[i].toString();
    if (loggedItems.has(key)) {
      //check each day
      let allEntryForDay = loggedItems.get(key);

      for (
        let x = 0;
        x < allEntryForDay;
        x++ //check every logged item in the day
      ) {
        //accumulate the sums of each items activity
      }
    }
    console.log("DAY " + days[i]);
    console.log("DAY --- " + days[i].toString());
    /**
    if (loggedItems.get(days[i]).toString() !== undefined) {
      console.log("GOT ");
      console.log(loggedItems.get(days[i].toString()));
    }
     */
  }
}

function getMonthShortName(monthNo) {
  const date = new Date();
  date.setMonth(monthNo - 1);
  return date.toLocaleString("en-US", { month: "short" });
}

function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function MetricsScreen({ navigation }) {
  displayMonthBars(10, 2022); //nov 2022
  return (
    <SafeAreaView>
      <VictoryPie
        data={[
          { x: "10", y: 10 },
          { x: "11", y: 11 },
          { x: "8", y: 8 },
          { x: "4", y: 4 },
        ]}
        labelRadius={({ innerRadius }) => innerRadius + 4}
        width={width}
        height={250}
        colorScale={graphicColor}
        innerRadius={45}
        style={{
          labels: { fill: "white", fontSize: 20, fontFamily: "Courier" },
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 220, //needs to be variable
        }}
      >
        <VictoryChart
          stroke
          height={barHeight * 31}
          padding={{ left: 90, right: 40, top: 30 }}
          domainPadding={{ x: 25 }}
        >
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
          <VictoryAxis tickFormat={(x) => ``} />
          <VictoryStack sortOrder="ascending" horizontal>
            <VictoryBar
              data={[
                //day 21, activity(red), count, //day 21, activity(red), count-3, //day 21, activity(red), count-3
                { x: "Tue 1", y: 2, fill: "red" },
                { x: "Wed 2", y: 3, fill: "blue" },
                { x: "Thu 3", y: 5, fill: "green" },
                { x: "Fri 4", y: 5, fill: "orange" },
                { x: "Sat 5", y: 5, fill: "red" },
                { x: "Sun 6", y: 2, fill: "red" },
                { x: "Mon 7", y: 3, fill: "blue" },
                { x: "Tue 8", y: 5, fill: "green" },
                { x: "Wed 9", y: 5, fill: "orange" },
                { x: "Thu 10", y: 5, fill: "red" },
                { x: "Fri 11", y: 2, fill: "red" },
                { x: "Sat 12", y: 3, fill: "blue" },
                { x: "Sun 13", y: 5, fill: "green" },
                { x: "Mon 14", y: 5, fill: "orange" },
                { x: "Tue 15", y: 5, fill: "red" },
                { x: "Wed 16", y: 2, fill: "red" },
                { x: "Thu 17", y: 3, fill: "blue" },
                { x: "Fri 18", y: 5, fill: "green" },
                { x: "Sat 19", y: 5, fill: "orange" },
                { x: "Sun 20", y: 5, fill: "red" },
                { x: "Mon 21", y: 5, fill: "red" },
                { x: "Tue 22", y: 2, fill: "red" },
                { x: "Wed 23", y: 3, fill: "blue" },
                { x: "Thu 24", y: 5, fill: "green" },
                { x: "Fri 25", y: 5, fill: "orange" },
                { x: "Sat 26", y: 5, fill: "red" },
                { x: "Sun 27", y: 2, fill: "red" },
                { x: "Mon 28", y: 3, fill: "blue" },
                { x: "Tue 29", y: 5, fill: "green" },
                { x: "Thu 30", y: 5, fill: "orange" },
                { x: "Fri 31", y: 5, fill: "red" },
              ]}
              labels={({ datum }) => {
                if (datum.y != 0) return datum.y;
                else return "";
              }}
              barRatio={0.75}
              labelComponent={
                <VictoryLabel
                  dx={({ data, index }) => {
                    return -data[index].y * 17;
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
              //color="red"
            />
            <VictoryBar
              data={[
                //day 21, activity(red), count, //day 21, activity(red), count-3, //day 21, activity(red), count-3
                { x: "Tue 1", y: 4, fill: "orange" },
                { x: "Thu 3", y: 2, fill: "red" },
              ]}
              labels={({ datum }) => {
                if (datum.y != 0) return datum.y;
                else return "";
              }}
              barRatio={0.75}
              labelComponent={
                <VictoryLabel
                  dx={({ data, index }) => {
                    return -data[index].y * 17;
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
              //color="red"
            />
            <VictoryBar
              data={[
                //day 21, activity(red), count, //day 21, activity(red), count-3, //day 21, activity(red), count-3
                { x: "Tue 1", y: 1, fill: "blue" },
                { x: "Wed 2", y: 1, fill: "red" },
                { x: "Thu 3", y: 2, fill: "orange" },
                { x: "Fri 4", y: 3, fill: "green" },
              ]}
              labels={({ datum }) => {
                if (datum.y != 0) return datum.y;
                else return "";
              }}
              barRatio={0.75}
              labelComponent={
                <VictoryLabel
                  dx={({ data, index }) => {
                    return -data[index].y * 17;
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
              //color="red"
            />
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
  const [log, setLog] = useState(loggedItems);
  const [activities, setActivities] = useState(allActivities);

  const setLoggedItems = (chosenStartDate, childData) => {
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

  const pushActivity = (activityName, activityColor) => {
    //add duplication handling
    allActivities.set(activityName, activityColor);
    setActivities(allActivities);
    console.log("ALL ACTIVTIES " + JSON.stringify(allActivities));
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
              <Stack.Navigator
                initialRouteName="DailyView"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="MonthlyView" component={MonthlyView} />
                <Stack.Screen
                  name="DailyView"
                  component={DailyView}
                  options={{ headerShown: false }}
                  initialParams={{ loggedData: log }}
                />
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
