import * as eva from "@eva-design/eva"
import  moment from "moment"
import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native"
import {IconRegistry, ApplicationProvider, Button, Icon, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import React, { useEffect, useState } from "react"
import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native"
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Divider, IconButton } from "react-native-paper"
export default function CreateNote() {
	const [ note, setNote ] = useState("")
	const navigation = useNavigation()
	
	
	const saveNote = async () => {
		const value = await AsyncStorage.getItem("NOTES")
		const n = value ? JSON.parse(value) : []
		n.push(note)
		await AsyncStorage.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate("AllJournals"))
		setNote("")
	}
	const BackIcon = (props) => (
		<Icon {...props} name='arrow-back'/>
	  )
	 const BackAciton = () => (
		<TopNavigationAction icon={BackIcon} onPress = {saveNote}/>
	 )
	 const [currentDate , setCurrentDate] = useState('')
	 useEffect(() => {
		var current = moment().format('MMMM Do YYYY, h:mm a');
		setCurrentDate(current );
	 }, [])
	 const [dateWeek , setDateWeek] = useState('')
	 useEffect(() => {
		var current = moment().format('dddd Do');
		setDateWeek(current );
	 }, [])

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
			 <IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.dark}>
		<TopNavigation

accessoryLeft={BackAciton}
   alignment='center'
   marginTop={10}
   paddingTop={10}
   ItemSeparatorComponent={Divider}
   title ={dateWeek}
  />
  </ApplicationProvider>
  <View 
style = {{
	borderBottomColor:'white',
	borderBottomWidth:1,
	marginTop: 60,
	marginLeft:5,
	marginRight:5
	
}}
/>
<Text style={{fontSize:14,marginTop:10,textAlign:'left'}}>{currentDate}</Text>
  <TextInput 
				value={note}
				backgroundColor="#222B45"
				onChangeText={setNote}
				style={{ color: "#fff", fontSize: 22 }}
				multiline={true}
				selectionColor="#fff"
				marginTop = {20}
			/>


  </KeyboardAvoidingView>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#222B45",
		color: "white",
		padding: 30,
		paddingTop: 30,
		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
	title: {
		textAlign: "center",
		marginTop: 100,
		marginBottom: 10,
		fontSize: 30,
		color: "white"
	},
	button: {
		marginBottom: 30
	}
	
})