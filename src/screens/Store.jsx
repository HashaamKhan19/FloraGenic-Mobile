import React from 'react';
import {View} from 'react-native';
import Home from '../components/Store/Home';
import UserProfileInfo from '../container/UserProfileInfo';

const Store = ({navigation}) => {
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

export default Store;
