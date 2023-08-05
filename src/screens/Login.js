import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { head1, link } from '../common/formcss';

import { COLORS, FONT } from '../constants/theme';
import { button1 } from '../common/button';
import mainlogo from '../../assets/mainlogo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation}) => {
  const [fdata, setfdata] = useState({
    username: '',
    password: ''
  })

  const[errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.username == '' || fdata.password == '') {
      setErrormsg('All fields are required');
      return;
    }
    else {
      fetch('https://fitio-app-de100ac379ec.herokuapp.com/signin',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(fdata)
      })
        .then(res => res.json())
        .then(async data => {
            // console.log(data);
            if (data.error) {
              setErrormsg(data.error);
            }
            else {
              console.log("Success")
              await AsyncStorage.setItem('user', JSON.stringify(data))
              navigation.navigate('landing');
            }
          
          })
          .catch(err => {
            alert(err)
          })
    }
  }

  return (
    <View style={[styles.container, styles.bg]}>
    <View style={styles.s1}>
      {
        errormsg ? <Text style={styles.errormessage}>{errormsg}
        </Text> : null
      }
      <View style={styles.formgroup}>
        <TouchableOpacity onPress={() => navigation.navigate('welcome')}>
            <Image style={styles.head1} source={mainlogo}/>
        </TouchableOpacity>
        <Text style={styles.label}
        >Username</Text>
        <TextInput style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setfdata({...fdata, username: text })}
        />
      </View>
      <View style={styles.formgroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}
        placeholder="Enter your Password"
        placeholderTextColor = "white"
        secureTextEntry={true}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setfdata({...fdata, password: text })}
        />
      </View>
      <View style={styles.fp}>
        <Text style={link}
        onPress={() => navigation.navigate('fp_email')}
        >Forgot Password?</Text>
      </View>
      <TouchableOpacity onPress={() => Sendtobackend()}>
      <Text style={button1}
      >Login</Text>
      </TouchableOpacity>
        <Text style={link}
        onPress={() => navigation.navigate('signup')}>
          Don't Have an account?
        </Text>
    </View>
    </View>
  )
}

export default Login

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
head1: {
  alignSelf: 'center',
  justifyContent: 'center',
  height: 50,
  resizeMode: 'contain',
  marginBottom: 30
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
input: {
  color: 'white',
  padding: 10,
  borderRadius: 20,
  textDecorationColor: 'white',
  borderBottomColor: "white",
  borderBottomWidth: 2,

},
fp: {
  display: 'flex',
  justifyContent: 'flex-end',
  marginHorizontal: 10,
  marginVertical: 10,
  left: 90,
  opacity: .5,
},
errormessage: {
  color: 'red',
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 5,
  borderRadius: 10,
}

})