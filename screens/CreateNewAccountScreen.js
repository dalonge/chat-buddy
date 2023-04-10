import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button, Dimensions} from "react-native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import firebase from '../firebase';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./HomeScreen";
import {doc, setDoc, addDoc, collection, where, query, getDoc} from 'firebase/firestore';
import  {AsyncStorage} from '@react-native-async-storage/async-storage'
import { db } from "../firebase";
import { querystring } from "@firebase/util";
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, getStorage, ref, uploadBytes,  } from "@firebase/storage";

const CreateNewAccountScreen = ({navigation}) => {
    
    



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [downloadURL, setDownloadURL] = useState('')
    /*  this is for later ---> */  
   
    const auth = getAuth();
    const chooseImageAndUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            width: 30,
            height: 30
        })
        

        if (!result.canceled) {
            setProfilePicture(result.uri)
          
            
        }
        
    }
    
        
    
    const handleSignUp = () => {

        
        if (password.length > 1) {
            createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials => {
            const user = userCredentials.user
                navigation.navigate('Home')

                const UploadImage = async () => {
            
                
            const storage = getStorage()
            const reference = ref(storage,`profilePictures/${auth.currentUser.uid}`)

            const img = await fetch(profilePicture)
            const bytes = await img.blob()

            await uploadBytes(reference, bytes)

            getDownloadURL(reference).then((url) => {
                setDownloadURL(url)
                if (downloadURL) {
                    console.log(downloadURL)
                }
                
                const userRef = doc(db, "userProfileInformation", user.uid)
                setDoc(userRef, {
    
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    uid: user.uid,
                    profilePicture: url,
                    bio: "No user Bio",
                    accountCreated: Date.now(),
                    displayName: firstName
                }).then(() => {
                console.log('Welcome to ChatBuddy ' + firstName + "!")
                })
            })
        
    }
            UploadImage()
            
           
            
        })
        ).catch(error => alert(error.message))
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
            
            onChangeText={text => setFirstName(text)}
            placeholderTextColor={'white'}
            
            placeholder="First Name"
            style={styles.input}
            
            >
                
            </TextInput>

            <TextInput 
           
            onChangeText={text => setLastName(text)}
            placeholderTextColor={'white'}
            
            placeholder="Last Name"
            style={styles.input}
            
            >
                
            </TextInput>

            <TextInput
            
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={'white'}
            style={styles.input}  
           
            >

            </TextInput>
            <TextInput 
            
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'white'}
            
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            >
                
            </TextInput>
            <TouchableOpacity

                style={[styles.addProfilePictureButton]}
                onPress={chooseImageAndUpload}>
                <Text style={styles.addProfilePictureText}>Choose Profile Picture</Text>
                <Image 
                style={styles.userImage}
                source={require('../images/user.png')}
                
                />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                
                <TouchableOpacity

                style={[styles.signUpbutton]}
                onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{color: 'white', margin: 20, fontWeight: '700'}}>Already have an account?</Text>
                <Button 
                title="Sign In here"
                color="#556080"
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >

                </Button>
                
                
               
            </View>
        </View>
      </KeyboardAvoidingView>
    )
}

export default CreateNewAccountScreen



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
    },
    addProfilePictureButton: {
        backgroundColor: 'black',
        marginTop: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#556080',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addProfilePictureText: {
        color: '#556080',
        fontWeight: '700'
    },
    userImage: {
        height: '100%',
        width: '6%',
        marginLeft: 3
        
    }
})