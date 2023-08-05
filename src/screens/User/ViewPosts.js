import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../constants/theme'
import { Ionicons } from '@expo/vector-icons';
import { icon1 } from '../../common/formcss';
import { Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ViewPosts = ({ navigation, route }) => {

    const { post, prodata } = route.params;


    //console.log(prodata._id)
    //console.log('postinfo',post.posts)

    const handleDelete =  async () => {
        const { _id, username, profilepic } = prodata
        const postId = post._id;

        fetch('https://fitio-app-de100ac379ec.herokuapp.com/deletepost', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ postId: post._id,
                   userId: prodata._id, postURL: post.posts  }),
        })
        .then(res=>res.json())
        .then(data => {
            if (data.message == 'Post deleted successfully') {
                navigation.navigate('UserProfile');
            } else {
                alert('Error', 'Failed to delete post.');
            }
          })
          .catch((error) => {
            // Handle fetch error or network error
            console.error('Error while deleting post:', error);
          });
    }

  return (
    <View style={styles.userInfo}>
        <Ionicons name="chevron-back-circle" size={24} color="white"  style={icon1}

        onPress={() => navigation.navigate('UserProfile')}
        />
        <TouchableOpacity onPress={handleDelete} style={styles.trash}>
        <Entypo name="trash" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.picInfo}>
        <Text style={styles.username}>{post.username}</Text>
      <Image style={styles.postImage} source={{ uri: post.posts }} />
      <Text style={styles.postTitle}>{post.posttags}</Text>
      </View>
    </View>
  )
}

export default ViewPosts

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
        marginTop: 60,
        marginBottom: 16,
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 16,
      },
      username: {
        color: 'white',
        marginBottom: 10,
        fontSize: 12,
        fontWeight: 'bold',
        fontSize: 16,
        fontWeight: 'bold',
    
    },
    trash: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 1,
    },
})