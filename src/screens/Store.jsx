import React from 'react';
import {View} from 'react-native';
import Home from '../components/Store/Home';

const Store = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Home navigation={navigation} />
    </View>
  );
};

export default Store;
