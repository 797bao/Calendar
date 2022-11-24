import * as React from "react";
import { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
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
let barHeight = Dimensions.get("window").height / 13; //16 bars for the whole window

function MetricsScreen({ navigation }) {
  const [data3, setData3] = useState([
    { x: "chrome", y: 30 },
    { x: "safari", y: 180 },
    { x: "firefox", y: 200 },
    { x: "edge", y: 120 },
    { x: "others", y: 100 },
  ]);

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
      <VictoryChart
        stroke
        height={barHeight * 4}
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

/**
function MetricsScreen({ navigation }) {
  return (
    <View style={{ paddingTop: 100 }}>
      <XAxis
        style={{ paddingLeft: 30, width: width * 0.93 }}
        data={xAxis}
        formatLabel={(value, index) => index}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 13, fill: "gray" }}
      ></XAxis>
      <View style={{ flexDirection: "row", paddingLeft: 20 }}>
        <YAxis
          //style={{ width: 20, height: 200 }}
          data={dataTest}
          svg={{
            fill: "black",
            fontSize: 15,
          }}
          contentInset={{ top: 25, bottom: 25 }}
          formatLabel={(value) => `${value}   `}
          numberOfTicks={6}
        />

        <StackedBarChart
          style={{ height: height, width: width * 0.8 }}
          keys={keys}
          colors={colors}
          contentInset={{ top: 10, bottom: 10 }}
          horizontal={true}
          spacingInner={0.25}
          data={data}
          xMax={10}
          ymax={10}
        >
          <Grid data={[1, 2, 3, 4]} direction={Grid.Direction.VERTICAL} />
        </StackedBarChart>
      </View>
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
