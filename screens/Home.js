import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardList from '../components/CardList';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import axios from 'axios';
import {apiPath} from '../App';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [timeout, setTimeou] = useState(false);
  const navigation = useNavigation();

  const fetchNotes = () => {
    axios
      .get(`${apiPath}/records`)
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const handleAddNote = () => {
    navigation.navigate('CreateNote');
  };

  const handleArchived = () => {
    navigation.navigate('Archived', notes);
  };

  setTimeout(() => {
    setTimeou(true);
  }, 10000);

  return (
    <View style={[styles.container]}>
      <Header
        back={true}
        addOnPress={() => handleAddNote()}
        archiveOnPress={() => handleArchived()}
        archive={true}
        add={true}
        title={'My Notes'}
      />
      <View style={styles.listContainer}>
        {notes.length > 0 ? (
          <CardList archived={false} data={notes} />
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
              {timeout ? "Something went wrong. No notes found" : "Loading..."}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

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

  listContainer: {
    flex: 1,
  },

  addButton: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 50,
  },
});

export default Home;
