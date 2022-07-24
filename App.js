import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";

export default function App() {

  const days = [26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6];
  const columns = 7;

  const renderList = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{item}</Text>
      </View>
    );
  };

  return (
    
    
    <SafeAreaView style = {styles.container}>
      <Text style = {styles.month}>July</Text>
      <Text>{'\n'}</Text>
      <SafeAreaView style={styles.daysOfWeek}>
        <Text style ={styles.daysOfWeek}>S</Text>
        <Text style ={styles.daysOfWeek}>M</Text>
        <Text style ={styles.daysOfWeek}>T</Text>
        <Text style ={styles.daysOfWeek}>W</Text>
        <Text style ={styles.daysOfWeek}>T</Text>
        <Text style ={styles.daysOfWeek}>F</Text>
        <Text style ={styles.daysOfWeek}>S</Text>
      </SafeAreaView>

      <FlatList 
        data={days} 
        style = {styles.days}
        renderItem={renderList} 
        numColumns = {columns}
      />
      
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFF'
  },
  month: {
    paddingLeft: '6%',
    fontSize: 22
  },
  daysOfWeek: {
    alignItems:'center',
    paddingLeft: '6.5%',
    paddingTop: '0%',
    paddingBottom: '4%',
    flexDirection: 'row',

    flex: 1,
    fontSize: 13,

    backgroundColor: '#FFFBFF',
  },
  listItem: {
    alignItems:'center',
    margin: 0.8,
    fontSize: 13,
    backgroundColor: '#FFFBFF',
    height: 110.5,
    flex: 1
  },
  days: {
    
    backgroundColor: '#E1E2EC',
  }
});
