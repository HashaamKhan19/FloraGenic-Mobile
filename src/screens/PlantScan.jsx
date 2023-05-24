import React from 'react';
import {View} from 'react-native';
import Home from '../components/AI Scan/Home';

const PlantScan = ({route, navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Home route={route} navigation={navigation} />
    </View>
  );
};

export default PlantScan;
