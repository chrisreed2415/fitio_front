import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import character from '../../assets/character.png'

const { width } = Dimensions.get('window');

const Postcard = (
  {
    profilepic,
    username,
    posts,
    navigation
  }
) => {
  console.log('data to read', posts)

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
      {
      profilepic ? <Image source={{ uri: profilepic }} style={styles.profilePic}/>
      : <Image source={character} style={styles.profilePic}/>
    }
        {/* <Image source={{ uri: profilepic }} style={styles.profilePic} /> */}
        <Text style={styles.username}>{username}</Text>
      </View>
      {posts.map((post, postIndex) => (
        <View key={postIndex} style={styles.post}>
          {Array.isArray(post.posts) ? (
            post.posts.map((image, imageIndex) => (
              <TouchableOpacity
                key={`${postIndex}-${imageIndex}`}
                onPress={() => navigation.navigate('Viewpost', { post: image })}
              >
              <Image
                key={`${postIndex}-${imageIndex}`}
                source={{ uri: image.posts }}
                style={styles.postImage}
                onError={() => console.log(`Failed to load image: ${image.posts}`)}
               
              />
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Viewpost', { post })}>
            <Image
              key={`${postIndex}`}
              source={{ uri: post.posts }}
              style={styles.postImage}
              onError={() => console.log(`Failed to load image: ${post.posts}`)}
            />
            </TouchableOpacity>
          )}
          <Text style={styles.caption}>{post.posttags}</Text>
        </View>
      ))}
    </View>
  );
};
//     <FlatList
//     data={posts}
//     keyExtractor={(_, index) => index.toString()}
//     renderItem={({ item: post, index }) => (
//       <View style={styles.postContainer}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: profilepic }} style={styles.profilePic} />
//           <Text style={styles.username}>{username}</Text>
//         </View>
//         <Image source={{ uri: post.posts }} style={styles.postImage} />
//         <Text style={styles.caption}></Text>
//         {/* Render comments or other post-related content here */}
//       </View>
//     )}
//   />
// );
// };



export default Postcard

const styles = StyleSheet.create({

  c1: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile_image: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: -10,
    marginBottom: 90,
  },
  image: {
    width: '100%',
    height: 250,
    aspectRatio: 1
  },
  postContainer: {
    marginBottom: 16,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: 'white',
    marginBottom: 7,
    fontSize: 12,
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: 'bold',

},
  postImage: {
    width: width - 32, // Set the width to the screen width minus some padding
    height: (width - 32) * (4032 / 3024), 
    borderRadius: 8,
    marginBottom: 8,
  },

})