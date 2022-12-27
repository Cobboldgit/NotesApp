import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const CardDetails = () => {
  const [showMenu, setShowMenu] = useState(false);
  const data = useRoute().params;
  const navigation = useNavigation();

  const handleFileIconPressed = () => {
    navigation.navigate('Files', data.id);
  };

  const handleEditOnPress = () => {
    navigation.navigate('EditNote', data);
  };

  const handleMenuOnPress = () => {
    setShowMenu(!showMenu);
  };

  const handleInfoOnPress = () => {
    navigation.navigate('Info', data);
  };

  const handleAcrchiveOnPress = () => {};

  const handleDeleteOnPress = () => {};

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (showMenu === true) {
          handleMenuOnPress();
        }
      }}
      style={[styles.container]}>
      <View
        style={{
          flex: 1,
        }}>
        <Header
          fileOnPress={() => handleFileIconPressed()}
          files={true}
          title={data?.name || 'Details'}
          editOnPress={() => handleEditOnPress()}
          menuOnPress={() => handleMenuOnPress()}
        />

        {/* meanu  */}

        {showMenu && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.1)',
              height: '100%',
              width: '100%',
              zIndex: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                height: 100,
                width: 150,
                backgroundColor: 'white',
                right: 30,
                top: 30,
                paddingHorizontal: 10,
                borderRadius: 5,
                elevation: 20,
                zIndex: 11,
              }}>
              <TouchableOpacity
                onPress={() => handleDeleteOnPress()}
                style={{
                  borderBottomColor: '#e6e6e6',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAcrchiveOnPress()}
                style={{
                  borderBottomColor: '#e6e6e6',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                  }}>
                  Archive
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInfoOnPress()}
                style={{
                  borderBottomColor: '#e6e6e6',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                  }}>
                  Info
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* menu end  */}

        {/* description */}

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 10,
          }}>
          <ScrollView>
            <Text style={styles.description}>{data?.description}</Text>
          </ScrollView>
        </View>

        {/* description end */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    paddingBottom: 20,
  },

  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
  },

  description: {
    fontSize: 18,
    color: '#000',
    lineHeight: 40,
  },
});
