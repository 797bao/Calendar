import React, { useState } from "react";
import {
  DatePickerIOS,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import ColorPalette from "react-native-color-palette";
import { Button } from "react-native-paper";
import procData from "../services/procData";
import { Dimensions } from "react-native";
let hourSize = Dimensions.get("window").height / 13.34;

const colors = ["#C0392B", "#E74C3C", "#9B59B6", "#8E44AD", "#2980B9"];

const AddEventView = (props) => {
  const [chosenStartDate, setChosenStartDate] = useState(new Date());
  const [chosenEndDate, setChosenEndDate] = useState(new Date());
  const [title, onChangeTitle] = React.useState("Event");
  const [subtitle, onChangeSubtitle] = React.useState("Subtitle");
  const [color, setSelectedColor] = useState("#C0392B");

  let dateKey = new Date(chosenStartDate);
  dateKey.setHours(0, 0, 0, 0);

  const addEventListener = () => {
    let newData = {
      title: title,
      subtitle: subtitle,
      start: chosenStartDate,
      end: chosenEndDate,
      color: color,
    };

    props.route.params.updateData(dateKey, newData);
    props.navigation.navigate("DailyView", {
      data: props.route.params.loggedData,
    });
  };

  const removeEventListener = () => {
    //props.route.params.removeData(dateKey);
    props.navigation.navigate("DailyView", {
      data: props.route.params.loggedData,
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        <DatePickerIOS date={chosenStartDate} onDateChange={setChosenStartDate} />
        <Text>End</Text>
        <DatePickerIOS date={chosenEndDate} onDateChange={setChosenEndDate} />
        <ColorPalette
          onChange={setSelectedColor}
          defaultColor={color}
          colors={colors}
          title={"Set Color"}
          icon={<Text>✔</Text>}
        />
        <Button mode="contained" onPress={addEventListener}>
          Add Event
        </Button>
       
        <Text>{"\n"}</Text>
        <Button style={{color: "red"}} mode="contained" onPress={removeEventListener}>
          Discard
        </Button>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddEventView;
