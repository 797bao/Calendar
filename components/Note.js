import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Button, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

export default function Note({ route }) {
  const [notes, setNotes] = useState([])
  const [editedNote, setEditedNote] = useState(singleNote)
  const { singleNote } = route.params

  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      getNotes()
    }, [])
  )

  const getNotes = () => {
    AsyncStorage.getItem("NOTES").then((notes) => {
      setNotes(JSON.parse(notes))
    })
  }
  const editNote = async () => {
    const newNotes = notes.map((note) => (note === singleNote ? editedNote : note))
    await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(
      () => navigation.navigate("AllJournals")
    )
  }
  const deleteNote = async () => {
    const newNotes = await notes.filter((note) => note !== singleNote)
    await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(() => navigation.navigate("AllJournals"))
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <TextInput style={{ fontSize: 22, margin: 20 }}value={singleNote} onChangeText={setEditedNote} /> 
      <View style={styles.bottom}>
        <Button onPress={deleteNote} style={styles.button}>
          Delete
        </Button>
        <Button onPress={editNote} style={styles.button}>
          Edit
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    marginVertical: 4
  },
  title: {
    textAlign: "center",
    marginTop: 50
  },
})