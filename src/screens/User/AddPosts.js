import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { button1 } from '../../common/button';
import { firebase } from '../../Firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formInput, formHead, formHead2, icon1 } from '../../common/formcss';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const AddPosts = ({ navigation}) => {
    const [posttags, setPosttags] = useState('')

    const [errorcheck, setErrorcheck] = useState(null)

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [posts, setPosts] = useState('')

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
           alert("You refused to allow this app to use your camera");
        return;
         }

        setLoading1(true)
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        setErrorcheck(result)

        if(!result.canceled) {
            const source = {uri : result.uri};

            const response = await fetch(result.uri);
            const blob = await response.blob();
            //const filename = result.uri.substring(result.uri);

            const ref = firebase.storage().ref().child(`images/${Date.now()}`);
            await ref.put(blob);
            const url = await ref.getDownloadURL();

            setLoading1(false)
            setPosts(url)
            setErrorcheck(result)

            console.log('FILE FILE', url)
        }

        else {
            setLoading1(false)
        }
    }

    const handlePost = () => {
        if (posts && errorcheck != null) {
            AsyncStorage.getItem('user')
                .then(data => {
                    setLoading2(true)
                    //console.log(posts)

                    fetch('https://fitio-app-de100ac379ec.herokuapp.com/addpost', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            posts: posts,
                            posttags: posttags
                        })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message == 'Post Success') {
                            setLoading2(false)
                            navigation.navigate('UserProfile')
                        }
                        else {
                            alert('Something went wrong')
                            setLoading2(false)
                        }
                    })
            })
    }
    else {
        alert('Please take a picture')
    }
}


  return (
    <View style={[styles.container, styles.buttoncenter]}>
        <TouchableOpacity onPress={() => navigation.navigate('landing')} style={styles.goback}>
        <Ionicons name="arrow-back-circle-outline" size={24} color="white" style={icon1} />
        </TouchableOpacity>
        {
            loading1 ? <ActivityIndicator
            size="large"
            color="white"
            /> :
            <>
            {
            posts ?
            <TouchableOpacity
                onPress={() => openCamera()}
            >
                <Image source={{ uri: posts}} style={{
                    width: 300, height: 550,
                    borderRadius: 30,
                    marginVertical: 10,
                }}/>
            </TouchableOpacity>
             :
             <MaterialCommunityIcons name="camera-front-variant" size={150} color="white"
             style={styles.addpost}
             onPress={() => openCamera()} />
            }
            </>
        }

        {/* */}
        <Text style={formHead2}>Tag your flick</Text>
        <TextInput placeholder='enter tag'
        style={formInput}
        onChangeText={(text) => setPosttags(text)}
        />

        {
            loading2 ? <ActivityIndicator
            size="large"
            color="white"
            /> :
                <Text style={button1}
                onPress={() => handlePost()}
            >
                Submit
                </Text>
        }
    </View>
  )
  }


export default AddPosts

const styles = StyleSheet.create({
    buttoncenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.fullbg,
        paddingVertical: 50,
    },
    addpost: {
        width: '80%',
        textAlign: 'center',
        marginVertical: 20,
    },
    goback: {
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        left: 20,
        alignItems: 'center'
    },
    
})