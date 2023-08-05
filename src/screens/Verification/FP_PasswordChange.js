import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1 } from '../../common/button';
import mainlogo from '../../../assets/mainlogo.png'

const FP_PasswordChange = ({ navigation, route}) => {
    const { email } = route.params;
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState(false)
    const[errormsg, setErrormsg] = useState(null);

    const handlePasswordChange = () => {
        if (password == '' || confirmpassword == '') {
            setErrormsg('Please enter password')
        } else if (password != confirmpassword) {
            setErrormsg('Password does not match')
        }

        else {
            setLoading(true);
            fetch('https://fitio-app-de100ac379ec.herokuapp.com/resetpassword', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "Password Changed Successfully") {
                            setLoading(false)
                            alert(data.message);
                            navigation.navigate('fp_complete')
                        }
                        else {
                            setLoading(false)
                            alert("Something went wrong");
                        }
                    })
                .catch(err => {
                    setLoading(false);
                    alert(err)
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
        >Reset Your Password</Text>
        <TextInput style={styles.input}
        placeholder="Enter Your Password"
        placeholderTextColor = "white"
        secureTextEntry={true}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setpassword(text)}
        />
        <TextInput style={styles.input}
        placeholder="Confirm Your Password"
        placeholderTextColor = "white"
        secureTextEntry={true}
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setconfirmpassword(text)}
        />
      </View>
      {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={button1}
                        onPress={() => handlePasswordChange()}
                    >
                        Next
                    </Text>
            }
      </View>
    </View>
  )
}

export default FP_PasswordChange

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