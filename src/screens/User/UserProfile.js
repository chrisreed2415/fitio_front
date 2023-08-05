import { StyleSheet, Dimensions, Text, View, StatusBar, Image, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Bottomnavbar from '../Bottomnavbar'
import Topnavbar from '../Topnavbar'
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import character from '../../../assets/character.png'
import { containerfull, head1, link } from '../../common/formcss'
import { COLORS } from '../../constants/theme';

const UserProfile = ({ navigation }) => {

  const [refreshing, setRefreshing ] = React.useState(false);

  const [userdata, setUserdata] = React.useState(null)

  const loaddata = async () => {
    AsyncStorage.getItem('user')
    .then(async (value) => {
      fetch('https://fitio-app-de100ac379ec.herokuapp.com/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(value).token
        },
        body: JSON.stringify({ email: JSON.parse(value).user.email })
      })

      .then(res => res.json())
      .then( data => {
        if (data.message == "User Found") {

          setUserdata(data.user)
        }
        else {
          alert ('Something went wrong')
          navigation.navigate('login')
        }
      })
      .catch(err => {
        navigation.navigate('login')
      })
    })
    .catch(err => alert(err))
  }
  useEffect(() => {
    loaddata()
  }, [])


console.log(userdata)


  // const data = {
  //   username : "test",
  //   followers: 100,
  //   following: 94,
  //   bio: "I am a test user",
  //   profile_image: 'https://picsum.photos/500/500',
  //   posts: [
  //     {
  //       id: 1,
  //       post_image: 'https://picsum.photos/400/400'
  //     },
  //     {
  //       id: 2,
  //       post_image: 'https://picsum.photos/200/200'
  //     },
  //     {
  //       id: 3,
  //       post_image: 'https://picsum.photos/300/300'
  //     },
  //     {
  //       id: 4,
  //       post_image: 'https://picsum.photos/100/100'
  //     }
  //   ]

  // }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={"UserProfile"}/>
      
      {
        userdata?
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl tintColor="transparent" colors="white" refreshing={refreshing} onRefresh={loaddata}  />
        }>
        <View style={styles.c1}>
          {
            userdata.profilepic.length > 0 ?
            <Image style={styles.profilepic} source={{uri: userdata.profilepic}} />
            :
            <Image style={styles.profilepic} source={character} />


          }
          <Text style={styles.txt}>@{userdata.username}</Text>

          <View style={styles.c11}>
            <TouchableOpacity onPress={() => navigation.navigate('Followerlist', { followdata: userdata})} >
            <View style={styles.c111}>
              <Text style={styles.txt1}>Followers 
              <Text style={styles.txt2}>  {userdata.followers.length}</Text>
              </Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Followinglist', { followingdata: userdata})} >
            <View style={styles.c111}>
              <Text style={styles.txt1}>Following
              <Text style={styles.txt2}>  {userdata.following.length}</Text>
              </Text>
            </View>
            </TouchableOpacity>
          </View>

          {
            userdata.bio.length > 0 &&
            <Text style={styles.bio}>{userdata.bio}</Text>
            

          }

        </View>


        {
            userdata.posts.length > 0 ?
            <View style={styles.c1}>
              <Text style={styles.txt}></Text>
              <View style={styles.c13}>
              {
                 userdata.posts?.map(
                        (item) => {
              return (
                <TouchableOpacity
                   key={item._id}
                   onPress={() => navigation.navigate('Viewpost', { post: item, prodata: userdata})} >
                   <Image style={styles.postpic} source={{ uri: item.posts }} />
                  </TouchableOpacity>
                   )
                 }
                 )
                }
          </View>
        </View>
            
        :
            <View style={styles.bud}>
              <Text style={styles.txt}>No Posts?</Text>
            </View>

          }
      </ScrollView>

        :
        <ActivityIndicator size="large" color="white" />
      }



    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.fullbg,
    paddingVertical: 50,
},
c1: {
  width: '100%',
  alignItems: 'center',
},
profilepic: {
  width: 150,
  height: 150,
  borderRadius: 75,
  margin: 40,
},
txt: {
  color: 'white',
  fontFamily: "Mono",
  fontSize: 20,
  fontWeight: 'bold',
  margin: 1,
  paddingVertical: 5,
  paddingHorizontal: 20,
  
},
txt1: {
  color: 'white',
  fontSize: 15,
  fontFamily: "Mono",
  
},
txt2: {
  color: 'white',
  fontSize: 20,
},
c11: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around'
},
c111: {
  alignItems: 'center',
  backgroundColor: '#192536',
  borderRadius: 10,
  padding: 10,
  width: 200,
},
vr1: {
  width: 1,
  height: 50,
  backgroundColor: 'white',
},
bio: {
  color: 'white',
  fontSize: 15,
  marginVertical: 10,
  backgroundColor: 'black',
  width: '100%',
  padding: 10,
  paddingVertical: 20,

},
postpic: {
  width: 300,
  height: 300,
  margin: 20,
  borderRadius: 20,
},
c12: {
  flexDirection: 'row',
  flexWrap: 'wrap',
},
bud: {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: 200
},
c13: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 20,
  justifyContent: 'center'
},
})