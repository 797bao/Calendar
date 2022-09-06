
import React, { useState } from 'react';
import {DatePickerIOS, View, StyleSheet, SafeAreaView, Text, TextInput} from 'react-native';
//import NativeColorPicker from 'native-color-picker';
import ColorPalette from 'react-native-color-palette'
import { Button } from 'react-native-paper';

const colors = [
   '#C0392B',
    '#E74C3C',
    '#9B59B6',
    '#8E44AD',
    '#2980B9'
  ];

const AddEvent = () => {
    const [chosenStartDate, setChosenStartDate] = useState(new Date());
    const [chosenEndDate, setChosenEndDate] = useState(new Date());
    const [title, onChangeTitle] = React.useState("Event");
    const [subtitle, onChangeSubtitle] = React.useState("Subtitle");
    const [color, setSelectedColor] = useState('#C0392B');

    const onClickHandler = () => {
        //TODO: Add event to calendar
        console.log("Title: " + title);
        console.log("Subtitle: " + subtitle);
        console.log("Color: " + color);
        console.log("Start Date: " + chosenStartDate);
        console.log("End Date: " + chosenEndDate);
    }

    return (
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeSubtitle}
        value={subtitle}
        />
        <Text>Start</Text>
        <DatePickerIOS
          date={chosenStartDate}
          onDateChange={setChosenStartDate}
        />
        <Text>End</Text>
        <DatePickerIOS
          date={chosenEndDate}
          onDateChange={setChosenEndDate}
        />
          <ColorPalette
            onChange={setSelectedColor}
            defaultColor={color}
            colors={colors}
            title={"Set Color"}
            icon={
                <Text>✔</Text>
            }
        />
        <Button mode="contained" onPress={onClickHandler}>
            Add Event
        </Button>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
  });


  export default AddEvent;