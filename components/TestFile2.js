import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default class TestFile2 extends React.Component {
  render() {
    console.log("THIS PROPS " + JSON.stringify(this.props));
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
        <Button
          title="press me "
          onPress={() => {
            let num = this.props.otherProp;
            console.log("PRESS " + num);
            this.props.updateData(num + 1);
          }}
        ></Button>
      </View>
    );
  }
}
