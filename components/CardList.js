import {View, Text, FlatList} from 'react-native';
import React, {Fragment} from 'react';
import Card from './Card';

const CardList = ({data, archived}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => `${item.key}-${index}`}
      renderItem={({item, index}) => {
        return <Card archived={archived} item={item} index={index} />;
      }}
    />
  );
};

export default CardList;
