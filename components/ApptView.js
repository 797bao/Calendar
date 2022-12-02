import React, { useRef, Component } from "react";
import {
  Animated,
  View,
  ViewStyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tinycolor from "tinycolor2";
import Colors from "../constants/colors";
import { hrsToStart } from "../services/hrsToPx";

const ApptView = ({
  topTime,
  appt,
  hour_size,
  dataArray,
  onEventPress,
  navigation,
}) => {
  const color = tinycolor(appt.color).isValid()
    ? tinycolor(appt.color).toHexString()
    : Colors.red;

  const margin = hrsToStart(appt.start, topTime) * hour_size;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        pan.setOffset(pan.__getValue());
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;
  return (
    <Animated.View
      style={{
        transform: [{ translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View
        style={{
          flex: 1,
          marginTop: margin,
          height: appt.height,
          backgroundColor: color,
          borderRadius: 5,
          padding: 2,
          margin: 1,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            //console.log("PRESS");
            //console.log("------------------ " + JSON.stringify(appt));
            navigation.navigate("DeleteEventView", { loggedApt: appt });
          }}
          style={{ margin: 0, padding: 0, flex: 1 }}
        >
          <Text
            style={[
              { fontWeight: "600" },
              tinycolor(color).isDark() && { color: "white" },
            ]}
          >
            {appt.title}
          </Text>
          {!!appt.subtitle ? (
            <Text
              style={[
                { fontWeight: "200" },
                tinycolor(color).isDark() && { color: "white" },
              ]}
            >
              {appt.subtitle}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default ApptView;
