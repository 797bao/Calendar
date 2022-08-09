import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";

const days2 = [ [26, 3, 10, 17, 24 , 31], [27, 4, 11, 18, 25, 1], [28, 5, 12, 19, 26, 2], [29, 6, 13, 20, 27, 3],
                [30, 7, 14, 21, 28, 4], [1, 8, 15, 22, 29, 5], [2, 9, 16, 23, 30, 6], [31, 7, 14, 21, 28, 4],
                [1, 8, 15, 22, 29, 5], [2, 9, 16, 23, 30, 6], [3, 10, 17, 24, 31, 7], [4, 11, 18, 25, 1, 8],
                [5, 12, 19, 26, 2, 9], [6, 13, 20, 27, 3, 10], [28, 4, 11, 18, 25, 2], [29, 5, 12, 19, 26, 3],
                [30, 6, 13, 20, 27, 4], [31, 7, 14, 21, 28, 5], [1, 8, 15, 22, 29, 6], [2, 9, 16, 23, 30, 7],
                [3, 10, 17, 24, 1, 8]];
const months = [ 'July', 'August', 'September']


export default function App() {

  const [month, setMonth] = useState('July');
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
          data={days2} 
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
