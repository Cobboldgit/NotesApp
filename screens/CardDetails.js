import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {apiPath} from '../App';

const CardDetails = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [priority, setPriority] = useState('2');
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleAcrchiveOnPress = () => {
    const date = new Date();

    const dataToUpdate = {
      updatedAt: date.toISOString(),
      archived: data.archived == true ? false : true,
    };

    axios({
      method: 'patch',
      responseType: 'json',
      url: `${apiPath}/records/${data.id}`,
      data: dataToUpdate,
    }).then(() => {
      setShowMenu(false);
    });
  };

  const handleDeleteOnPress = () => {
    const date = new Date();

    axios({
      method: 'delete',
      responseType: 'json',
      url: `${apiPath}/records/${data.id}`,
    }).then(() => {
      setShowMenu(false);
      navigation.goBack();
    });
  };

  const handleShowModal = () => {
    setShowMenu(!showMenu);
    setModalVisible(!modalVisible);
  };

  const handleSetPriority = () => {
    const date = new Date();

    const dataToUpdate = {
      updatedAt: date.toISOString(),
      priority: parseInt(priority),
    };

    axios({
      method: 'patch',
      responseType: 'json',
      url: `${apiPath}/records/${data.id}`,
      data: dataToUpdate,
    }).then(() => {
      setShowMenu(false);
      setModalVisible(false);
    });
  };

  const modal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `rgba(0,0,0,0.2)`,
          }}>
          <View
            style={{
              width: 300,
              height: 170,
              backgroundColor: '#fff',
              elevation: 20,
              borderRadius: 10,
              padding: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontSize: 18,
                fontWeight: '700',
              }}>
              Set note priority
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={priority}
                onChangeText={e => setPriority(e)}
                style={{
                  color: '#000',
                  fontSize: 20,
                  height: 50,
                }}
                placeholderTextColor={'gray'}
                placeholder="Default is 2"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => handleSetPriority()}
                  style={{
                    backgroundColor: '#d86f1c',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    flex: 1,
                    marginRight: 3,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}>
                    Set
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPriority(2);
                    setModalVisible(!modalVisible);
                  }}
                  style={{
                    backgroundColor: '#d86f1c',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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
        {modal()}
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
                height: 200,
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
                  {data.archived == true ? 'Unarchive' : 'Archive'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShowModal()}
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
                  Set priority
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
