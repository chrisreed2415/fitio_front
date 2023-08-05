import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../../common/button'
import { firebase } from '../../Firebase/Config'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';

const UploadProfile = ({ navigation }) => {

    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        console.log(result)

    if (!result.canceled) {
        const source = {uri : result.uri};
        setImage(source);

        const response = await fetch(result.uri);
        const blob = await response.blob();
        const filename = result.uri.substring(result.uri);

        const ref = firebase.storage().ref().child(filename);
        const snapshot = await ref.put(blob);
        const url = await snapshot.ref.getDownloadURL();

        //console.log(url)
        return url
    }
    else if (result.canceled) {
        return ""

    }
    }

    const handleUpload = () => {
        // pickImage()
        AsyncStorage.getItem('user')
            .then(data => {
                console.log('testing for purpose', data)
                setLoading(true)

                pickImage().then(url => {
                    fetch('https://fitio-app-de100ac379ec.herokuapp.com/uploadprofile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            profilepic: url
                        })
                    })
                        .then(res => res.json()).then(
                            data => {
                                if (data.message === "Profile Picture Uploaded!") {
                                    setLoading(false)
                                    alert('Profile Picture Uploaded!')
                                    navigation.navigate('Settings')
                                }
                                else if (data.error === "Invalid Credentials") {
                                    alert('Invalid Credentials')
                                    setLoading(false)
                                    navigation.navigate('login')
                                }
                                else {
                                    setLoading(false)
                                    alert("Please Try Again");
                                }
                            }
                        )
                        .catch(err => {
                            console.log(err)
                        })

                })
            })
    }

  return (
    <View style={styles.buttoncenter}>
        {
            loading ? <ActivityIndicator
            size="large"
            color="white"
            
            /> :
            <Text style={button1}
            onPress={() => handleUpload()}>
                Upload Picture
            </Text>
        }
    </View>
  )
}

export default UploadProfile

const styles = StyleSheet.create({
    buttoncenter: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 550,
    },
})