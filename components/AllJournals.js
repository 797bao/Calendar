import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider, List, ListItem, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AllJournals() {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = () => {
    AsyncStorage.getItem("NOTES").then((notes) => {
      setNotes(JSON.parse(notes));
    });
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={<Text category="h5">{item}</Text>}
      onPress={() =>
        navigation.navigate("Note", {
          singleNote: item,
        })
      }
    />
  );

  return (
    <View style={{ backgroundColor: "#222B45", flex: 1 }}>
      <Text style={styles.title} category="h5">
        Journal
      </Text>
      <List
        style={styles.container}
        data={notes.reverse()}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
  },

  item: {
    marginVertical: 4,
  },
  title: {
    padding: 2,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  notes: {
    fontSize: 24,
  },
});
