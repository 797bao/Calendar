import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";

let days = [];
let months = [];
let firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let startingMonthAmount = 5; //initialize with X amount of months

//initializing the dates
for (let i = 0; i < startingMonthAmount; i++)
{
  let startingDayOfMonth = new Date(firstDayOfMonth); //the first, top-left day in said grid
  months.push(startingDayOfMonth.toLocaleString('default', { month: 'long' })); 
  startingDayOfMonth.setDate(startingDayOfMonth.getDate() - startingDayOfMonth.getDay())
  for (let x = 0; x < 7; x++) //7 columns for S, M, T, W, T, F, S
  {
    let columnDay = new Date(startingDayOfMonth);
    columnDay.setDate(columnDay.getDate() + x);
    let columnDays = []; 
    columnDays.push(columnDay.getDate()); //push the 1st row of the column

    for (let y = 0; y < 5; y++) //5 more rows in each column, 1 week apart
    {
      columnDay.setDate(columnDay.getDate() + 7); 
      columnDays.push(columnDay.getDate());
    }
    days.push(columnDays);
  }
  firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1); //next month
}

export default function App() {

  //populateDates();
  const [month, setMonth] = useState(months[0]);
  const renderList = ({ item,index }) => {
    return (
      <View style = {styles.viewListItem}>
        <View>
          <Text  style={styles.listItem}>{item[0]}</Text>
        </View>
        <View>
          <Text  style={styles.listItem}>{item[1]}</Text>
        </View>
        <View>
          <Text  style={styles.listItem}>{item[2]}</Text>
        </View>
        <View>
          <Text  style={styles.listItem}>{item[3]}</Text>
        </View>
        <View>
          <Text  style={styles.listItem}>{item[4]}</Text>
        </View>
        <View>
          <Text  style={styles.listItem}>{item[5]}</Text>
        </View>
      </View>
      
    )
  };

  return (
    <SafeAreaView style = {styles.container}>
      <SafeAreaView style={styles.viewMonth}>
        <Text style = {styles.textMonth}>{month}</Text>
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
          data={days} 
          pagingEnabled
          style = {styles.days}
          horizontal
          renderItem={renderList}
          onScroll = {(event) => {
            const scrollOffset = event.nativeEvent.contentOffset.x
            const scrollBarWidth = event.nativeEvent.layoutMeasurement.width;
            let monthIndex = Math.round(scrollOffset/scrollBarWidth)
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
  },
  viewListItem: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 18,
    width: 53.5,
    height: 110,
    fontSize: 13,
    backgroundColor: '#FFFBFF',
    margin: 1,
  },
  days: {
    flex:1,
    backgroundColor: '#E1E2EC',
  }
});
