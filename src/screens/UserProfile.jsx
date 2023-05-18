import React from 'react';
import {View} from 'react-native';
import Home from '../components/Profile/Home';

const UserProfile = ({navigation}) => {
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

export default UserProfile;
