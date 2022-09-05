import * as React from 'react';
import { Button, View, Text } from 'react-native';


function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="Go to MonthlyView"
          onPress={() => navigation.navigate('MonthlyView')}
        />
        <Button
          title="Go to DailyView"
          onPress={() => navigation.navigate('DailyView')}
        />
      </View>
    );
  }

  export default HomeScreen;