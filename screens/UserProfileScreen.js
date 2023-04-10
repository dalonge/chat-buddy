import React, { useEffect, useRef, useCallback } from "react";
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Alert, } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import {doc, collection, addDoc, updateDoc, getDoc, setDoc, CollectionReference, onSnapshot, orderBy, getDocs, query, QuerySnapshot, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebase'
import { useState } from "react";
import { TouchableOpacity, Image, ListItem} from "react-native";
import { getAuth } from "firebase/auth";
import  {AsyncStorage} from '@react-native-async-storage/async-storage'
import { TextInput, Dimensions} from "react-native";
import { Bubble, GiftedChat, InputToolbar, MessageContainer } from "react-native-gifted-chat";
import { useLayoutEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";


const UserProfileScreen = ({route, navigation}, title, props) => {
   
    const {uid, email, firstname, lastname} = route.params;
    const [messageData, setMessageData] = useState('')
    const [currentUserDisplayName, setCurrentUserDisplayName] = useState('')
    const [currentUserProfilePicture, setCurrentUserProfilePicture] = useState('')
    const [messages, setMessages] = useState([])
    
    /* get current user id*/
    const auth = getAuth()
    const userChatReference = collection(db, 'userConversations')
    const userDocumentReference = doc(db, 'userConversations', auth.currentUser.uid)
    const myDocRef = doc(userChatReference, uid > auth.currentUser.uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid)
    const receiverDocRef = doc(userChatReference, uid + auth.currentUser.uid)
    
    const modifiedMyDocRef = doc(userChatReference, uid > auth.currentUser.uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid)
    const displayNameReference = collection(db, 'userProfileInformation')
    const userDisplayName = doc(displayNameReference, auth.currentUser.uid)
    const messagesReference = doc(userChatReference, uid > auth.currentUser.uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid)
    // get current user profile picture
    
    const fetchCurrentUserProfilePicture = async () => {
        const currentDocument = await getDoc(userDisplayName)
        const documentData = currentDocument.data()

        const profilePic = documentData.profilePicture

        setCurrentUserProfilePicture(profilePic)
        
 
     }
     fetchCurrentUserProfilePicture()
    

    useLayoutEffect(() => {
        // const userConvoData = userConversation.data().messages
        
            const queryCollectionReference = collection(db, 'userConversations', uid > auth.currentUser.uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid, 'conversationMessages')
            const collectionReference = query(queryCollectionReference, orderBy('createdAt', 'desc'))
            // const documentReference = doc(collectionReference, uid > auth.currentUser.uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid)
            // Reference the current conversation
            

            const unsubscribe = onSnapshot(collectionReference, snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        _id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user,
                        name: doc.data().name,
                        // avatar: doc.data().avatar
                    }))
                    
                )
               
            })
                
            return unsubscribe;
            
    }, [])

    useEffect(() => {
        
        const fetchCurrentUserDisplayName = async () => {
           const currentDocument = await getDoc(userDisplayName)
           const documentData = currentDocument.data()

           const displayName = documentData.displayName

           setCurrentUserDisplayName(displayName)
            
          
        }
        fetchCurrentUserDisplayName()
        
        
        

    }, [])    
    const onSend = useCallback((messages = []) => {
       
        setMessages(sentMessage => GiftedChat.append(sentMessage, messages))
      
        
       // This function sends the messsages, it creates a document with the information the user provides (the message)

       const sendChatMessage = (message) => {
        // You need to provide the path to the conversation
        const conversationReference = collection(db, 'userConversations')
        const documentReference = doc(conversationReference, uid > auth.currentUser.uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid)
        const chatMessageCollection = collection(documentReference, 'conversationMessages')

       
       const {_id, createdAt, text, user} = messages[0]
        


        addDoc(chatMessageCollection, {
            _id,
            createdAt: new Date(),
            text,
            user,
           
        })
       }
       sendChatMessage(messages[0].text)

       
    
    }, [])

    

        return (
        <View style={{backgroundColor: 'black', flex: 1}}>
             <GiftedChat
                
                onSend={message => onSend(message)}
                messages={messages}
                placeholder="Type your message here"
                showAvatarForEveryMessage
                alwaysShowSend
                renderBubble={props => {
                   return <Bubble
                   {...props}
                   
                   wrapperStyle={{
                    left: {
                      backgroundColor: '#161616',
                    },
                    right: {
                      backgroundColor: '#556080',
                    },
                  }}
                  
                  textStyle={{
                    left: {
                      color: '#fff',
                    },
                    right: {
                      color: 'white',
                    },
                  }}
                   
                   ></Bubble> 
                }}
                user={{
                    _id: auth?.currentUser?.email,
                    name: currentUserDisplayName,
                    avatar: currentUserProfilePicture
                }}>

                
                </GiftedChat>
        </View>
       

            // <View style={styles.container}>
                
                
            //     <TextInput
            //         style={styles.inputContainer}
            //         autoCorrect={false}
            //         onChangeText={chatMessage => {
            //             setMessageData(chatMessage)
            //         }}
            //     />
            //     <TouchableOpacity style={styles.sendButton}
            //     onPress={() => {
            //         sendMessage(messageData)
            //     }}
            //     >
    
            //         <Text style={styles.sendButtonText}>Send</Text>
                    
            //     </TouchableOpacity>
                  
            // </View>
            
        )
    
    
}

export default UserProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        
        backgroundColor: 'black'

    },
    
   
    

    
})