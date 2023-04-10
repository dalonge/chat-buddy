import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button } from "react-native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import firebase from '../firebase';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./HomeScreen";
import {doc, setDoc, addDoc, collection, where, query, getDoc} from 'firebase/firestore';
import { FlatList } from "react-native";
import { db } from "../firebase";
import { querystring } from "@firebase/util";




const SettingsPage = ({navigation}) => {
    
    // logs the user out
    const endUserSession = () => {
        signOut(auth) 
        .then(() => {
            alert('you got logged out')
        })
    }

    return(
    <View style={styles.container}>
           
        <FlatList 
            
           
            
            style={[styles.container, styles.listStyle]}>
                <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: "center",
                    paddingRight: 20,
                    backgroundColor: '#161616',
                    borderRadius: 15,
                    margin: 10,
                    
                }}> 
                    
                        <View>
                        <Text style={styles.userTextStyle}>Logout </Text>
                        
                        </View>
                </View>
                </TouchableOpacity>
            </FlatList>
   </View>
    );
   
}


export default SettingsPage



const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'black'
    },
    inputContainer:{
        width: '80%'
    },
    imageStyle:{
        width: 100,
        height: 100,
        
        
    },
    titleStyle: {
        fontWeight: '700',
        fontSize: 30,
        paddingLeft: 40, 
        paddingTop: 50,
        color: 'white'
    },
    
    input:{
        backgroundColor: '#333333',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius:10,
        marginTop: 5,
        color: 'white',
        fontWeight: '700'

    }, 
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline:{

    },
    buttonText:{
        color: 'white',
        fontWeight: '700'
    },
    buttonOutlineText: {
        
    },
    signUpbutton: {
        backgroundColor: '#556080',
        marginTop: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#556080',
        borderWidth: 2,
        
    },
    buttonText:{
        color: 'white',
        fontWeight: '700'
    },
    signUpButtonText:{
        color: 'white',
        fontWeight: '700'
    }
})