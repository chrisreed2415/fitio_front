import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import character from '../../assets/character.png'
import { COLORS } from '../constants/theme'

const Userinfocard = ({ user, navigation}) => {
  console.log(user)
  return (
    <TouchableOpacity onPress={() => {navigation.navigate('Viewusers', { user: user})}}>
    <View style={styles.UserCard}>
    {
      user.profilepic ? <Image source={{ uri: user.profilepic }} style={styles.pic}/>
      : <Image source={character} style={styles.pic}/>
    }
    <View style={styles.base}>
      <Text style={styles.username}>{user.username}</Text>
    </View>
  </View>
  </TouchableOpacity>
  )
}

export default Userinfocard

const styles = StyleSheet.create({
    UserCard: {
        backgroundColor: '#111111',
        width: '100%',
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pic: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    username: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    base: {
        marginLeft: 20,
    },
})
