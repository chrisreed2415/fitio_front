import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../common/button';

const Verification = ({ navigation, route }) => {
    // const {userdata} = route.params;

    const[errormsg, setErrormsg] = useState(null);

    const [fdata, setfdata] = useState({
        email: '',
      })

    // console.log(`from verification page `,userdata[0]?.VerificationCode);

    const Sendtobackend = () => {
        if (fdata.email == '') {
            setErrormsg('Please enter an email');
            return;
          }
          else {
            fetch('https://fitio-app-de100ac379ec.herokuapp.com/verify',{
              method: 'POST',
              headers: {
                'Content-Type':'application/json'
              },
              body:JSON.stringify(fdata)
            })
              .then(res => res.json()).then(
                data => {
                    if (data.error === 'Invalid Credentials') {
                        setErrormsg('User Not Found')
                    }
                    else if (data.message === "Verfication Code sent to your Email") {
                        console.log(data.udata);
                        alert(data.message);
                    }
                  }
              )
          }
    }

  return (
    <View style={[styles.container, styles.bg]}>
      <View style={styles.s1}>
        <Text style={styles.head} onPress={() => navigation.navigate('welcome')}>
        Find 
        Athletics
      </Text>
      {
        errormsg ? <Text style={styles.errormessage}>{errormsg}
        </Text> : null
      }
      <View style={styles.formgroup}>
        <Text style={styles.label}
        >Enter your email for a verification code to be sent</Text>
        <TextInput style={styles.input}
        placeholder="Email?"
        placeholderTextColor = "white"
        onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setfdata({...fdata, email: text })}
        />
      </View>
      <Text style={button1}
      onPress={() => Sendtobackend()}
      >Send</Text>
      </View>
    </View>
  )
}

export default Verification

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
      head: {
        textAlign: 'center',
        top: -50,
        fontFamily: "QuartzoBold",
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
        fontFamily: "QuartzoBold",
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