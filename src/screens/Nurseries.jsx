import React from 'react';
import {View} from 'react-native';
import Home from '../components/Nurseries/Home';
import UserProfileInfo from '../container/UserProfileInfo';

const Nurseries = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <UserProfileInfo />
      <Home navigation={navigation} />
    </View>
  );
};

export default Nurseries;
