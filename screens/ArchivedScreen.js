import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import CardList from '../components/CardList';

const ArchivedScreen = () => {
  const data = useRoute().params
  console.log(data);
  return (
    <View style={[styles.container]}>
      <Header title={'Archived notes'} />
      <View style={styles.listContainer}>
        <CardList data={data} archived={true}/>
      </View>
    </View>
  );
};

export default ArchivedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
