import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { AppContext } from "./ContextProvider";
import tinycolor from "tinycolor2";
import styles from "./headerStyles";
import moment from "moment";

const Header = ({
  header_color,
  left_icon,
  accent,
  status_bar,
  navigation,
}) => {
  var color1 = tinycolor(header_color);
  var text_color = color1.isDark() ? "#fff" : "#000";
  var accent_color = tinycolor(accent);
  var accent_text_color = accent_color.isDark() ? "#fff" : "#000";
  const marginTop = status_bar && Platform.OS == "ios" ? 20 : 0;
  var icon = color1.isDark()
    ? require("../icons/calendar_today_white.png")
    : require("../icons/calendar_today_black.png");
  var arrow_down = color1.isDark()
    ? require("../icons/arrow_drop_down_white.png")
    : require("../icons/arrow_drop_down_black.png");

  return (
    <AppContext.Consumer>
      {(context) => {
        return (
          <SafeAreaView
            style={[styles.container, { backgroundColor: header_color }]}
          >
            <View style={styles.text_row}>
              {left_icon}
              <TouchableOpacity
                onPress={() => {
                  //console.log("DRAWER");
                  navigation.openDrawer();
                }}
              >
                <Image
                  style={headerStyles.image}
                  source={require("../icons/Sidebar.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.center}
                onPress={() =>
                  context.toggleDatePicker()
                } /* the entire center*/
              >
                <View style={styles.day_box}>
                  <View
                    style={[styles.circle, { backgroundColor: accent_color }]}
                  ></View>
                </View>
                <Text style={[styles.month, { color: text_color }]}>
                  {moment(context.date).format("MMMM")}
                </Text>
                <Image
                  source={arrow_down}
                  style={
                    context.isDatePickerVisible
                      ? styles.arrow_up
                      : styles.arrow_down
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.img}
                onPress={() =>
                  context.goToToday()
                } /*calender button to go to TODAY*/
              >
                <Image source={icon} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }}
    </AppContext.Consumer>
  );
};

const headerStyles = StyleSheet.create({
  image: {
    marginLeft: 18,
    flex: 0.35,
    width: 20,
    height: 10,
  },
});

export default Header;
