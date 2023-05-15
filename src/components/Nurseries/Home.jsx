import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SearchInput from '../Store/SearchInput';
import NurseryListings from './NurseryListings';
import Colors from '../../utils/Colors';

const Home = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <SearchInput />

        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              margin: 20,
              color: Colors.black,
            }}>
            Nurseries
          </Text>
          <NurseryListings />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
