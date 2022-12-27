import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import { apiPath } from '../App';

const EditNoteScreen = () => {
  const data = useRoute().params;
  const navigation = useNavigation()

  const [title, setTitle] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  const postNote = dataToPost => {
    axios({
      method: 'patch',
      responseType: 'json',
      url: `${apiPath}/records/${data.id}`,
      data: dataToPost,
    })
      .then(response => {
        console.log(response);
        alert('Note saved')
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong')
      });
  };

  const handleOnSave = () => {
    const date = new Date();
    let finaldata = {
      name: title,
      description: description,
      updatedAt: date.toISOString(),
    };

    postNote(finaldata);
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginRight: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                tintColor: 'white',
                width: 40,
                height: 20,
              }}
              source={require('../assets/icons/go_back.png')}
            />
          </TouchableOpacity>
          <TextInput
            style={[styles.headerTitle]}
            value={title}
            onChangeText={e => setTitle(e)}
          />
        </View>
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

export default EditNoteScreen;

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
    width: 250
  },
});
