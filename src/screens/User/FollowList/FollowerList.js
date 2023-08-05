import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../../constants/theme';
import Userinfocard from '../../../cards/Userinfocard';
import { Ionicons } from '@expo/vector-icons';
import { icon1 } from '../../../common/formcss';

const FollowerList = ({ navigation, route }) => {
    const[loading, setLoading] = useState(false)
    const { followdata } = route.params;
    //console.log('data to display', followdata)
    const [followers, setFollowers] = useState([])

    useEffect(() => {
      fetchFollowersData();
    }, []);
  

    const fetchFollowersData = async () => {
      try {
        // Fetch followers' data for the current user from the backend
        // Replace 'userId' with the actual user's ID from your authentication system
        const userId = followdata._id;
        const response = await fetch(`https://fitio-app-de100ac379ec.herokuapp.com/${userId}/followers`);
        const data = await response.json();
  
        const followersArray = Object.values(data.user.followers);
        if (Array.isArray(followersArray)) {
          setFollowers(followersArray);
        } else {
          setFollowers([]);
        }
      } catch (error) {
        console.error('Error while fetching followers:', error);
      }
    };

    //console.log(followers)

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.goback}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="white" style={icon1} />
        </TouchableOpacity>
        {
          loading ?
          <ActivityIndicator size='large' color='white' />
          :
  
            <ScrollView style={styles.ulists}>
            {
              followers.map((item) => {
                return <Userinfocard key={item.username} user={item}
                  navigation={navigation}
                />
                
  
              })
            }
  
          </ScrollView>
        
        }
      </View>
  
    )
  }

export default FollowerList

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.fullbg,
    paddingVertical: 50,
},
search: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 18,
    alignSelf: 'center'
},
userlists: {
  width: '100%',
  marginTop: 20,
 }
})