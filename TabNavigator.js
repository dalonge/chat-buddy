import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import SettingsPage from "./screens/SettingsPage";
import ChatScreen from "./screens/ChatScreen";
import LandingScreen from "./screens/LandingScreen";

const Tab = createBottomTabNavigator()
const mainName = "Main";
const contactsName = "Requests";
const settingsName = 'Settings';
const ChatsName = 'Chats';


const TabNavigator = () => {
    return (
        <Tab.Navigator
        
        screenOptions={({route}) => ({
            headerShadowVisible: false, 
            headerTitleStyle: {
                color: '#bebebe'
            },
            headerStyle: {
                backgroundColor: '#161616',
                borderBottomColor: '#161616',
                borderWidth: 0,
                
        

            },
            
            headerTintColor: {
                backgroundColor: 'white',
                
            },
            tabBarStyle: {
                backgroundColor: '#161616',
                borderTopColor: '#161616',
                borderWidth: 0,
                
            },
            
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name
                if (rn === mainName) {
                    iconName = focused ? 'home' : 'home-outline'
                } else if (rn === contactsName) {
                    iconName = focused ? 'person-circle': 'person-circle-outline'
                } else if (rn === settingsName) {
                    iconName = focused ? 'settings' : 'settings-outline'
                } else if (rn === ChatsName) {
                    iconName = focused ? 'add' : 'add'
                }
                
                return <Ionicons name={iconName} size={size} color={color}></Ionicons>
            },

            
            
        })}
        
        >
            <Tab.Screen name="Main" component={HomeScreen} /> 
            <Tab.Screen name="Requests" component={ContactScreen}/>
            <Tab.Screen name="Chats" component={ChatScreen}/>
            <Tab.Screen name="Settings" component={SettingsPage}/>
            
        </Tab.Navigator>
    );
};

export default TabNavigator