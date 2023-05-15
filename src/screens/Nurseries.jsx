import React from 'react';
import {View} from 'react-native';
import Home from '../components/Nurseries/Home';

const Nurseries = ({navigation}) => {
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

export default Nurseries;
