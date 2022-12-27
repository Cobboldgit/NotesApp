import {FlatList} from 'react-native';
import React from 'react';
import FileCard from './FileCard';

const FilesList = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.key}-${index}`}
      renderItem={({item}) => <FileCard item={item} />}
    />
  );
};

export default FilesList;
