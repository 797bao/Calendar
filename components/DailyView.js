import DrawnGrid from "./DrawnGrid";
import TimeCol from "./TimeCol";
import styles from "./styles";
import NowBar from "./NowBar";
import ScheduledData from "./ScheduledData";
import SmartScroll from "./SmartScroll";
import procData from "../services/procData";
import Header from "./Header";

import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { AppContext, ContextProvider } from "./ContextProvider";
import { PropTypes } from "prop-types";
import Colors from "../constants/colors";
import React, { useContext } from "react";

/** the carousel loops through an array, swipe right = index++, swipe left = index--
each swipe modifies the furthest looped index away from the current index instead of the next index
to avoid values being potentially visually changed abruptly for a seamless experience */
let carouselLength = 5; //keep minimum 5
let carousel = [];
let hourSize = Dimensions.get("window").height / 13.34;
let dayView = new Date();

//supplying the carousel
for (let i = 0; i < carouselLength; i++) {
  let temp = new Date(
    dayView.getFullYear(),
    dayView.getMonth(),
    dayView.getDate() + i
  );
  if (i >= carouselLength / 2)
    carousel[i] = new Date(
      dayView.getFullYear(),
      dayView.getMonth(),
      dayView.getDate() + i - carouselLength
    );
  else carousel[i] = temp;
}

//all the scheduled items (bars) resides in a map, key = day, value = array of all values in that day
//procData adds a new field -> height to offset bars determined by start/end time

//shifts content of the carousel 1 day forward by changing the earliest day to the latest day + 1
function appendToList(index) {
  let arrHalfLen = Math.floor(carousel.length / 2);
  //make a new date that is a deep copy of the current day value we are on
  let curDay = new Date(
    carousel[index].getFullYear(),
    carousel[index].getMonth(),
    carousel[index].getDate()
  );

  let appendIndex = (index + arrHalfLen) % carousel.length; //the index of data we want to modify
  carousel[appendIndex] = curDay;
  carousel[appendIndex].setDate(curDay.getDate() + arrHalfLen); //add by X days based on carousel's length reac
}

//shifts content of the carousel 1 day backwards by changing the latest day to the earliest day - 1
function prependToList(index) {
  let arrHalfLen = Math.floor(carousel.length / 2);
  //make a new date that is a deep copy of the current day value we are on
  let curDay = new Date(
    carousel[index].getFullYear(),
    carousel[index].getMonth(),
    carousel[index].getDate()
  );

  let prependIndex = mod(index - arrHalfLen, carousel.length); //the index of data we want to modify
  carousel[prependIndex] = curDay;
  carousel[prependIndex].setDate(curDay.getDate() - arrHalfLen); //subtract by X days based on carousel's length
}

//for negative modulus to return positive, e.g.  -1 % 7 = 6
function mod(n, m) {
  return ((n % m) + m) % m;
}

let dataItems;
let navProp;

export default class DailyView extends React.Component {
  constructor(props) {
    super(props);
    navProp = props;
    console.log("navProps " + navProp.navigation);

    dataItems = this.props.route.params.loggedData;
    console.log(dataItems);
    this.state = {
      activeIndex: 0,
      carouselItems: carousel,
    };
  }

  render() {
    console.log("DAILY VIEW re-RENDER");
    return (
      <ContextProvider
        hour_size={
          hourSize
        } /**set hour_size prop so drawngrid>Hrline can take that data */
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light_gray }}>
          <Header
            status_bar={PropTypes.bool}
            accent={Colors.blue}
            left_icon={PropTypes.node}
            header_color={Colors.light_gray}
            navigation={this.props.navigation}
          />
          <AppContext.Consumer>
            {(context) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Carousel
                    layout={"stack"}
                    layoutCardOffset={1}
                    ref={(ref) => (this.carousel = ref)}
                    loop
                    centerContent
                    data={this.state.carouselItems}
                    enableSnap
                    loopClonesPerSide={4} //allows swiping 4x without stopping
                    sliderWidth={Dimensions.get("screen").width}
                    itemWidth={Dimensions.get("screen").width}
                    renderItem={({ item, index }) => {
                      let datesInMap = dataItems.get(item.toString());
                      return (
                        <View
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            height: Dimensions.get("screen").height * 0.85,
                            padding: 0,
                          }}
                        >
                          <View style={styles.container}>
                            <SmartScroll hour_size={hourSize}>
                              <View style={styles.body}>
                                <View
                                  style={styles.hour_col} /*the hours PM & AM */
                                >
                                  <TimeCol hour_size={hourSize} />
                                </View>
                                <View
                                  style={
                                    styles.schedule_col
                                  } /**the horizontal lines */
                                >
                                  <DrawnGrid></DrawnGrid>
                                  <NowBar hour_size={hourSize} />
                                  {!!datesInMap && (
                                    //<ScheduledData dataArray={dataItems.get(item.toString())} />
                                    <ScheduledData
                                      dataArray={dataItems.get(item.toString())}
                                      navigation={this.props.navigation}
                                    />
                                  )}
                                </View>
                              </View>
                            </SmartScroll>
                          </View>
                        </View>
                      );
                    }}
                    onBeforeSnapToItem={(index) => {
                      console.log("BEFORE SNAPPING ");
                      console.log("navprop " + navProp);
                      if (index > this.state.activeIndex) {
                        if (
                          this.state.activeIndex == 0 &&
                          index == carousel.length - 1
                        )
                          prependToList(index);
                        //swiping left, was at last index to first index
                        else appendToList(index); //swiping right
                      } else if (index < this.state.activeIndex) {
                        if (
                          this.state.activeIndex == carousel.length - 1 &&
                          index == 0
                        )
                          appendToList(index);
                        //swiping right was at last index now back to first
                        else prependToList(index); //swiping left
                      }
                      context.setDate(carousel[index]);
                      console.log("SETTING STATE BEFORE SNAP ");
                      this.setState({ activeIndex: index });
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("AddEventView", {
                        day: carousel[this.state.activeIndex],
                      })
                    }
                    activeOpacity={0.5}
                    style={DayStyle.TouchableOpacityStyle}
                  >
                    <Image
                      source={require("../icons/AddButton.png")}
                      style={DayStyle.TouchableOpacityStyle}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          </AppContext.Consumer>
        </SafeAreaView>
      </ContextProvider>
    );
  }
}

const DayStyle = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    bottom: 25,
    right: 25,
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 65,
    height: 65,
  },
});
