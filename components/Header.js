import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Header = ({
  title,
  files,
  fileOnPress,
  addOnPress,
  add,
  archive,
  archiveOnPress,
  editOnPress,
  menuOnPress
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {archive && (
          <TouchableOpacity
            onPress={archiveOnPress}
            style={styles.fileIconContainer}>
            <Image
              source={require('../assets/icons/icons8-open-archive-50.png')}
              style={styles.fileIcon}
            />
          </TouchableOpacity>
        )}
        {add && (
          <TouchableOpacity
            onPress={addOnPress}
            style={styles.fileIconContainer}>
            <Image
              source={require('../assets/icons/icons8-add-50.png')}
              style={styles.fileIcon}
            />
          </TouchableOpacity>
        )}

        {files && (
          <TouchableOpacity
            onPress={editOnPress}
            style={styles.fileIconContainer}>
            <Image
              source={require('../assets/icons/icons8-edit-64.png')}
              style={styles.fileIcon}
            />
          </TouchableOpacity>
        )}
        {files && (
          <TouchableOpacity
            onPress={fileOnPress}
            style={styles.fileIconContainer}>
            <Image
              source={require('../assets/icons/icons8-file-50.png')}
              style={styles.fileIcon}
            />
          </TouchableOpacity>
        )}
        {files && (
          <TouchableOpacity
            onPress={menuOnPress}
            style={styles.fileIconContainer}>
            <Image
              source={require('../assets/icons/icons8-menu-vertical-50.png')}
              style={styles.fileIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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

  fileIconContainer: {},

  fileIcon: {
    height: 25,
    width: 25,
    tintColor: '#fff',
    marginLeft: 10,
  },
});
