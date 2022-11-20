import * as eva from "@eva-design/eva"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import React from "react"
import { StyleSheet } from "react-native"
import AllJournals from "./components/AllJournals"
import CreateNote from "./components/CreateNote"
import Note from "./components/Note"

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title="Create" />
        <BottomNavigationTab title="All Notes" />
    </BottomNavigation>
)

const TabNavigator = () => (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Screen name="Create" component={CreateNote} />
        <Screen name="AllJournals" component={AllJournals} />
        <Screen name="Note" component={Note} />
    </Navigator>
)

export default function App() {
    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </ApplicationProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})
