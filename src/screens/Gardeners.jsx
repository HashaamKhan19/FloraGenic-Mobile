import React from 'react';
import {View} from 'react-native';
import Home from '../components/Gardeners/Home';
import UserProfileInfo from '../container/UserProfileInfo';

const Gardeners = ({navigation}) => {
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

export default Gardeners;
