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
import Header from "./MetricsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { PropTypes } from "prop-types";
import Colors from "../constants/colors";
import Svg from "react-native-svg";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

let width = Dimensions.get("window").width;
let barHeight = Dimensions.get("window").height / 23; //23 bars for the whole window
let activityTotals = new Map();
let initialData = [];
import React, { useState } from "react";

let metricDate = new Date();
for (let i = 0; i < carouselLength; i++) {
  if (i >= carouselLength / 2) {
    let month = (dayView.getMonth() + i - carouselLength) % 12;
    carousel[i] = new Date(
      dayView.getFullYear(),
      dayView.getMonth(),
      dayView.getDate() + i - carouselLength
    );
  } else {
    carousel[i] = new Date(
      dayView.getFullYear(),
      dayView.getMonth(),
      dayView.getDate() + i
    );
  }
}

function displayMonthBars(month, year, property) {
  let days = getDaysInMonth(month, year);
  ////console.log("--------------------DAyS--------");
  let output = [];
  activityTotals = new Map();
  initialData = [];

  for (let i = 0; i < days; i++) {
    let d = new Date(year, month, i + 1);
    let key = d.toString();
    let dayNameShort = "" + getDayName(d.getDay());
    ////console.log("DAYA SDAGDASFD  - - " + dayNameShort);
    dayNameShort = dayNameShort.substring(0, 3);
    let xName = "";
    if (d.getDate() >= 10) {
      xName = dayNameShort + " " + d.getDate();
    } else {
      xName = dayNameShort + "  " + d.getDate();
    }
    initialData.push({ x: xName, y: 0 });

    if (property.has(key)) {
      let arr = property.get(key);

      let map = new Map();
      for (let x = 0; x < arr.length; x++) {
        ////console.log("ELE  " + JSON.stringify(arr[x]));
        let currentActivity = arr[x].color;
        let endTime = arr[x].end.getHours() * 60 + arr[x].end.getMinutes();
        let startTime =
          arr[x].start.getHours() * 60 + arr[x].start.getMinutes();
        let totalHrs = (endTime - startTime) / 60;
        ////console.log("TOTAL HRS " + totalHrs);

        if (map.has(currentActivity)) {
          map.set(currentActivity, map.get(currentActivity) + totalHrs);
          ////console.log("GET " + map.get(currentActivity));
          ////console.log("MAP " + JSON.stringify(map));
        }
        //there exists a similar logged activity

        //initial
        else {
          map.set(currentActivity, totalHrs);
          ////console.log("GET " + map.get(currentActivity));
          ////console.log("MAP " + JSON.stringify(map));
        }

        if (activityTotals.has(currentActivity))
          activityTotals.set(
            currentActivity,
            activityTotals.get(currentActivity) + totalHrs
          );
        else activityTotals.set(currentActivity, totalHrs);
      }
      /// //console.log("test");
      //
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

function renderStack(props) {
  const arr = displayMonthBars(10, 2022, props);

  arr.unshift(initialData);

  return arr.map((obj, index) => {
    const key = index;
    ////console.log("HOW MANY TIMES");

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

function getDayName(dayNo) {
  const date = new Date();
  date.setDate(dayNo - 1);
  return date.toLocaleString("en-US", { weekday: "short" });
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const MetricsView = (props) => {
  const [log, setLog] = useState(props.route.params.loggedData);
  displayMonthBars(10, 2022, log); //nov 2022
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
            {renderStack(log)}
          </VictoryStack>
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MetricsView;
