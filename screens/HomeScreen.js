import React, { useEffect, useCallback} from "react";
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import {doc, collection, where, query, getDocs, setDoc, addDoc, getDoc} from 'firebase/firestore';
import { db } from '../firebase'
import { useState } from "react";
import { TouchableOpacity, Image, ListItem} from "react-native";
import { getAuth } from "firebase/auth";
import  {AsyncStorage} from '@react-native-async-storage/async-storage'
import { getStorage, getDownloadURL, ref } from "@firebase/storage";
const HomeScreen = (navigation) => {
    const [users, setUsers] = useState([]);
    const auth = getAuth();
    const currentUser = auth.currentUser
    const [currentUserName, setCurrentUserName] = useState('')
    const [currentUserLastName, setCurrentUserLastName] = useState('')
    const [currentUserEmail, setCurrentUserEmail] = useState('')
    const [userProfilePicture, setUserProfilePicture] = useState(null)
    

    const UserItem = ({ item }) => (
        
       

        <TouchableOpacity
        onPress={async () => {
            onUserPress(item.uid) 
            returnProfilePicture(item.profilePicture)
           
            const receiverID = onUserPress(item.uid)
            const currentUserId = auth.currentUser.uid
            /* creating a document for the user you just pressed? */
            const dbRef = collection(db, 'userProfileInformation', currentUserId, 'myRequests')

            /* add document to rceivers collection? */

            const receiver = collection(db, 'userProfileInformation', receiverID, 'myRequests')
            const myRequestRef = doc(dbRef, receiverID) 
            const databaseRef = doc(receiver, auth.currentUser.uid)
            
            const currentUserProfilePicture = doc(db, 'userProfileInformation', auth.currentUser.uid)
            const getPhotoUrl = await getDoc(currentUserProfilePicture)
            const Picdata = getPhotoUrl.data().profilePicture
            
            
            const handleSendRequest = () => {
                return Alert.alert(
                    "Send Request",
                    "Do you want to send a friend request to " + item.firstName + " " + item.lastName,
                    [
                        {
                            text: "Yes",
                            onPress: async () => {
                                setDoc(myRequestRef, {
                                    receiverID: item.uid,
                                    senderID: currentUserId,
                                    receiverEmail: item.email,
                                    senderEmail: currentUserEmail,
                                    receiverName: item.firstName + " " + item.lastName,
                                    senderName: currentUserName,
                                    status: 'sent',
                                    receiverProfilePicture: item.profilePicture
                                });
                                
                                
                               
                                setDoc(databaseRef, {
                                    from: currentUserId,
                                    to: item.email,
                                    senderEmail: auth.currentUser.email,
                                    senderFirstName: currentUserName,
                                    senderLastName: currentUserLastName,
                                    senderID: currentUserId,
                                    senderProfilePicture: Picdata,
                                    status: 'received'
                                })
                                
                            },
                        },
                        {
                            text: "No",
                        },
                    ],
                    
                )
    
            }
            handleSendRequest()
        }}>
                    <View style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: "center",
                    paddingRight: 20,
                    backgroundColor: '#161616',
                    borderRadius: 15,
                    margin: 10,
                    
                }}> 
                    <Image
                    style={styles.imageStyle}
                    source={{uri: item.profilePicture}}
                    
                    >

                    </Image>
                    
                        <View>
                        <Text style={styles.userTextStyle}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.emailText}>{item.email}</Text>
                        </View>
                </View>
            </TouchableOpacity>
    );


    useEffect(() => {
        
        const fetchUsers = async () => {
            const q = query(collection(db, 'userProfileInformation'),
            where('uid', '!=', currentUser.uid)
            );
            
            const querySnapshot = await getDocs(q)
            const data = [];
            querySnapshot.forEach((doc) => {
           
            data.push(doc.data());

            

           
        });
            setUsers(data) 

            
        };

        fetchUsers()

        const fetchCurrentUserName = async () => {
            const q = query(collection(db, "userProfileInformation"), 
            where("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
            const currentUserName = doc.data().firstName 
            const currentUserLastName = doc.data().lastName
            setCurrentUserName(currentUserName)
            setCurrentUserLastName(currentUserLastName)
        })
            
            
    }
    fetchCurrentUserName()

        const fetchCurrentUserEmail = async () => {
            const q = query(collection(db, "userProfileInformation"), 
            where("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
            const currentUserEmail = doc.data().email
            setCurrentUserEmail(currentUserEmail)
        })
        };
        fetchCurrentUserEmail();
    }, []);


    const onUserPress = (uid) => {
        return uid
    }
    
    const returnProfilePicture = (profilePicture) => {
        return profilePicture
    }
    
    /*Gonna need to make a component for display users, preferably in a flatlist */
    
 
    return (
        <View style={styles.container}>
            
            <FlatList 
            data={users}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => <UserItem item={item} />}
            style={[styles.container, styles.listStyle]}>
            </FlatList>
            
        </View> 
        
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    titleStyle: {
        fontWeight: '700',
        fontSize: 30,
        paddingLeft: 40, 
        paddingTop: 50,
        color: 'white'
    },
    userTextStyle: {
        color: 'white',
        fontSize: 18,
        
    },
    emailText: {
        color: '#bebebe',
      
        
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16
    },
    

})