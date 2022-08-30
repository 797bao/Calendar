import * as React from 'react';
import DrawnGrid from './components/DrawnGrid'
import TimeCol from './components/TimeCol'
import styles from './components/styles';
import HrLine from './components/HrLine'
import NowBar from './components/NowBar'
import ScheduledData from './components/ScheduledData'
import SmartScroll from './components/SmartScroll'

import { Text,  View, SafeAreaView } from 'react-native';
import { FlatList, ScrollView, Dimensions  } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ContextProvider } from './components/ContextProvider';
import todayData from './services/todayData';

let carousel = []
let hourSize = Dimensions.get('window').height / 13.34;
let dayView = new Date();
let carouselLength = 7;

//supplying the carousel to 7 items preloaded, 3 to the right and 3 to the back
for (let i = 0; i < carouselLength; i++) {
  let temp = new Date(dayView.getFullYear(), dayView.getMonth(), dayView.getDate() + i);
  if (i >= carouselLength/2) 
    carousel[i] =  new Date(dayView.getFullYear(), dayView.getMonth(), dayView.getDate() + i -carouselLength);
  else
    carousel[i] = temp;
}


const loggedItems = new Map();

loggedItems.set(new Date(2022, 7, 30).toString(), [  
  {
    title: 'Lunch Appointment',
    subtitle: 'With John',
    start: new Date(2022, 7, 30, 14, 21),
    end: new Date(2022, 7, 30, 15, 20),
    color: '#390099',
  },
  {
    title: 'Lunch Appointment',
    subtitle: 'With Harry',
    start: new Date(2022, 7, 30, 13, 20),
    end: new Date(2022, 7, 30, 14, 20),
    color: '#390099',
  },
  {
    title: 'Lunch Appointment',
    subtitle: 'With Bao',
    start: new Date(2022, 7, 30, 13, 20),
    end: new Date(2022, 7, 30, 14, 20),
    color: '#390099',
  }])

  loggedItems.set(new Date(2022, 7, 31).toString(), [  
    {
      title: 'Lunch Appointment',
      subtitle: 'With John',
      start: new Date(2022, 7, 30, 14, 21),
      end: new Date(2022, 7, 30, 15, 20),
      color: '#ff0000',
    }])

const data = [
  {
    title: 'Lunch Appointment',
    subtitle: 'With John',
    start: new Date(2022, 7, 30, 14, 21),
    end: new Date(2022, 7, 30, 15, 20),
    color: '#390099',
  },
    {
      title: 'Lunch Appointment',
      subtitle: 'With Harry',
      start: new Date(2022, 7, 30, 13, 20),
      end: new Date(2022, 7, 30, 14, 20),
      color: '#390099',
    },
    {
      title: 'Lunch Appointment',
      subtitle: 'With Bao',
      start: new Date(2022, 7, 30, 13, 20),
      end: new Date(2022, 7, 30, 14, 20),
      color: '#390099',
    },

  ]

function appendToList(index) {
  let arrHalfLen =  Math.floor(carousel.length/2);
  let appendIndex = (index + arrHalfLen) % carousel.length;

  //make a new date that is a deep copy of the current day value we are on
  let newVal = new Date(carousel[index].getFullYear(), carousel[index].getMonth(), carousel[index].getDate());
  carousel[appendIndex] = newVal; //assign it so it lays in the correct month
  carousel[appendIndex].setDate(newVal.getDate() + Math.floor(carousel.length/2)) //then append it by X days

  console.log(carousel);
}

function prependToList(index) {
  let arrHalfLen =  Math.floor(carousel.length/2);
  let prependIndex = mod(index - arrHalfLen, carousel.length);

  let newVal = new Date(carousel[index].getFullYear(), carousel[index].getMonth(), carousel[index].getDate());
  carousel[prependIndex] = newVal; //assign it so it lays in the correct month
  carousel[prependIndex].setDate(newVal.getDate() - Math.floor(carousel.length/2)) //then append it by X days

  console.log(carousel);
}

console.log("initial carousel " + carousel);


//for negative modulus to return positive, e.g.  -1 % 7 = 6
function mod(n, m) {
  return ((n % m) + m) % m;
}

export default class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        activeIndex:0,
        carouselItems: carousel,
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: Dimensions.get('screen').height,
              padding: 50,
              }}>
            <Text style={{fontSize: 30}}>{item.getDate() + ' ' + item.toLocaleString('en-us', { month: 'long' })}</Text>
            <Text>{item.getDate()}</Text>

            <ContextProvider hour_size={hourSize} /**set hour_size prop so drawngrid>Hrline can take that data */>
              <SmartScroll hour_size={hourSize}>
            
                <View style={styles.body} >
                  
                  <View style={styles.hour_col} /*the hours PM & AM */> 
                    <TimeCol hour_size={hourSize}/>
                  </View>
 
                  <View style={styles.schedule_col} /**the horizontal lines */>
                    <DrawnGrid></DrawnGrid>
                    <NowBar hour_size={hourSize}/>
                    {<ScheduledData dataArray={loggedItems.get(item.toString())}/> }
                  </View>
          
                </View>
              </SmartScroll>
            </ContextProvider>
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"stack"}
                  layoutCardOffset={1}
                  ref={ref => this.carousel = ref}
                  loop
                  centerContent
                  data={this.state.carouselItems}
                  enableSnap
                  loopClonesPerSide={3}
                  sliderWidth={Dimensions.get('screen').width}
                  itemWidth={Dimensions.get('screen').width}
                  renderItem={this._renderItem}
                  onBeforeSnapToItem =  {(index) => {
                    //console.log("index " + index + " active " + this.state.activeIndex);
                    if (index > this.state.activeIndex) {
                      if (this.state.activeIndex == 0 && index == carousel.length - 1) {
                        //console.log("swiping left, was at last index to first index")
                        prependToList(index) //swiping left, was at last index to first index
                      }
                      else {
                       // console.log("swiping right p1")
                        appendToList(index)
                      }
                        
                    }
                    else if (index < this.state.activeIndex) {
                      if (this.state.activeIndex == carousel.length - 1 && index == 0) {
                        appendToList(index) //swiping right was at last index now back to first
                        //console.log("swiping right was at last index now back to first")
                      }
                      else {
                        //console.log("swiping left p1")
                        prependToList(index)
                      }
                        
                    }
                    this.setState({activeIndex:index}) 
                  }}
                  onSnapToItem = { (index) => {
                    //console.log("SNAPPING " + index);
                  }} />
    
            </View>
          </SafeAreaView>
        );
    }
}