import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1 } from '../../common/button'
import mainlogo from '../../../assets/mainlogo.png'

const FP_Email = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const[errormsg, setErrormsg] = useState(null);

    const handleForgotEmail = () => {
        if (email === '') {
            alert('Please enter a valid email')
        }

        else {
            setLoading(true) 
            fetch('https://fitio-app-de100ac379ec.herokuapp.com/verifyfp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(res => res.json()).then(data => {
                if (data.error === "Invalid Credentials") {
                    // alert('Invalid Credentials')
                    setErrormsg('User Not Found')
                    setLoading(false)
                }
                else if (data.message === "Verification Code Sent to your Email") {
                    setLoading(false)
                    alert(data.message);
                    console.log('Navigating to fp_verify with:', data.email, data.VerificationCode);
                    navigation.navigate('fp_verify', {
                        useremail: data.email,
                        userVerificationCode: data.VerificationCode
                    })
                }
            })
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
        >Enter your email for a verification code to be sent</Text>
        <TextInput style={styles.input}
        placeholder="Enter Your Email?"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setEmail(text)}
        />
      </View>
      {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={button1}
                        onPress={() => handleForgotEmail()}
                    >
                        Next
                    </Text>
            }
      </View>
    </View>
  )
}

export default FP_Email

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
      head: {
        textAlign: 'center',
        top: -50,
        fontFamily: "Mono",
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
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
      errormessage: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        borderRadius: 10,
      }
})