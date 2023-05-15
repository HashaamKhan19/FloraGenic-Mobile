import React from 'react';
import {View} from 'react-native';
import Home from '../components/Profile/Home';

const UserProfile = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Home />
    </View>
  );
};

export default UserProfile;
