import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import ColorPalette from "react-native-color-palette";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";

// Add a color picker, input for Activity name, and button to save 

let hourSize = Dimensions.get("window").height / 13.34;
const colors = ["#C0392B", "#E74C3C", "#9B59B6", "#8E44AD", "#2980B9"];

const CreateActivityView = (props) => {
    const [color, setSelectedColor] = useState("#C0392B");
    const [activityName, onChangeActivityName] = React.useState("Add Activity Name");
    
    let dateKey = new Date(chosenStartDate);
    dateKey.setHours(0, 0, 0, 0);
    
    const saveActivityListener = () => {
        console.log("Add activity");
        console.log("Activity name: " + activityName);
        console.log("Activity color: " + color);
    };
    
    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Text>Add Activity Name</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeActivityName}
            value={activityName}
            />
            <ColorPalette
            onChange={setSelectedColor}
            defaultColor={color}
            colors={colors}
            title={"Set Color"}
            icon={<Text>✔</Text>}
            />
            <Button
            style={styles.button}
            mode="contained"
            onPress={() => saveActivityListener()}
            >
            Save
            </Button>
        </ScrollView>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    input: {
        height: hourSize,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        margin: 10,
    },
});

export default CreateActivityView;