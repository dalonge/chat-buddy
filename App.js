import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import CreateNewAccountScreen from './screens/CreateNewAccountScreen';
import TabNavigator from './TabNavigator';
const Stack = createNativeStackNavigator()
import SettingsPage from './screens/SettingsPage';
import ChatScreen from './screens/ChatScreen';
import LandingScreen from './screens/LandingScreen';
import { LogBox } from 'react-native';
import UserProfileScreen from './screens/UserProfileScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,

        }}>

        </Stack.Screen>

        <Stack.Screen name="Login" component={LoginScreen} 
        options={{
          headerShown: false
        }}
        />
        
        <Stack.Screen name="NewAccount" component={CreateNewAccountScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            
          }}
        />
        
        <Stack.Screen name="Home" component={TabNavigator}
          options={{
            headerBackVisible: false,
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: '#161616',
              
            },
            headerShown: false, 

           headerTintColor: 'white'
          }}
         
        />  
        <Stack.Screen name="Contacts" component={TabNavigator}
          options={{
            headerBackVisible: false,
            gestureEnabled: false,
            headerStyle:{
              backgroundColor: '#268AE1'

            },
          
            
          }}
        />
        
        <Stack.Screen name="Settings" component={TabNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false
           
          }}
        />
        <Stack.Screen name="Chats" component={TabNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false
            
          }}
        />
        <Stack.Screen name="UserProfile" component={UserProfileScreen}
        const 
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#161616',
            
          },
          headerTitleStyle: {
            color: 'white'
          },
          title: `${route.params.firstname} ${route.params.lastname}`
          // sets header title to name of user you clicked on
        })} 
        />
        
      </Stack.Navigator> 
      
    </NavigationContainer>
  );

}
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. "]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export { Stack }