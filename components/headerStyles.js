import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.05,
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 999,
  },
  text_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    paddingLeft: 13,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 22,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  day_box: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  day: {
    margin: 0,
    padding: 0,
    fontWeight: "bold",
    fontSize: 18,
  },
  dotw: {
    margin: 0,
    padding: 0,
    textAlign: "center",
    fontSize: 13,
    paddingBottom: 1,
  },
  month: {
    paddingTop: 10,
    fontSize: 25,
    paddingLeft: 10,
    fontWeight: "300",
  },
  img: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  arrow_down: {
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 15,
  },
  arrow_up: {
    marginTop: 10,
    paddingLeft: 15,
    transform: [{ rotate: "180 deg" }],
  },
});

export default styles;
