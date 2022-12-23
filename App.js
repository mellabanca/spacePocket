import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Menu from "./screens/menu";
import ISSLocation from "./screens/ISSLocation";
import Info from "./screens/info";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu"
                       screenOptions={{headerShown: false}}>
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="ISSLocation" component={ISSLocation}/>
        <Stack.Screen name="Info" component={Info}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
