import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { AppContext, ContextProvider } from "./ContextProvider";
import { PropTypes } from "prop-types";
import Colors from "../constants/colors";

//an array holding array of numbers for each day, each month holds 7 arrays of 6 numbers in each aray
let days = [];
let months = [];

appendMonths(12);

//adding future months
function appendMonths(monthAmount) {
  let firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  if (days.length != 0) {
    let lastMonth = months[months.length - 1]; //last month in the populated list
    firstDayOfMonth = new Date(lastMonth);
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
  }
  for (let i = 0; i < monthAmount; i++) {
    months.push(new Date(firstDayOfMonth));
    days = [...days, ...initializeDaysForMonth(firstDayOfMonth)];
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1); //next month
  }
}

//adding previous months
function prependMonths(monthAmount) {
  let firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  if (days.length != 0) {
    let lastMonth = months[0]; //last month in the populated list
    firstDayOfMonth = new Date(lastMonth);
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - 1); //previous months
  }
  for (let i = 0; i < monthAmount; i++) {
    months.unshift(new Date(firstDayOfMonth));
    days = [...initializeDaysForMonth(firstDayOfMonth), ...days];
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - 1); //next month
  }
}

function initializeDaysForMonth(firstDayOfMonth) {
  //the first cell, top-left corner day in said grid, does not mean the the 1st of each month
  let startingDayOfMonth = new Date(firstDayOfMonth);
  startingDayOfMonth.setDate(
    startingDayOfMonth.getDate() - startingDayOfMonth.getDay()
  );

  let daysForMonth = [];
  for (let x = 0; x < 7; x++) {
    //7 columns for S, M, T, W, T, F, S
    let columnDay = new Date(startingDayOfMonth);
    columnDay.setDate(columnDay.getDate() + x);
    let columnDays = [];
    columnDays.push(new Date(columnDay)); //push the 1st row of the column

    for (let y = 0; y < 5; y++) {
      //5 more rows in each column, 1 week apart
      columnDay.setDate(columnDay.getDate() + 7);
      columnDays.push(new Date(columnDay));
    }
    daysForMonth.push(columnDays);
  }
  return daysForMonth;
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

//the generated data is displayed in a horizontal flatlist
export default function MonthlyView(props) {
  const pressDay = (day) => {
    //console.log("PRESSED " + months[0]); //TODO: for Farzin, implement the routes
  };

  const [month, setMonth] = useState(months[0]);
  console.log(JSON.stringify(month));

  const renderList = ({ item, index }) => {
    return (
      <View style={styles.viewListItem}>
        <TouchableOpacity onPress={() => pressDay(item[0])}>
          <Text style={styles.listItem}>{item[0].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[1])}>
          <Text style={styles.listItem}>{item[1].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[2])}>
          <Text style={styles.listItem}>{item[2].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[3])}>
          <Text style={styles.listItem}>{item[3].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[4])}>
          <Text style={styles.listItem}>{item[4].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[5])}>
          <Text style={styles.listItem}>{item[5].getDate()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function monthString() {
    let m = month.getMonth();
    let y = month.getFullYear();

    return monthNames[m] + " " + y;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.viewMonth}>
        <TouchableOpacity
          onPress={() => {
            //console.log("DRAWER");
            props.navigation.openDrawer();
          }}
        >
          <Image
            style={headerStyles.image}
            source={require("../icons/Sidebar.png")}
          />
        </TouchableOpacity>

        <Text
          style={{ flexDirection: "row", alignSelf: "center", fontSize: 25 }}
        >
          {monthString()}
        </Text>
      </SafeAreaView>
      <SafeAreaView style={styles.viewDaysOfWeek}>
        <Text style={styles.textDaysOfWeek}>S</Text>
        <Text style={styles.textDaysOfWeek}>M</Text>
        <Text style={styles.textDaysOfWeek}>T</Text>
        <Text style={styles.textDaysOfWeek}>W</Text>
        <Text style={styles.textDaysOfWeek}>T</Text>
        <Text style={styles.textDaysOfWeek}>F</Text>
        <Text style={styles.textDaysOfWeek}>S</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.viewListItem}>
        <FlatList
          data={days} //the generated data
          pagingEnabled
          style={styles.days}
          horizontal
          renderItem={renderList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //change the text of month based on scroll distance
          onScroll={(event) => {
            const scrollOffset = event.nativeEvent.contentOffset.x;
            const scrollBarWidth = event.nativeEvent.layoutMeasurement.width;
            let monthIndex = Math.round(scrollOffset / scrollBarWidth);

            if (monthIndex < 0)
              //keeping it in bounds
              monthIndex = 0;
            else if (monthIndex >= months.length)
              monthIndex = months.length - 1;

            setMonth(months[monthIndex]);
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBFF",
  },
  viewMonth: {
    flex: 0.05,
  },
  textMonth: {
    alignSelf: "center",
    paddingLeft: "6.15%",
    fontSize: 23,
  },
  viewDaysOfWeek: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    flex: 0.0365,
    fontSize: 13,
    backgroundColor: "#FFFBFF",
  },
  textDaysOfWeek: {
    paddingLeft: "6.15%",
    fontSize: 13,
    flex: 1,
  },
  viewListItem: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 18,
    width: 53.75,
    height: 105,
    fontSize: 13,
    backgroundColor: "#FFFBFF",
    margin: 1,
  },
  days: {
    flex: 1,
    backgroundColor: "#E1E2EC",
  },
});

const headerStyles = StyleSheet.create({
  image: {
    flexDirection: "row",
    marginLeft: 18,
    width: 20,
    height: 20,
  },
});
