import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import ColorPalette from "react-native-color-palette";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";

// Add a color picker, input for Activity name, and button to save

const addEventListener = () => {
  props.route.params.updateData(dateKey, newData);
  props.navigation.navigate("Day", {
    data: props.route.params.loggedData,
  });
};

let hourSize = Dimensions.get("window").height / 13.34;
const colors = [
  "#C0392B",
  "#E74C3C",
  "#9B59B6",
  "#8E44AD",
  "#2980B9",
  "#3498DB",
  "#1ABC9C",
  "#16A085",
  "#27AE60",
  "#2ECC71",
  "#F1C40F",
  "#F39C12",
  "#E67E22",
  "#D35400",
  "#FFFFFF",
  "#BDC3C7",
  "#95A5A6",
  "#7F8C8D",
  "#34495E",
  "#2C3E50",
  "#000000",
];

const CreateActivityView = (props) => {
  const [color, setSelectedColor] = useState("#C0392B");
  const [activityName, setActivityName] = React.useState("");

  const saveActivityListener = () => {
    //console.log("Add activity");
    //console.log("Activity name: " + activityName);
    //console.log("Activity color: " + color);
    props.route.params.updateData(activityName, color);
    props.navigation.navigate("Day");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.xButton}
          onPress={() => {
            //console.log("ON PRSS ");
            props.navigation.navigate("Day");
          }}
        >
          <Image
            style={{ width: 27, height: 27, marginTop: 5 }}
            source={require("../icons/x.png")}
          />
        </TouchableOpacity>

        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={saveActivityListener}
        >
          Save
        </Button>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text></Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={styles.input}
          maxLength={25}
          placeholder="Enter Activity Name"
          onChangeText={(value) => setActivityName(value)}
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: " 25",
            marginTop: 40,
          }}
        >
          {"Choose Color"}
        </Text>
        <ColorPalette
          style={{
            marginLeft: 100,
            paddingRight: 40,
          }}
          onChange={setSelectedColor}
          defaultColor={color}
          colors={colors}
          title={""}
          icon={<Text>✔</Text>}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    alignSelf: "center",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    outlineStyle: "none",
    borderWidth: 0,
    borderStyle: "solid",
    alignSelf: "center",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    fontSize: 23,
    marginBottom: 20,

    height: 60,
    width: Dimensions.get("window").width,
  },
  header: {
    flexDirection: "row",
  },
  xButton: {
    marginLeft: 35,
    width: 27,
    height: 27,
    marginTop: 5,

    marginRight: Dimensions.get("window").width * 0.55,
  },
  saveButton: {
    marginTop: 5,
    fontSize: 27,
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 20,
    backgroundColor: "#485D99",
    width: Dimensions.get("window").width * 0.2,
  },
  scrollView: {
    marginHorizontal: 20,
  },

  button: {
    borderRadius: 10,
    backgroundColor: "#485D99",
    margin: 10,
  },
});

export default CreateActivityView;
