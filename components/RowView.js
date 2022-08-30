import React from 'react';
import { View } from 'react-native';
import ApptView from './ApptView';
import { Dimensions } from 'react-native';

const RowView = ({row, hour_size, onEventPress}) =>{
  return <View
    style={{
      width: '100%',
      position: 'absolute',
      marginTop: row.hrsBefore * hour_size,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingRight: Dimensions.get("screen").width/35
    }}
  >
    {row.rowAppts.map((appt, i) => <ApptView key={i} topTime={row.start} appt={appt} hour_size={hour_size} onEventPress={onEventPress}/>)}
  </View>
}

export default RowView
