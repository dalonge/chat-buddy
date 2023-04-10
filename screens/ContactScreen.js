import React, { cloneElement, useReducer } from "react";
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, RefreshControl, ListHeaderComponent, Alert} from "react-native";
import { uid } from "./CreateNewAccountScreen";
import { useEffect } from "react";
import { getAuth, signOut} from "firebase/auth";
import {doc, collection, where, query, getDocs, setDoc, getDoc, addDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from "react";
import  {AsyncStorage} from '@react-native-async-storage/async-storage'

const ContactScreen = ({navigation}) => {
    const [requestsData, setRequestData] = useState([]);
    const [acceptedFriends, setFriends] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [showBox, setShowBox] = useState(true)
    const auth = getAuth();
    const currentUser = auth.currentUser
    /* query the entire collection of friend requests */
    /* looking to see if the receiver id == the current user */
    /* if condition is met, return the information of the sender */ 
    

    useEffect(() =>{
       
        const auth = getAuth()
        const findMatchingRequestReceiver = async () => {
            const q = query(collection(db, "userProfileInformation", auth.currentUser.uid, "myRequests"),
                where("senderID", "!=", auth.currentUser.uid)
            );
            
            const querySnapshot = await getDocs(q)
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push(doc.data())
                
            });
            setRequestData(requests)
        }
        findMatchingRequestReceiver()
        
    }, []);
  
    const onRefresh = React.useCallback(() => {
        
        setRefreshing(true);
        const fetchAcceptedFriends = async () => {
            
            const friends  = []
            const friendsCollection = collection(db, 'userProfileInformation', auth.currentUser.uid, 'friends')
            const querySnapshot = await getDocs(friendsCollection)
            
            querySnapshot.forEach((friend) => {
                friends.push(friend.data())
            });
            setFriends(friends)
            
            
            }
         
        // Call the function to get the latest friend requests
    

        const findMatchingRequestReceiver = async () => {
            const q = query(collection(db, "userProfileInformation", auth.currentUser.uid, "myRequests"),
                where("senderID", "!=", auth.currentUser.uid)

            );
            
            const querySnapshot = await getDocs(q)
            
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push(doc.data())
                
            });
            setRequestData(requests)
            
        }
        findMatchingRequestReceiver().then(() => {
            fetchAcceptedFriends().then(() => {
                setRefreshing(false);
            });
        }); 
        
        
    }, []);
    

    const fetchUserData = (user) => {
        return user
    }

    const UserItem = ({ item }) => (
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
                
                    <Image
                    style={styles.imageStyle}
                     source={
                        {uri: item.senderProfilePicture}
                        }>
 
                    </Image>
                        <View>
                        <Text style={styles.userTextStyle}>{item.senderFirstName} {item.senderLastName}</Text>
                        <Text style={styles.emailText}>{item.senderEmail}</Text>
                        
                        
                    </View>
                    
                    <View style={styles.acceptDeclineContainer}>
                        <TouchableOpacity 
                            style={styles.acceptButton}
                            onPress={() => {
                                
            

            return Alert.alert(
                "Are your sure?",
                "Accept " + item.senderFirstName + " " + item.senderLastName + "'s friend request?",
                [ 
                    {
                        text: "Yes",
                        onPress: async () => {
                            setShowBox(true);
                            
                            /* set that users data in the current users friend collection*/
                            
                            const user_profile_picture = fetchUserData(item.senderProfilePicture)
                            const user_email = fetchUserData(item.senderEmail)
                            const user_id = fetchUserData(item.senderID)
                            const user_firstname = fetchUserData(item.senderFirstName)
                            const user_lastname = fetchUserData(item.senderLastName)
                            const friendsCollection = collection(db, 'userProfileInformation', auth.currentUser.uid, 'friends')
                            const senderCollection = collection(db, 'userProfileInformation', user_id, 'friends')
                            
                            const RecRequest = doc(senderCollection, auth.currentUser.uid)
                            const receiver = doc(friendsCollection, item.senderID)

                            const docRef = doc(db, 'userProfileInformation', auth.currentUser.uid);

                            const snapShot = await getDoc(docRef)
                            const userCollectionRef = query(collection(db, 'userProfileInformation', auth.currentUser.uid, 'myRequests'),
                                where('senderID', '==', user_id),

                            
                            )
                            const receiverCollectionRef = query(collection(db, 'userProfileInformation', user_id, 'myRequests'),
                                where('senderID', '==', user_id),

                            )
                            if (snapShot.exists()) {
                                const data = snapShot.data()
                                const firstName = data.firstName
                                const lastName = data.lastName 
                                const email = data.email
                                const uid = data.uid
                                const profilePicture = data.profilePicture

                                await setDoc(RecRequest, {
                                    firstName: firstName,
                                    lastname: lastName,
                                    uid: uid,
                                    email: email,
                                    profilePicture: profilePicture
                           })
                            const querySnapshot = await getDocs(receiverCollectionRef)
                            querySnapshot.forEach((user) => {
                                deleteDoc(user.ref)
                                console.log('user removed')
                            })
                            
                            }
                           await setDoc(receiver, {
                                firstName: user_firstname,
                                uid: user_id,
                                lastname: user_lastname,
                                email: user_email,
                                profilePicture: user_profile_picture
                                
                           })
                            
                            // deleting the request document from collection?
                        
                        const querySnapshot = await getDocs(userCollectionRef)
                        // where user id equals sender id, DELETE IT
                        querySnapshot.forEach((user) => {
                            deleteDoc(user.ref)
                            console.log('user removed')
                        })
                        // creates a conversation with this user
                        const combinedUserIds = [auth.currentUser.uid, user_id].sort().join('')
                        const userDocumentReference = doc(db, 'userConversations', combinedUserIds)

                        const data = {
                            createdBy: auth.currentUser.uid,
                            conversationCreated: Date.now(),
                            
                        }
                        
                        setDoc(userDocumentReference, data) 

                         
                        },
                    },
                    {
                        text: "No",
                    },
                ]
            );
                            }}>
                            <Text style={styles.acceptButtonText}>
                                Accept
                            </Text>
                        </TouchableOpacity>

                
                        </View>
                        <View>
                            <TouchableOpacity 
                            style={styles.declineButton}
                            onPress={() => {
                            console.log('declined')
                            }}>
                                <Text style={styles.declineButtonText}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                        </View>
                    
                </View>
                
            </TouchableOpacity>
            
    );
    

    const FriendItem = ({ item }) => (
        
        <TouchableOpacity
        onPress={() =>{
            
        
        }}
        
        >
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
                     source={
                        require('../images/user.png')
                        }>
 
                </Image>
                    <View>
                        <Text style={styles.userTextStyle}>{item.name}</Text>
                        <Text style={styles.emailText}>{item.email}</Text>
                       
                    </View>
                </View>
        </TouchableOpacity>
    );
        
   
    return (
        
        <View style={styles.container}>
        
               
               <FlatList 
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
               }
            data={requestsData}
            keyExtractor={(item) => item.user_id}
            renderItem={({ item }) => <UserItem item={item}
            key={(item) => item.user_id}
    
            />}
            
            style={[styles.container, styles.listStyle]}>
            </FlatList>
               
               
               
                 
                
            
            
        </View>
    )
    
        
        
    
}




export default ContactScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    userTextStyle: {
        color: 'white'
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16
    },
    userEmailStyle: {
        color: 'white',
        
    },
    titleStyle: {
        fontWeight: '700',
        fontSize: 30,
        paddingLeft: 40, 
        paddingTop: 50,
        color: 'white'
    },
    emailText: {
        color: '#bebebe',
      
        
    },
    acceptButton: {
        backgroundColor: '#556080',
        borderRadius: 5,
        margin: 4,
        padding: 7,
        marginLeft: 10,
        
        display: 'flex'
    },
    declineButton: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: '#556080',
        
        borderRadius: 5,
        margin: 4,
        padding: 7,
        display: 'flex',
        
        
    },
    
    acceptButtonText:{
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        
    },
    declineButtonText: {
        color: '#556080',
        textAlign: 'center',
        fontWeight: '700',

    },
    acceptDeclineContainer: {
        display: 'flex',
    }
})