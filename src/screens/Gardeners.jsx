import React from 'react';
import {View} from 'react-native';
import Home from '../components/Gardeners/Home';

const Gardeners = ({navigation}) => {
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

export default Gardeners;
