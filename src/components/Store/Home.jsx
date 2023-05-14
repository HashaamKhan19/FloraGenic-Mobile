import {View, Text} from 'react-native';
import React from 'react';

import Leaf from '../../assets/svg/leaf.svg';

const Home = () => {
  return (
    <View>
      <Text
        style={{
          color: 'red',
        }}>
        HomePage of store
      </Text>
      <Leaf width={120} height={40} />
    </View>
  );
};

export default Home;
