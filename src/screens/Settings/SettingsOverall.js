import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'; 
import { button1 } from '../../common/button';
import { icon1 } from '../../common/formcss';
import { COLORS } from '../../constants/theme';

const SettingsOverall = ({ navigation }) => {
    const logout = () => {
        AsyncStorage.removeItem('user').then(() => {
            alert('Logged out')
            navigation.navigate('login')
        })
    }
  return (
    <View style={styles.container}>
        <View style={styles.backpage}>
        <Ionicons name="chevron-back-circle" size={24} color="white"  style={icon1}

                onPress={() => navigation.navigate('UserProfile')}
            />
        </View>
            <FontAwesome name="gear" size={24} color="black" style={styles.settings} />

            <Text style={styles.txt1}
            onPress={() => navigation.navigate('Upload')}
            >Change Profile Pic</Text>
            <Text style={styles.txt1}
            ></Text>
            <Text style={styles.txt1}
            ></Text>
            <View style={styles.logout}>
            <Text style={button1} onPress={
                () => logout()
            }>Logout</Text>
            </View>
    </View>
  )
}

export default SettingsOverall

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.fullbg
    },
    logout: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 550,
    },
    settings: {
        top: 20,
        marginTop: 20,
        color: 'white',
        fontSize: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        alignSelf: 'center'
    },
    txt1: {
        top: 70,
        borderColor: 'white',
        marginTop: 20,
        color: 'white',
        fontSize: 20,
        borderBottomWidth: 5,
    },
    backpage: {
        top: 50,
        left: 20,
    }
})