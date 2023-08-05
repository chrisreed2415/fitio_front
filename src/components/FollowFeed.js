import { Dimensions, ScrollView, StyleSheet, Text, Image, View, RefreshControl, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Postcard from '../cards/Postcard'
import { COLORS } from '../constants/theme';
import character from '../../assets/character.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');



const FollowFeed = ({ navigation, userdata }) => {
    const [refreshing, setRefreshing ] = React.useState(false);
    const [useron, setUseron] = useState(null)
    const [communityFeed, setCommunityFeed] = useState([]);
    const [load, setLoad] = useState(true)

    //console.log('stuff to see', userdata)




    useEffect(() => {
        const useron = userdata.user._id
        setUseron(useron)
        getFeed(useron)
      }, [])

    const getFeed = async () => {
      try {
        const response = await fetch('https://fitio-app-de100ac379ec.herokuapp.com/communityfeed');
        const data = await response.text(); // Fetch response as text, not JSON
        //console.log('Fetched data:', data); // Log the response to check if it's valid JSON
        setCommunityFeed(JSON.parse(data)); // Parse JSON and set the communityFeed state
        setLoad(false);
      } catch (error) {
        console.error('Error while fetching community feed:', error);
        setLoad(false);
      }
    };

    // let udata = [
    //     {
    //         id: 1,
    //         username: 'Google_123',
    //         profile_image: 'data:image/png;base64,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',
    //         image: "data:image/png;base64,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",
    //         likes: [
    //             "harshal_123",
    //             "viraj_123"
    //         ],
    //         comments: [
    //             {
    //                 id: 1,
    //                 username: 'harshal_123',
    //                 comment: 'nice post'
    //             },
    //             {
    //                 id: 2,
    //                 username: 'viraj_123',
    //                 comment: 'Your look awesome'
    //             }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         username: 'Facebook_123',
    //         profile_image: 'data:image/png;base64,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',
    //         image: "data:image/jpeg;base64,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",

    //         likes: [
    //             "viraj_123"
    //         ],
    //         comments: [
    //             {
    //                 id: 1,
    //                 username: 'harshal_123',
    //                 comment: 'nice post'
    //             },
    //             {
    //                 id: 2,
    //                 username: 'viraj_123',
    //                 comment: 'Your look awesome'
    //             }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         username: 'Google_123',
    //         profile_image: 'data:image/png;base64,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',
    //         image: "data:image/png;base64,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",
    //         likes: [
    //             "harshal_123",
    //             "viraj_123"
    //         ],
    //         comments: [
    //             {
    //                 id: 1,
    //                 username: 'harshal_123',
    //                 comment: 'nice post'
    //             },
    //             {
    //                 id: 2,
    //                 username: 'viraj_123',
    //                 comment: 'Your look awesome'
    //             }
    //         ]
    //     },
    //     {
    //         id: 4,
    //         username: 'Facebook_123',
    //         profile_image: 'data:image/png;base64,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',
    //         image: "data:image/jpeg;base64,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",

    //         likes: [
    //             "viraj_123"
    //         ],
    //         comments: [
    //             {
    //                 id: 1,
    //                 username: 'harshal_123',
    //                 comment: 'nice post'
    //             },
    //             {
    //                 id: 2,
    //                 username: 'viraj_123',
    //                 comment: 'Your look awesome'
    //             }
    //         ]
    //     }
    // ]

    //console.log('ohno',communityFeed)

    const renderPostItem = ({ item }) => {
      const postid = item._id
      const postContent = item.posts;
      const postTags = item.posttags.join(', ');
      const username = item.user.username;
      const profilePic = item.user.profilepic || null; // Replace with a default profile picture URL

      const isImagePost = postContent.startsWith('https://firebasestorage.googleapis.com/v0/');


    return (
      <View style={styles.postContainer}>
      {isImagePost && (
        <>
          <TouchableOpacity
          key={postid}
          onPress={() => navigation.navigate('Viewother', { post: item, viewpdata: communityFeed})} >
          <Image source={{ uri: postContent }} style={styles.image} />
          </TouchableOpacity>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <Image source={character} style={styles.profilePic} />
          )}
        </>
      )}
      <View style={styles.textContainer}>
        {!isImagePost && <Text style={styles.text}>{postContent}</Text>}
        <View style={styles.useroverlay}>
              <Text style={styles.username}>{username}</Text>
            </View>
        <Text style={styles.postTags}>{postTags}</Text>
      </View>
    </View>
  );
};
    if (load) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        {communityFeed && communityFeed.length > 0 ? (
          <FlatList
            data={communityFeed}
            renderItem={renderPostItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={{ textAlign: 'center' }}>No posts in the community feed.</Text>
        )}
      </View>
    );
  };


export default FollowFeed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 5,
  },
  image: {
    width: width - 32, // Set the width to the screen width minus some padding
    height: (width - 32) * (4032 / 3024), 
    borderRadius: 8,
    marginBottom: 8,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postTags: {
    color: 'gray',
  },
  useroverlay: {
    position: 'absolute',
    bottom: 505, // Adjust bottom positioning as needed
    left: 40, // Adjust left positioning as needed
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color for the username overlay
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  profilePic: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 10, // Adjust top positioning as needed
    left: 20, 
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: -10,
    marginBottom: 90,
  },
})