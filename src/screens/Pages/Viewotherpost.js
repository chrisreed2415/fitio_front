import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../constants/theme'
import { Ionicons } from '@expo/vector-icons';
import { icon1 } from '../../common/formcss';
import character from '../../../assets/character.png'

const { width } = Dimensions.get('window');

const Viewotherpost = ({ navigation, route }) => {

    const { post, viewpdata } = route.params;
    //console.log('viewimage data', post.user)

  return (
    <View style={styles.userInfo}>
        <Ionicons name="chevron-back-circle" size={24} color="white"  style={icon1}

        onPress={() => navigation.navigate('landing')}
        />

        <View style={styles.picInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('Viewusers', { user: post.user})}
        >
        {post.user.profilepic ? (
            <Image source={{ uri: post.user.profilepic }} style={styles.profilePic} />
          ) : (
            <Image source={character} style={styles.profilePic} />
          )}
        <Text style={styles.username}>{post.user.username}</Text>
      <Image style={styles.postImage} source={{ uri: post.posts }} />
      <Text style={styles.postTitle}>{post.posttags}</Text>
      </TouchableOpacity>
      </View>


    </View>
  )
}

export default Viewotherpost

const styles = StyleSheet.create({
    postImage: {
        width: width - 32, // Set the width to the screen width minus some padding
        height: (width - 32) * (4032 / 3024), 
        borderRadius: 8,
        marginBottom: 8,
      },
      postTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      userInfo: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.fullbg,
        paddingVertical: 50,
      },
      picInfo: {
        marginTop: 20,
        marginBottom: 16,
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 16,
      },
      username: {
        textAlign: 'center',
        top: -8,
        right: 5,
        color: 'white',
        marginBottom: 10,
        fontSize: 12,
        fontWeight: 'bold',
        fontSize: 16,
        fontWeight: 'bold'
    },
    profilePic: {
        alignSelf: 'center',
        width: 70,
        height: 70,
        top: -10, // Adjust top positioning as needed
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: -10,
        marginBottom: 5,
      },
})