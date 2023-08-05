import { StyleSheet, Text, View, StatusBar, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'
import React , { useEffect } from 'react'
import Bottomnavbar from '../Bottomnavbar'
import Topnavbar from '../Topnavbar'
import character from '../../../assets/character.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../constants/theme'


const ViewUsers = ({ navigation, route }) => {

    const [refreshing, setRefreshing ] = React.useState(false);

  const [userdata, setUserdata] = React.useState(null)

  const { user } = route.params

  const loaddata = async () => {
    fetch('https://fitio-app-de100ac379ec.herokuapp.com/viewuserdata', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ email: user.email })
    })
        .then(res => res.json())
        .then(data => {
            if(data.message == 'User Found') {
                setUserdata(data.user)
                isProfile(data.user)
                CheckFollow(data.user)
            }
            else {
                alert('User Not Found')
                navigation.navigate('Searchpage')
            }
        })
        .catch(err => {
            alert('Something went wrong')
            navigation.navigate('Searchpage')
        })
  }
  useEffect(() => {
    loaddata()
  }, [])

  //ensure profile or view
const [sameuser, setSameuser] = React.useState(false)
const isProfile = async (otheruser) => {
  AsyncStorage.getItem('user').then((loggeduser) => {
    const loggeduserobj = JSON.parse(loggeduser)
    if(loggeduserobj.user.email == otheruser.email) {
      setSameuser(true)
    }
    else {
      setSameuser(false)
    }
  })

}
//following check
const [isfollowing, setIsfollowing] = React.useState(false)

const CheckFollow = async (otheruser) => {
  const loggeduser = await AsyncStorage.getItem('user')
  const loggeduserobj =JSON.parse(loggeduser);
    fetch('https://fitio-app-de100ac379ec.herokuapp.com/checkf', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
           followf: loggeduserobj.user.email,
            followt: otheruser.email })
    })
  .then(res => res.json())
  .then(data => {
    if(data.message == "User is following") {
      setIsfollowing(true)
    }
    else if (data.message == "User is NOT following") {
      setIsfollowing(false)
    }
    else {
      alert('Something went wrong')
    }
  })
}
//following user
const FollowUser = async (otheruser) => {
  const loggeduser = await AsyncStorage.getItem('user');
  const loggeduserobj = JSON.parse(loggeduser);

  fetch('https://fitio-app-de100ac379ec.herokuapp.com/followuser', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
           followf: loggeduserobj.user.email, 
           followt: otheruser.email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message == 'User Followed') {
        loaddata()
        setIsfollowing(true)
      }

    })
}
//unfollowing user

const unFollowUser = async (otheruser) => {
  const loggeduser = await AsyncStorage.getItem('user');
  const loggeduserobj = JSON.parse(loggeduser);

  fetch('https://fitio-app-de100ac379ec.herokuapp.com/unfollowuser', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ 
          followf: loggeduserobj.user.email, 
          followt: otheruser.email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message == 'User Unfollowed') {
        loaddata()
        setIsfollowing(false)
      }
      else {
        alert('Something went wrong')
      }

    })
}


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
          {
            !sameuser && <View style={styles.other}>
            {
              isfollowing ?
              <Text style={styles.follow}
              onPress={() => unFollowUser(userdata)}
          
          >UnFollow</Text>
          :
          <Text style={styles.follow}
              onPress={() => FollowUser(userdata)}
          
          >Follow</Text>
            }
            </View>
          }

          <View style={styles.c11}>
            <View style={styles.c111}>
              <Text style={styles.txt1}>Followers 
              <Text style={styles.txt2}>  {userdata.followers.length}</Text>
              </Text>
            </View>

            <View style={styles.c111}>
              <Text style={styles.txt1}>Following
              <Text style={styles.txt2}>  {userdata.following.length}</Text>
              </Text>
            </View>
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
                  <Image key={item.posts} style={styles.postpic}
                  source={{ uri: item.posts }}
                    />
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



export default ViewUsers

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
  width: '40%',
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
follow: {
    backgroundColor: '#192536',
    borderColor: 'white',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,

},
other: {
  flexDirection: 'row'

}
})
