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
//let hourSize = Dimensions.get("window").height / 13.34;
let hourSize = 69.41529235382309;
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
const loggedItems = new Map();
loggedItems.set(
  new Date(2022, 8, 25).toString(),
  procData(
    [
      {
        title: "TEST",
        subtitle: "",
        start: new Date(2022, 8, 25, 2, 21),
        end: new Date(2022, 8, 25, 4, 0),
        color: "#aa0000",
      },
    ],
    hourSize
  )
);

loggedItems.set(
  new Date(2022, 8, 26).toString(),
  procData(
    [
      {
        title: "Lunch Appointment",
        subtitle: "With John",
        start: new Date(2022, 8, 26, 1, 21),
        end: new Date(2022, 8, 26, 7, 20),
        color: "#390099",
      },

      {
        title: "Lunch Appointment",
        subtitle: "With Bao",
        start: new Date(2022, 8, 26, 4, 20),
        end: new Date(2022, 8, 26, 5, 20),
        color: "#ffff00",
      },
    ],
    hourSize
  )
);

loggedItems.set(
  new Date(2022, 8, 28).toString(),
  procData(
    [
      {
        title: "Lunch Appointment",
        subtitle: "With John",
        start: new Date(2022, 8, 28, 1, 21),
        end: new Date(2022, 8, 28, 6, 0),
        color: "#ff0000",
      },
    ],
    hourSize
  )
);

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

export default class DailyView extends React.Component {
  constructor(props) {
    super(props);
    dataItems = this.props.route.params.loggedItems;
    this.state = {
      activeIndex: 0,
      carouselItems: carousel,
    };
  }

  //the carousel's data to render
  _renderItem({ item, index }) {
    let datesInMap = dataItems.get(item.toString());
    console.log("RENDER ITEM " + dataItems);
    console.log("DATES IN MAP " + datesInMap);
    console.log("DATES IN MAP " + JSON.stringify(datesInMap));
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
              <View style={styles.hour_col} /*the hours PM & AM */>
                <TimeCol hour_size={hourSize} />
              </View>
              <View style={styles.schedule_col} /**the horizontal lines */>
                <DrawnGrid></DrawnGrid>
                <NowBar hour_size={hourSize} />
                {!!datesInMap && (
                  <ScheduledData dataArray={dataItems.get(item.toString())} />
                )}
              </View>
            </View>
          </SmartScroll>
        </View>
      </View>
    );
  }

  render() {
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
                    renderItem={this._renderItem}
                    onBeforeSnapToItem={(index) => {
                      console.log("SNAPPING BEFORE");
                      console.log(dataItems);
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
                      this.setState({ activeIndex: index });
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("AddEventView")
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
