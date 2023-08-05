import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { formgroup, input, label, link } from '../common/formcss'
import mainlogo from '../../assets/mainlogo.png'

import { button1 } from '../common/button';


const Signup = ({ navigation }) => {

  const [fdata, setfdata] = useState({
    email: '',
    username: '',
    password: '',
    cpassword: '',
  })

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    console.log(fdata);
    if(fdata.email == '' || fdata.username == '' || 
    fdata.password == '' || fdata.cpassword == ''){
      setErrormsg('Missing fields');
      return;
    }
    else{
      if (fdata.password != fdata.cpassword) {
        setErrormsg('Passwords do not match!');
        return;
      }
      else {
        fetch('https://fitio-app-de100ac379ec.herokuapp.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        })
          .then(res => res.json()).then(
            data => {
              console.log(data);
              if (data.error) {
                setErrormsg(data.error);
              }
              else {
                alert('Account Created Successfully');
                navigation.navigate('login');
              }
            }
          )

      }
    }
  }
  return (
    <View style={[styles.container, styles.bg]}>
    <View style={styles.s1}>
    <TouchableOpacity onPress={() => navigation.navigate('welcome')}>
            <Image style={styles.head1} source={mainlogo}/>
        </TouchableOpacity>
      {
        errormsg ? <Text style={styles.errormessage}>{errormsg}
        </Text> : null
      }
      <View style={styles.formgroup}>
        <Text style={styles.label}
        >Email</Text>
        <TextInput style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setfdata({...fdata, email: text })}
        
        />
      </View>
      <View style={styles.formgroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input}
        placeholder="Enter your Username"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setfdata({ ...fdata, username: text })}
        />
      </View>
      <View style={styles.formgroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}
        placeholder="Enter your Password"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        secureTextEntry={true}
        onChangeText={(text) => setfdata({ ...fdata, password: text })}
        />
      </View>
      <View style={styles.formgroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput style={styles.input}
        placeholder="Confirm your Password"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        secureTextEntry={true}
        onChangeText={(text) => setfdata({ ...fdata, cpassword: text })}

        />
      </View>
      <TouchableOpacity
      onPress={() => {
        Sendtobackend();
      }}>


      <Text style={button1}>
        Register
      </Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Signup

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
head: {
  textAlign: 'center',
  top: -50,
  fontFamily: "Mono",
  fontSize: 30,
  fontWeight: 'bold',
  color: '#fff',
},
head1: {
  alignSelf: 'center',
  justifyContent: 'center',
  height: 50,
  resizeMode: 'contain',
  marginBottom: 30
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