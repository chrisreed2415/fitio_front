import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { button1, sidebutton } from '../common/button'
import mainlogo from '../../assets/mainlogo.png'



const Welcome = ({navigation}) => {
  return (
    <View style={[styles.container, styles.bg]}>
        <View style={styles.container1}>
        <View>
            <Image style={styles.head} source={mainlogo}/>
        </View>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={sidebutton}
                
            >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={sidebutton}
            >Signup</Text>
            </TouchableOpacity>
        </View>
            
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    bg: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    row: {
        flexDirection: 'row'
    },
    head: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

    }

})