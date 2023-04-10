import React, { useReducer } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';



const LandingScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image 
            style={styles.image}
            source={require('../images/messagenew.png')}></Image>
           

            <TouchableOpacity style={styles.button}
            onPress={() =>{
                navigation.navigate('NewAccount')
            }}
             >

                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#161616'
    },
    textStyles: {
        color: 'white'
    },
    button: {
        backgroundColor: '#556080',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: '700'
    },
    image: {
       margin: 80,
      
    },
})