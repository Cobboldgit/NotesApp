import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Home from './screens/Home';
import CardDetails from './screens/CardDetails';
import CreateNote from './screens/CreateNote';
import FilesScreen from './screens/FilesScreen';
import ArchivedScreen from './screens/ArchivedScreen';
import InfoScreen from './screens/InfoScreen';
import EditNoteScreen from './screens/EditNoteScreen';

export const convertStringToDate = dateString => {
  const newDate = new Date(dateString).toDateString();
  console.log(newDate);
  const dateArray = newDate.split(' ');
  return `${dateArray[1]}  ${dateArray[2]}`;
};

export function genUUID(passwordLength) {
  var chars =
    '0123456789abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var password = '';
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}

export const apiPath = 'https://api.pwdevtest.com/';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#d86f1c'} />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={CardDetails} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="Files" component={FilesScreen} />
        <Stack.Screen name="Archived" component={ArchivedScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="EditNote" component={EditNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
