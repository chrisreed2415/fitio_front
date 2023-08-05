import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { icon1 } from './common/formcss';
import { COLORS } from './constants/theme';

const SearchTopNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Ionicons name="search-circle-outline" size={24} color="white" style={icon1}
      onPress={() => navigation.navigate('Searchpage')} />
    </View>
  )
}

export default SearchTopNav

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
        backgroundColor: 'transparent',
    }
})