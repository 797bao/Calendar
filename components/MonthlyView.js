<<<<<<< HEAD
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
=======
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
>>>>>>> master
import React, { useEffect, useState } from "react";

//an array holding array of numbers for each day, each month holds 7 arrays of 6 numbers in each aray
let days = [];
let months = [];

appendMonths(2);

//adding future months
function appendMonths(monthAmount) {
<<<<<<< HEAD
  let firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
=======
  let firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
>>>>>>> master
  if (days.length != 0) {
    let lastMonth = months[months.length - 1]; //last month in the populated list
    firstDayOfMonth = new Date(lastMonth);
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
  }
  for (let i = 0; i < monthAmount; i++) {
<<<<<<< HEAD
    months.push(new Date(firstDayOfMonth));
    days = [...days, ...initializeDaysForMonth(firstDayOfMonth)];
=======
    months.push(new Date(firstDayOfMonth)); 
    days = [...days, ...initializeDaysForMonth(firstDayOfMonth)]
>>>>>>> master
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1); //next month
  }
}

//adding previous months
function prependMonths(monthAmount) {
<<<<<<< HEAD
  let firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
=======
  let firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
>>>>>>> master
  if (days.length != 0) {
    let lastMonth = months[0]; //last month in the populated list
    firstDayOfMonth = new Date(lastMonth);
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - 1); //previous months
  }
  for (let i = 0; i < monthAmount; i++) {
    months.unshift(new Date(firstDayOfMonth));
<<<<<<< HEAD
    days = [...initializeDaysForMonth(firstDayOfMonth), ...days];
=======
    days = [...initializeDaysForMonth(firstDayOfMonth), ...days]
>>>>>>> master
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() - 1); //next month
  }
}

function initializeDaysForMonth(firstDayOfMonth) {
  //the first cell, top-left corner day in said grid, does not mean the the 1st of each month
<<<<<<< HEAD
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
=======
  let startingDayOfMonth = new Date(firstDayOfMonth); 
  startingDayOfMonth.setDate(startingDayOfMonth.getDate() - startingDayOfMonth.getDay());

  let daysForMonth = [];
  for (let x = 0; x < 7; x++) {//7 columns for S, M, T, W, T, F, S
    let columnDay = new Date(startingDayOfMonth);
    columnDay.setDate(columnDay.getDate() + x);
    let columnDays = []; 
    columnDays.push(new Date(columnDay)); //push the 1st row of the column

    for (let y = 0; y < 5; y++) {//5 more rows in each column, 1 week apart
      columnDay.setDate(columnDay.getDate() + 7); 
>>>>>>> master
      columnDays.push(new Date(columnDay));
    }
    daysForMonth.push(columnDays);
  }
  return daysForMonth;
}

//the generated data is displayed in a horizontal flatlist
export default function MonthlyView() {
<<<<<<< HEAD
  const pressDay = (day) => {
    console.log("PRESSED " + months[0]); //TODO: for Farzin, implement the routes
  };

  const [month, setMonth] = useState(months[0]);

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

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.viewMonth}>
        <Text style={styles.textMonth}>
          {month.toLocaleString("default", { month: "long" })}
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
          //change the text of month based on scroll distance
          onScroll={(event) => {
            const scrollOffset = event.nativeEvent.contentOffset.x;
            const scrollBarWidth = event.nativeEvent.layoutMeasurement.width;
            let monthIndex = Math.round(scrollOffset / scrollBarWidth);

            if (monthIndex < 0)
              //keeping it in bounds
              monthIndex = 0;
=======

  const pressDay = (day) => {
    console.log("PRESSED " + months[0]); //TODO: for Farzin, implement the routes 
  }

  const [month, setMonth] = useState(months[0]);


  const renderList = ({ item,index }) => {
    return (
      <View style = {styles.viewListItem}>
        <TouchableOpacity  onPress={() => pressDay(item[0])}>
          <Text  style={styles.listItem}>{item[0].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[1])}>
          <Text  style={styles.listItem}>{item[1].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[2])}>
          <Text  style={styles.listItem}>{item[2].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[3])}>
          <Text  style={styles.listItem}>{item[3].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[4])}>
          <Text  style={styles.listItem}>{item[4].getDate()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDay(item[5])}>
          <Text  style={styles.listItem}>{item[5].getDate()}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <SafeAreaView style = {styles.container}>
      <SafeAreaView style={styles.viewMonth}>
        <Text style = {styles.textMonth}>{month.toLocaleString('default', { month: 'long' })}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.viewDaysOfWeek}>
        <Text style ={styles.textDaysOfWeek}>S</Text>
        <Text style ={styles.textDaysOfWeek}>M</Text>
        <Text style ={styles.textDaysOfWeek}>T</Text>
        <Text style ={styles.textDaysOfWeek}>W</Text>
        <Text style ={styles.textDaysOfWeek}>T</Text>
        <Text style ={styles.textDaysOfWeek}>F</Text>
        <Text style ={styles.textDaysOfWeek}>S</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.viewListItem}>

      <FlatList 
          data={days} //the generated data
          pagingEnabled
          style = {styles.days}
          horizontal
          renderItem={renderList}
          //change the text of month based on scroll distance
          onScroll = {(event) => {
            const scrollOffset = event.nativeEvent.contentOffset.x
            const scrollBarWidth = event.nativeEvent.layoutMeasurement.width;
            let monthIndex = Math.round(scrollOffset/scrollBarWidth)

            if (monthIndex < 0) //keeping it in bounds
              monthIndex = 0
>>>>>>> master
            else if (monthIndex >= months.length)
              monthIndex = months.length - 1;

            setMonth(months[monthIndex]);
          }}
<<<<<<< HEAD
        />
=======
         />
>>>>>>> master
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#FFFBFF",
  },
  viewMonth: {
    flex: 0.05,
  },
  textMonth: {
    paddingLeft: "6.15%",
    fontSize: 23,
  },
  viewDaysOfWeek: {
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
=======
    backgroundColor: '#FFFBFF'
  },
  viewMonth: {
    flex: .05
  },
  textMonth: {
    paddingLeft: '6.15%',
    fontSize: 23
  },
  viewDaysOfWeek: {
    alignItems:'center',
    flexDirection: 'row',
    flex: .0365,
    fontSize: 13,
    backgroundColor: '#FFFBFF',
  },
  textDaysOfWeek:{
    paddingLeft: '6.15%',
    fontSize: 13,
    flex: 1
>>>>>>> master
  },
  viewListItem: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 18,
    width: 53.5,
    height: 110,
    fontSize: 13,
<<<<<<< HEAD
    backgroundColor: "#FFFBFF",
    margin: 1,
  },
  days: {
    flex: 1,
    backgroundColor: "#E1E2EC",
  },
});
=======
    backgroundColor: '#FFFBFF',
    margin: 1,
  },
  days: {
    flex:1,
    backgroundColor: '#E1E2EC',
  }
});
>>>>>>> master
