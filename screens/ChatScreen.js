import React, { useReducer } from "react";
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, RefreshControl, ListHeaderComponent, Alert} from "react-native";
import { uid } from "./CreateNewAccountScreen";
import { useEffect } from "react";
import { getAuth, signOut} from "firebase/auth";
import {doc, collection, where, query, getDocs, setDoc, getDoc, addDoc} from 'firebase/firestore';
import { db } from '../firebase'
import { useState } from "react";
import {AsyncStorage} from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from '../screens/UserProfileScreen'




const ChatScreen = ({navigation}) => {


    const [requestsData, setRequestData] = useState([]);
    const [acceptedFriends, setFriends] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [showBox, setShowBox] = useState(true)
    const auth = getAuth();
    const currentUser = auth.currentUser

    useEffect(() => {
        const friendsCollection = collection(db, 'userProfileInformation', auth.currentUser.uid,'friends')
        const fetchAcceptedFriends = async () => {
            const friends  = []
            
            const querySnapshot = await getDocs(friendsCollection)
            querySnapshot.forEach((friend) => {
                friends.push(friend.data())
            });
            setFriends(friends)
            
            
            }
            fetchAcceptedFriends()
    },[])

    const onRefresh = React.useCallback(() => {
        
        setRefreshing(true);
        const friendsCollection = collection(db, 'userProfileInformation', auth.currentUser.uid,'friends')
        const fetchAcceptedFriends = async () => {
            const friends  = []
            
            const querySnapshot = await getDocs(friendsCollection)
            querySnapshot.forEach((friend) => {
                friends.push(friend.data())
            });
            setFriends(friends)
         
            }
         fetchAcceptedFriends().then(() => {
            setRefreshing(false)
         })
        // Call the function to get the latest friend requests
           

        
        
        
    }, []);
    

  
    const FriendItem = ({ item }) => (
        
        <TouchableOpacity
            
            onPress={() =>{
            navigation.navigate('UserProfile', {
                uid: item.uid,
                email: item.email,
                firstname: item.firstName,
                lastname: item.lastname,
                profilePicture: item.profilePicture
            })
            
                
            
            
           
            
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
                     source={
                        {uri: item.profilePicture}
                        }>
 
                </Image>
                
                    <View>
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>1:23 AM</Text>
                        </View>
                        
                        <Text style={styles.userTextStyle}>{item.firstName} {item.lastname}</Text>
                        <Text style={styles.emailText}>(previous conversation goes here)</Text>
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
                />}
            data={acceptedFriends}
            
            keyExtractor={(item) => {item.uid.toString()}}
            renderItem={({ item }) => 
            <FriendItem item={item}
            key={item.uid}
            />}
        
            style={[styles.container, styles.listStyle]}>
            </FlatList>
               
               
               
                 
                
            
            
        </View>
      )
}


export default ChatScreen

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
    timeText: {
        color: '#bebebe',
        alignSelf: 'flex-end'
        
    },
    timeContainer: {
        
        paddingLeft: 200
    }
})