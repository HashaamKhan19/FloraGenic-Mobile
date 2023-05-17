import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SearchInput from '../Store/SearchInput';
import Colors from '../../utils/Colors';
import GardenerListings from './GardenerListings';

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                margin: 20,
                color: Colors.black,
              }}>
              Gardeners
            </Text>
          </View>
          <GardenerListings navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
