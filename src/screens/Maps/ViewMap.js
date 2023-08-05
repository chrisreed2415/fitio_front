import { StyleSheet, Text, View, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState} from 'react'
import MapView, { Marker } from 'react-native-maps'
import Bottomnavbar from '../Bottomnavbar'
import * as Location from 'expo-location'




const ViewMap = ({ navigation }) => {

    const [userLocation, setUserLocation] = useState(null);


    const getUserLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Location permission denied');
            return;
          }
    
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location.coords);
        } catch (error) {
          console.log('Error getting user location:', error);
        }
      };
    
      useEffect(() => {
        getUserLocation();
      }, []);


    return (
    <View style={styles.container}>
    <StatusBar />
    {userLocation ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Add a marker representing the user's current location */}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="You are here!"
          />
        </MapView>
      ) : (
        <ActivityIndicator
            size="large"
            color="black"/>
      )}
    <Bottomnavbar navigation={navigation}/>
  </View>
    )
}


export default ViewMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      map: {
        width: '100%',
        height: '100%',
      },
})