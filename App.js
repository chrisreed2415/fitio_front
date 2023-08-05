import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Landing from './src/screens/Landing';
import Verification from './src/screens/Verification';
import UserProfile from './src/screens/User/UserProfile';
import Friends from './src/screens/Friends';
import Searchpage from './src/screens/Pages/Searchpage';
import SettingsOverall from './src/screens/Settings/SettingsOverall';
import UploadProfile from './src/screens/Settings/UploadProfile';
import AddPosts from './src/screens/User/AddPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewUsers from './src/screens/User/ViewUsers';
import ViewPosts from './src/screens/User/ViewPosts';
import ViewMap from './src/screens/Maps/ViewMap';
import Viewotherpost from './src/screens/Pages/Viewotherpost';
import FollowerList from './src/screens/User/FollowList/FollowerList';
import FollowingList from './src/screens/User/FollowList/FollowingList';
import FP_Email from './src/screens/Verification/FP_Email';
import FP_Complete from './src/screens/Verification/FP_Complete';
import FP_PasswordChange from './src/screens/Verification/FP_PasswordChange';
import FP_VerifyCode from './src/screens/Verification/FP_VerifyCode';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Mono: require('./assets/fonts/Mono.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="landing" component={Landing} 
          options={{
            headerShown: false
          }} />


          <Stack.Screen name="welcome" component={Welcome}
          options={{
            headerShown: false
          }} />
          <Stack.Screen name="login" component={Login} 
          options={{
            headerShown: false
          }} />

          <Stack.Screen name="fp_pw" component={FP_PasswordChange} 
          options={{
            headerShown: false
          }} />

          <Stack.Screen name="fp_verify" component={FP_VerifyCode} 
          options={{
            headerShown: false
          }} />

        <Stack.Screen name="fp_complete" component={FP_Complete} 
          options={{
            headerShown: false
          }} />

        <Stack.Screen name="fp_email" component={FP_Email} 
          options={{
            headerShown: false
          }} />

          <Stack.Screen name="signup" component={Signup} 
          options={{
            headerShown: false
          }} />

          <Stack.Screen name="verification" component={Verification} 
          options={{
            headerShown: false
          }} />

          <Stack.Screen name="friends" component={Friends}
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="UserProfile" component={UserProfile} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Searchpage" component={Searchpage} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Settings" component={SettingsOverall} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Upload" component={UploadProfile} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Addpost" component={AddPosts} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Viewusers" component={ViewUsers} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Viewpost" component={ViewPosts} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Viewmap" component={ViewMap} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Viewother" component={Viewotherpost} 
          options={{
            headerShown: false,
          }} />

        <Stack.Screen name="Followerlist" component={FollowerList} 
          options={{
            headerShown: false,
          }} />

          <Stack.Screen name="Followinglist" component={FollowingList} 
          options={{
            headerShown: false,
          }} />



        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
