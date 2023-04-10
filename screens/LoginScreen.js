import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button, Pressable } from "react-native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import firebase from '../firebase'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from "./HomeScreen";
import LandingScreen from "./LandingScreen";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth();
    
    navigationOptions={
        headerLeft: null,
    }
    
    
    
    const handleLogin = () => {
        if (password.length > 1) {
            signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            navigation.navigate('Home')
            
            
            
            
        }).catch((error => alert(error.message)))
        }
        
    }

    return ( 
      <KeyboardAvoidingView 
      style={styles.container}
      behavior='padding'
      >

        <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.imageContainer}>
            
            </TouchableOpacity>
            <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={'white'}
            style={styles.input}  
           
            >

            </TextInput>
            <TextInput 
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'white'}
            
            placeholder="Password"
                style={styles.input}
                secureTextEntry
                
                >
                
            </TextInput>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                
                >
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={{color: 'white', margin: 20, fontWeight: '700'}}>
                    Don't have an account?
                </Text>

                <Button 
                color="#556080"
                
                title="Create one here" 
                
                onPress={() => {
                    navigation.navigate("NewAccount")
                }}>
                </Button>
                
               
            </View>
        </View>
      </KeyboardAvoidingView>
    )
}


export default LoginScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'black'
    },
    inputContainer:{
        width: '80%'
    },
    imageStyle:{
        width: 100,
        height: 100,
        
        
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 100
    },
    input:{
        backgroundColor: '#333333',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
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
        backgroundColor: '#556080',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        color: "white"
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