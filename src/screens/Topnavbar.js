import { StyleSheet, Text, View, Image } from 'react-native'
import { head1, link, icon1 } from '../common/formcss';
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; 
import { COLORS } from '../constants/theme';

const Topnavbar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="gear" size={24} color="black" style={icon1}
      onPress={() => navigation.navigate('Settings')} />
    </View>
  )
}

export default Topnavbar

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      width: '100%',
      paddingVertical: 10,
      position: 'absolute',
      top: 30,
      left: 370,
      zIndex: 100,
      backgroundColor: COLORS.fullbg,
    }
})