import { StyleSheet, Text, View, Image, StatusBar, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Bottomnavbar from '../Bottomnavbar'
import Userinfocard from '../../cards/Userinfocard'
import { formHead2 } from '../../common/formcss'
import { COLORS } from '../../constants/theme'


const Searchpage = ({ navigation}) => {

  const[keyword, setKeyword] = useState('')
  const[loading, setLoading] = useState(false)
  const[data, setData] = useState([])
  const[error, setError] =useState(null)

  const getusers = async () => {
    if(keyword.length>0){
      setLoading(true)
      fetch('https://fitio-app-de100ac379ec.herokuapp.com/searchuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({keyword: keyword})
      })
      .then(res=>res.json())
      .then(data => {
        //console.log(data)
        if(data.error) {
          setData([])
          setError(data.error)
          setLoading(false)
        }
        else if (data.message == 'User Found') {
          setError(null)
          setData(data.user)
          setLoading(false)
        }
      })
      .catch(err => {
        setData([])
        setLoading(false)
      })
    }
    else {
      setData([])
      setError(null)

    }
  }

  useEffect(() => {
    getusers()
  }, [keyword])


  return (
    <View style={styles.container}>
      <StatusBar />
      <Bottomnavbar navigation={navigation}/>

      <TextInput placeholder='Find Friends..' style={styles.search}
      onChangeText={(text) => {
        setKeyword(text)
      }} />

      {
        loading ?
        <ActivityIndicator size='large' color='white' />
        :
        <>
        {
          error ? 
          <Text style={formHead2}>{error}</Text>
          
          :

          <ScrollView style={styles.ulists}>
          {
            data.map((item, index) => {
              return <Userinfocard key={item.username} user={item}
                navigation={navigation}
              />
              

            })
          }

        </ScrollView>
        }
        
        </>
        
      }
    </View>

  )
}

export default Searchpage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.fullbg,
        paddingVertical: 50,
    },
    search: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 18,
        alignSelf: 'center'
    },
    userlists: {
      width: '100%',
      marginTop: 20,
     }
})