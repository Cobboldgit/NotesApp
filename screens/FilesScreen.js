import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import FilesList from '../components/FilesList';
import {useRoute} from '@react-navigation/native';
import {apiPath} from '../App';
import axios from 'axios';

const FilesScreen = () => {
  const [files, setFiles] = useState([]);

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
    fetchFiles();
  }, []);

  return (
    <View style={[styles.container]}>
      <Header title={'Files'} />
      {files.length > 0 ? (
        <FilesList data={files} />
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
