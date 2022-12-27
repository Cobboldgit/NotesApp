import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import { convertStringToDate } from '../App'

const InfoScreen = () => {
  const data = useRoute().params
  console.log(data);
  const CreatedDate = new Date(data.createdAt)
  const updateDate = new Date(data.updatedAt)
  // console.log(new Date(data.createdAt));

  return (
    <View>
       <Header
        title={'Info'}
      />
      <View>
        <Text style={styles.textColor}>
          created at: {`${CreatedDate}`}
        </Text>
        <Text style={styles.textColor}>
          last updated: {`${updateDate}`}
        </Text>
      </View>
    </View>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  textColor: {
    color: "black",
    fontSize: 18,
    marginHorizontal:16,
    marginTop: 20
  }
})