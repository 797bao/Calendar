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
import Carousel from "react-native-snap-carousel";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";

let width = Dimensions.get("window").width;
let barHeight = Dimensions.get("window").height / 23; //23 bars for the whole window
let activityTotals = new Map();
let initialData = [];
import React, { useState } from "react";
let carouselLength = 3;
let carousel = [];
let metricDate = new Date();
let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

for (let i = 0; i < carouselLength; i++) {
  if (i >= carouselLength / 2) {
    let month = metricDate.getMonth() + i - carouselLength;
    if (month > 11) month -= 12;
    else if (month < 0) month += 12;

    carousel[i] = new Date(metricDate.getFullYear(), month, 1);
    //console.log(">=");
  } else {
    let month = metricDate.getMonth() + i;
    if (month > 11) month -= 12;
    else if (month < 0) month += 12;

    carousel[i] = new Date(metricDate.getFullYear(), month, 1);
  }

  //console.log("carousel " + carousel[i]);
}

function displayMonthBars(month, year, property) {
  let days = getDaysInMonth(year, month);
  ////console.log("--------------------DAyS--------");
  let output = [];
  activityTotals = new Map();
  initialData = [];

  for (let i = 0; i < days; i++) {
    let d = new Date(year, month, i + 1);
    let key = d.toString();

    ////console.log("DAYA SDAGDASFD  - - " + dayNameShort);
    let xName = "";
    if (d.getDate() >= 10) {
      xName = dayNames[d.getDay()] + " " + d.getDate();
    } else {
      xName = dayNames[d.getDay()] + "  " + d.getDate();
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

function renderStack(props, arr) {
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

function getDaysInMonth(year, month) {
  //console.log("year " + year + " month " + month);
  //console.log("DAYS IN MONTH " + new Date(year, month + 1, 0));
  return new Date(year, month + 1, 0).getDate();
}

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//all the scheduled items (bars) resides in a map, key = day, value = array of all values in that day
//procData adds a new field -> height to offset bars determined by start/end time

//shifts content of the carousel 1 day forward by changing the earliest day to the latest day + 1
function appendToList(index) {
  let arrHalfLen = Math.floor(carousel.length / 2);
  //make a new date that is a deep copy of the current day value we are on
  let curDay = new Date(
    carousel[index].getFullYear(),
    carousel[index].getMonth(),
    carousel[index].getDate()
  );

  let appendIndex = (index + arrHalfLen) % carousel.length; //the index of data we want to modify
  carousel[appendIndex] = curDay;
  carousel[appendIndex].setMonth(curDay.getMonth() + arrHalfLen); //add by X months based on carousel's length reac
}

//shifts content of the carousel 1 day backwards by changing the latest day to the earliest day - 1
function prependToList(index) {
  let arrHalfLen = Math.floor(carousel.length / 2);
  //make a new date that is a deep copy of the current day value we are on
  let curDay = new Date(
    carousel[index].getFullYear(),
    carousel[index].getMonth(),
    carousel[index].getDate()
  );

  let prependIndex = mod(index - arrHalfLen, carousel.length); //the index of data we want to modify
  carousel[prependIndex] = curDay;
  carousel[prependIndex].setMonth(curDay.getMonth() - arrHalfLen); //subtract by X days based on carousel's length
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

let loggedData;
export default class MetricsView extends React.Component {
  constructor(props) {
    super(props);
    loggedData = this.props.route.params.loggedData;
    //console.log("navProps " + navProp.navigation);
    //console.log(dataItems);
    this.state = {
      activeIndex: 0,
      carouselItems: carousel,
    };
  }

  _renderItem({ item, index }) {
    let month = item.getMonth();
    let year = item.getFullYear();
    let arr = displayMonthBars(month, year, loggedData); //nov 2022
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
      <View>
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
              tickValues={[2, 4, 6, 8]}
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
              {renderStack(loggedData, arr)}
            </VictoryStack>
          </VictoryChart>
        </ScrollView>
      </View>
    );
  }

  getDateHeader() {
    let month = this.state.carouselItems[this.state.activeIndex].getMonth();
    let year = this.state.carouselItems[this.state.activeIndex].getFullYear();
    console.log("ACTIVE INDEX " + this.state.activeIndex);
    return monthNames[month] + " " + year;
  }

  render() {
    return (
      <SafeAreaView>
        <Text style={{ alignSelf: "center", fontSize: 25 }}>
          {this.getDateHeader()}
        </Text>
        <Carousel
          layout={"default"}
          layoutCardOffset={1}
          ref={(ref) => (this.carousel = ref)}
          loop
          centerContent
          data={this.state.carouselItems}
          enableSnap
          loopClonesPerSide={1} //allows swiping 4x without stopping
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width}
          renderItem={this._renderItem}
          onBeforeSnapToItem={(index) => {
            //console.log("BEFORE SNAPPING ");
            //console.log("navprop " + navProp);
            if (index > this.state.activeIndex) {
              if (this.state.activeIndex == 0 && index == carousel.length - 1)
                prependToList(index);
              //swiping left, was at last index to first index
              else appendToList(index); //swiping right
            } else if (index < this.state.activeIndex) {
              if (this.state.activeIndex == carousel.length - 1 && index == 0)
                appendToList(index);
              //swiping right was at last index now back to first
              else prependToList(index); //swiping left
            }

            //console.log("SETTING STATE BEFORE SNAP ");
            this.setState({ activeIndex: index });
          }}
        />
      </SafeAreaView>
    );
  }
}
