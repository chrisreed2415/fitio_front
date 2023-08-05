import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import Bottomnavbar from './Bottomnavbar'
import Topnavbar from './Topnavbar'

import { containerfull, head1, link } from '../common/formcss';

const Friends = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation}/>
      <Text style={head1}>Friends</Text>
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    },
})