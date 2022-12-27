import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {apiPath, genUUID} from '../App';

const CreateNote = () => {
  const [title, setTitle] = useState('Title here');
  const [description, setDescription] = useState('Description here');

  const postNote = data => {
    axios({
      method: 'post',
      responseType: 'json',
      url: `${apiPath}/records`,
      data: data,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleOnSave = () => {
    const date = new Date();
    let data = {
      id: Math.floor(Math.random() * 100),
      key: genUUID(24),
      name: title,
      description: description,
      priority: 2,
      archived: false,
      updatedAt: date,
      createdAt: date,
    };

    postNote(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={[styles.headerTitle]}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <TouchableOpacity onPress={() => handleOnSave()}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#fff',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* // value={description} */}
      <View style={[{flex: 1}]}>
        <TextInput
          onChangeText={e => setDescription(e)}
          multiline={true}
          style={[
            {
              backgroundColor: 'transparent',
              width: '100%',
              paddingHorizontal: 16,
              fontSize: 18,
            },
          ]}>
          <Text
            style={{
              lineHeight: 40,
              color: '#000',
            }}>
            {description}
          </Text>
        </TextInput>
      </View>
    </View>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d86f1c',
    height: 70,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    paddingHorizontal: 16,
  },

  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
  },
});
