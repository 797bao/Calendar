import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default class TestFile extends React.Component {
  render() {
    return (
      <View>
        <Text>{"IGASG"}</Text>
        <Text>{this.props.otherProp}</Text>
      </View>
    );
  }
}
