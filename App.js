import React, { useState } from 'react';
import { View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/views/HomeScreen'
import LoginScreen from './src/views/LoginScreen'
import RegisterScreen from './src/views/RegisterScreen'
import ChangeProfile from './src/views/ChangeProfile'


const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

export default function App() {


  const MainStack = () => {
    return (
      <Stack.Navigator>    
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        mode="modal"
        screenOptions={{
          headerShown: false
        }}
      >

      <Stack.Screen name="MainStack" component={MainStack} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
