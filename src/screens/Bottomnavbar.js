import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { head1, link, icon1 } from '../common/formcss';
import { button1 } from '../common/button';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const Bottomnavbar = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.bg]}>

      <Fontisto name="map-marker-alt" size={24} color="black" style={icon1}
      
      onPress={() => navigation.navigate('Viewmap')}/>
      
      <Ionicons name="people" size={24} color="black" style={icon1}

      onPress={() => navigation.navigate('landing')} />

      <AntDesign name="camera" size={24} color="black" style={icon1} 
      
      onPress={() => navigation.navigate('Addpost')}/>
      <Fontisto name="person" size={24} color="black" style={icon1}
      onPress={() => navigation.navigate('UserProfile')}/>
    </View>
  )
}

export default Bottomnavbar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: COLORS.fullbg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        height: 90,
        width: '100%',
        zIndex: 100,
        paddingVertical: 10,
    },
})