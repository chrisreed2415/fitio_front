import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { containerfull, head1, link } from '../common/formcss';
import { button1 } from '../common/button';
import Bottomnavbar from './Bottomnavbar';
import SearchTopNav from '../SearchTopNav';
import FollowFeed from '../components/FollowFeed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';
import Login from './Login';
import SplashScreen from './Pages/SplashScreen';

const Landing = ({ navigation }) => {

  const [userdata, setUserdata] = React.useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [authChecked, setAuthChecked] = useState(false); // New state variable



  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUserdata(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('An error occurred while checking authentication.');
    } finally {
      setLoading(false);
      setAuthChecked(true); // Set the authChecked state to true after the authentication check is complete
    }
  };

  if (loading && !authChecked) {
    // Show the ActivityIndicator only during the authentication check
    return (
      <SplashScreen />
    );
  }


  return (
    <View style={styles.container}>
      <StatusBar />
      <SearchTopNav navigation={navigation} />
      <Bottomnavbar navigation={navigation}/>
      {userdata ? <FollowFeed userdata={userdata} navigation={navigation} /> : <Login/>}
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.fullbg,
        paddingVertical: 50,
    },
    bg: {
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
})