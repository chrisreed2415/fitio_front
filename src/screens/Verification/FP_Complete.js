import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { button1 } from '../../common/button';

const FP_Complete = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.bg]}>
    <View style={styles.s1}>
    <View style={styles.formgroup}>
    <MaterialCommunityIcons name="check-decagram" size={30} color="#99B83C" />
      <Text style={styles.label}
      >Password Changed! Account Recovered</Text>
    </View>
    <Text style={button1}
                onPress={() => navigation.navigate('login')}
            >
                Login
            </Text>
    </View>
  </View>
  )
}

export default FP_Complete

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
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
      },
      head: {
        textAlign: 'center',
        top: -50,
        fontFamily: "Mono",
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
      },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
      },
      label: {
        fontFamily: "Mono",
        fontSize: 17,
        color: 'white',
        marginLeft: 10,
        marginBottom: 5,
      },
    
})