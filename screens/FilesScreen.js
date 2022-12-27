import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import FilesList from '../components/FilesList';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiPath, genUUID} from '../App';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';

const FilesScreen = () => {
  const [files, setFiles] = useState([]);
  const [timeout, setTimeou] = useState(false);
  const [pickedFile, setPickedFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  setTimeout(() => {
    setTimeou(true);
  }, 10000);

  const id = useRoute().params;

  const fetchFiles = () => {
    axios
      .get(`${apiPath}/records/${id}/files`)
      .then(response => {
        setFiles(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFiles();
    });
    return unsubscribe;
  }, [navigation]);

  const handleAddFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      setPickedFile({singleFile: res});
      setModalVisible(!modalVisible);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleSubmitFile = () => {
    const date = new Date();

    const dataToSend = {
      key: genUUID(24),
      name: pickedFile.singleFile[0].name,
      size: pickedFile.singleFile[0].size,
      location: pickedFile.singleFile[0].uri,
      uploadedAt: date.toISOString(),
    };
    console.log(' =======>', dataToSend);
    axios({
      method: 'post',
      url: `${apiPath}/records/${id}/files/`,
      data: dataToSend,
    })
      .then(response => {
        alert("File posted")
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.message);
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
              justifyContent: "space-between"
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontSize: 18,
                fontWeight: '700',
              }}>
              Add file to note
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => handleSubmitFile()}
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
                    confirm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPickedFile(null);
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
    <View style={[styles.container]}>
      <Header add={true} addOnPress={() => handleAddFile()} title={'Files'} />
      {modal()}
      {files.length > 0 ? (
        <FilesList data={files} />
      ) : timeout ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '700',
            }}>
            something went wrong. No files found
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
};

export default FilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
