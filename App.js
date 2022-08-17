import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};
const App = () => {
    const [items, setItems] = useState({});
    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = 25;
                    for (let j = 1; j < numItems; j++) {
                        if(j <=12 )
                        items[strTime].push({
                            name: j + ' AM : ',
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                        if( j > 12)
                        {
                            items[strTime].push({
                                name:j + ' PM : ',
                                height: Math.max(50, Math.floor(Math.random() * 150)),
                            });
                        }
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };
    const renderItem = (item) => {
        return (React.createElement(TouchableOpacity, { style: { marginRight: 10, marginTop: 17 } },
            React.createElement(Card, null,
                React.createElement(Card.Content, null,
                    React.createElement(View, { style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        } },
                        React.createElement(Text, null, item.name),
                        React.createElement(Avatar.Text, { label: "+" }))))));
    };
    return (React.createElement(View, { style: { flex: 1 } },
        React.createElement(Agenda, { items: items, loadItemsForMonth: loadItems, selected: '2022-08-13', renderItem: renderItem })));
};
export default App;