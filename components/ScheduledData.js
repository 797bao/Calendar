import React from 'react';
import {View} from 'react-native'
import {AppContext} from './ContextProvider';
import RowView from './RowView';
import todayData from '../services/todayData';
import procRows from '../services/procRows';

const ScheduledData = ({dataArray, onEventPress}) =>
  <AppContext.Consumer>
    {(context) => {
      if (!dataArray)
        dataArray = [];
      const data = procRows(dataArray, context.date);
      return (
        <View style={{ width: '100%', height: '100%', position: 'absolute' } /**super view */}>
          {data.map((row, i) => <RowView key={i} row={row} hour_size={context.hour_size} onEventPress={onEventPress}/>)}
        </View>
      )
    }}
  </AppContext.Consumer>

export default ScheduledData
