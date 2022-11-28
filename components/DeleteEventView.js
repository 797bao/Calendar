import React, { useState } from "react";
import {
  DatePickerIOS,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ColorPalette from "react-native-color-palette";
import { Button } from "react-native-paper";
import procData from "../services/procData";
import { Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";

let hourSize = Dimensions.get("window").height / 13.34;
let selectedDate;
let choseStart = true;
let badgeColor = "#485D99";

const AddEventView = (props) => {
  let key = props.route.params.loggedApt;

  let oldData = {
    title: key.title,
    subtitle: key.subtitle,
    start: key.start,
    end: key.end,
    color: key.color,
    activityName: key.activityName,
  };

  console.log("--------------");

  console.log("KEY " + key.start);

  const [chosenStartDate, setChosenStartDate] = useState(key.start);
  const [chosenEndDate, setChosenEndDate] = useState(key.end);
  const [title, onChangeTitle] = React.useState(key.title);
  const [subtitle, onChangeSubtitle] = React.useState(key.subtitle);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(key.activityName);
  const [circleColor, setCircleColor] = React.useState(key.color);
  const [items, setItems] = useState(getActivities());

  let dropdownPlaceholder = "" + key.activityName;
  let dateKey = new Date(chosenStartDate);
  dateKey.setHours(0, 0, 0, 0);

  console.log("TEST " + JSON.stringify(props.route.params));
  console.log("--------------");
  console.log("TEST2 " + JSON.stringify(props.route.params.loggedApt.start));
  console.log("appt " + useNavigation("apptData"));
  console.log("appt2 " + JSON.stringify(useNavigation("apptData")));

  //setChosenStartDate(apptData.start);
  //setChosenEndDate(apptData.end);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (choseStart) {
      setChosenStartDate(date);
      console.log(date + " ");
      console.log("end " + chosenEndDate);
      if (date > chosenEndDate) {
        console.log("date > chosenEndDate");
        let newEndDate = new Date(date.getTime() + 30 * 60000);
        setChosenEndDate(newEndDate);
      }
      console.log("CHOES STARt");
    } else {
      setChosenEndDate(date);
      if (date < chosenStartDate) {
        let newEndDate = new Date(date.getTime() - 30 * 60000);
        setChosenEndDate(newEndDate);
      }
      console.log("CHOES end");
    }
    hideDatePicker();
  };

  function getActivities() {
    let arr = [];
    for (let [key, value] of props.route.params.activity) {
      arr.push({ label: "" + key, value: +"" + value });
    }
    return arr;
  }

  const addEventListener = () => {
    let newData = {
      title: title,
      subtitle: subtitle,
      start: chosenStartDate,
      end: chosenEndDate,
      color: circleColor,
    };

    props.route.params.removeData(oldData);

    props.route.params.updateData(dateKey, newData);
    props.navigation.navigate("Day", {
      data: props.route.params.loggedData,
    });
  };

  const removeEventListener = () => {
    props.route.params.removeData(oldData);
    //props.route.params.removeData(dateKey);
    props.navigation.navigate("Day", {
      data: props.route.params.loggedData,
    });
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.xButton}
          onPress={() => {
            console.log("ON PRSS ");
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
          onPress={addEventListener}
        >
          Save
        </Button>
      </View>
      <View style={{ flexDirection: "column" }}>
        <DateTimePickerModal
          date={selectedDate}
          textColor="#000"
          isVisible={isDatePickerVisible}
          mode="time"
          style={{
            width: Dimensions.get("window").width,
            height: 230,
            backgroundColor: "white",
          }}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput
          underlineColorAndroid={"transparent"}
          value={title}
          style={styles.input}
          maxLength={25}
          placeholder="Add Title"
          onChangeText={onChangeTitle}
        />
        <View
          style={{
            paddingLeft: 40,

            flexDirection: "row",
            paddingRight: 40,
          }}
        >
          <View
            style={[
              styles.circleColor,
              {
                backgroundColor: circleColor,
              },
            ]}
          ></View>
          <DropDownPicker
            textStyle={{
              fontSize: 23,
            }}
            placeholder={dropdownPlaceholder}
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={(value) => {
              setCircleColor(value.slice(1));
            }}
            width={Dimensions.get("window").width * 0.6}
            setItems={setItems}
            onChangeItem={(item) => {
              console.log("CHANGED");
            }}
          />
        </View>

        <View style={{ zIndex: -5 }}>
          <Button
            mode="contained"
            style={styles.ActivityButton}
            onPress={() => {
              props.navigation.navigate("CreateActivityView");
            }}
          >
            Create New Activity
          </Button>
          <Text
            onPress={() => {
              setDatePickerVisibility(true);
              selectedDate = chosenStartDate;
              choseStart = true;
            }}
            style={styles.textTime}
          >
            {"Start Time: \t\t\t " + getTimeText(chosenStartDate)}
          </Text>
          <Text
            onPress={() => {
              setDatePickerVisibility(true);
              selectedDate = chosenEndDate;
              choseStart = false;
            }}
            style={styles.textTime}
          >
            {"End Time:    \t\t\t " + getTimeText(chosenEndDate)}
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            multiline={true}
            value={subtitle}
            placeholder="Enter Your Description..."
            style={styles.input2}
            onChangeText={onChangeSubtitle}
          />

          <Button
            style={styles.button}
            mode="contained"
            onPress={removeEventListener}
          >
            Delete
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

function getTimeText(time) {
  let md = "AM";
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (hours >= 12) md = "PM";
  if (time.getMinutes() < 10) minutes = "0" + minutes;
  hours %= 12;
  if (hours == 0) hours = 12;
  return hours + ":" + minutes + " " + md;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
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
    marginTop: 10,
    fontSize: 27,
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 20,
    backgroundColor: "#485D99",
    width: Dimensions.get("window").width * 0.2,
  },
  textTime: {
    alignSelf: "center",

    justifyContent: "center",
    fontSize: 23,
    margin: 8,
  },
  input: {
    paddingLeft: Dimensions.get("window").width * 0.1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    outlineStyle: "none",
    borderWidth: 0,
    borderStyle: "solid",
    alignSelf: "center",
    borderRadius: 10,

    paddingLeft: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 23,
    marginBottom: 20,

    height: 60,
    width: Dimensions.get("window").width,
  },
  input2: {
    alignSelf: "center",
    textAlignVertical: "top",
    borderRadius: 10,

    fontSize: 17,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("window").width * 0.75,
  },
  dropdown: {
    borderWidth: 0,
    backgroundColor: "#F2F2F2",
    color: "#000",
    fontSize: 23,
    width: Dimensions.get("window").width * 0.6,
    height: 50,
    borderRadius: 10,
  },
  button: {
    fontSize: 23,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#c92c20",
    margin: 10,
    width: Dimensions.get("window").width * 0.75,
  },
  ActivityButton: {
    fontSize: 27,
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 20,
    backgroundColor: "#485D99",
    margin: 10,
    width: Dimensions.get("window").width * 0.6,
  },
  circleColor: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 25,
    width: 42,
    height: 42,
    borderWidth: 5,
    marginLeft: 6,
    marginRight: 6,
    borderColor: "white",
  },
});

export default AddEventView;
