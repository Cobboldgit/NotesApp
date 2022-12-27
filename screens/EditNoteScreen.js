import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';

const EditNoteScreen = () => {
  const data = useRoute().params

  console.log(data);

  const [title, setTitle] = useState(data.name);
  const [description, setDescription] = useState(data.description);


  const handleOnSave = () => {};
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
  },
});
