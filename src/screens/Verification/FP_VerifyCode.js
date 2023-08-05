import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1 } from '../../common/button';
import mainlogo from '../../../assets/mainlogo.png'

const FP_VerifyCode = ({navigation, route}) => {
    const { useremail, userVerificationCode } = route.params;
    const[errormsg, setErrormsg] = useState(null);
    console.log(useremail, userVerificationCode)

    const [verificationCode, setVerificationCode] = React.useState('');

    const handleVerificationCode = () => {

        if (verificationCode != userVerificationCode) {
            setErrormsg('Invalid Code')
        }
        else {
            alert('Verification Code Matched')
            navigation.navigate('fp_pw', { email: useremail })
        }

        // navigation.navigate('ForgotPassword_ChoosePassword')
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
      >A Verfication Code has been sent to your email</Text>
      <TextInput style={styles.input}
      placeholder="Enter your 6-Digit Code"
      placeholderTextColor = "white"
      onPressIn={() => setErrormsg(null)}
      onChangeText={(text) => setVerificationCode(text)}
      />
    </View>
    <Text style={button1}
    onPress={() => handleVerificationCode()}
    >Send</Text>
    </View>
  </View>
  )
}

export default FP_VerifyCode

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