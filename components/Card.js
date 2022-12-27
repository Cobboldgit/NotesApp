import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {convertStringToDate} from '../App';

const Card = ({item, index, archived}) => {
  const navigation = useNavigation();

  const handleItemPressed = data => {
    navigation.navigate('Details', data);
  };

  const getPriorityTextColor = priority => {
    if (priority >= 5) {
      return '#ff471a';
    } else {
      return '#000';
    }
  };

  if (archived === false) {
    if (item?.archived == false || !item['archived']) {
      return (
        <TouchableOpacity
          onPress={() => handleItemPressed(item)}
          style={[styles.container]}>
          <View style={styles.leftContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.headerText,
                {color: getPriorityTextColor(item?.priority) || '#000'},
              ]}>
              {item?.name}
            </Text>
            <Text numberOfLines={1} style={styles.description}>
              {item?.description || 'No description'}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.date}>
              {convertStringToDate(item?.updatedAt) ||
                convertStringToDate(item?.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  } else {
    if (item?.archived == true) {
      return (
        <TouchableOpacity
          onPress={() => handleItemPressed(item)}
          style={[styles.container]}>
          <View style={styles.leftContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.headerText,
                {color: getPriorityTextColor(item?.priority) || '#000'},
              ]}>
              {item?.name}
            </Text>
            <Text numberOfLines={1} style={styles.description}>
              {item?.description || 'No description'}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.date}>
              {convertStringToDate(item?.updatedAt) ||
                convertStringToDate(item?.createdAt)}
            </Text>
            <Image
              source={require('../assets/icons/icons8-open-archive-50.png')}
              style={{
                height: 20,
                width: 20,
                marginTop: 10
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }
  }
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    padding: 20,
    borderColor: '#e6e6e6',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },

  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },

  description: {
    color: '#d9d9d9',
    marginTop: 10,
    fontSize: 16,
  },

  date: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '700',
  },

  leftContainer: {
    flex: 8,
  },
  rightContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
