import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../../constants/theme';
import Userinfocard from '../../../cards/Userinfocard';
import { Ionicons } from '@expo/vector-icons';
import { icon1 } from '../../../common/formcss';

const FollowingList = ({ navigation, route}) => {
    const[loading, setLoading] = useState(false)
    const { followingdata } = route.params;
    //console.log('data to display', followdata._id)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        fetchFollowingData();
      }, []);

      const fetchFollowingData = async () => {
        try {
          // Fetch followers' data for the current user from the backend
          // Replace 'userId' with the actual user's ID from your authentication system
          const userId = followingdata._id;
          const response = await fetch(`https://fitio-app-de100ac379ec.herokuapp.com/${userId}/following`);
          const data = await response.json();
    
          const followingArray = Object.values(data.user.following);
          if (Array.isArray(followingArray)) {
            setFollowing(followingArray);
          } else {
            setFollowing([]);
          }
        } catch (error) {
          console.error('Error while fetching following:', error);
        }
      };

      //console.log(following)


      return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.goback}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="white" style={icon1} />
        </TouchableOpacity>
          {
            loading ? (
            <ActivityIndicator size='large' color='white' />
            ) : following.length > 0 ? (
    
              <ScrollView style={styles.ulists}>
              {
                following.map((item) => {
                  return <Userinfocard key={item.username} user={item}
                    navigation={navigation}
                  />
                  
    
                })
              }
    
            </ScrollView>
            ) : (
                <Text style={styles.notFollowingText}>Not following anyone</Text>
            )}
        </View>
    
      )
}

export default FollowingList

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.fullbg,
        paddingVertical: 50,
    },
    notFollowingText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
      },
})