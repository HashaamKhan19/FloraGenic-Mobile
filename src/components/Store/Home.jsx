import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import UserProfileInfo from './UserProfileInfo';
import SearchInput from './SearchInput';
import Colors from '../../utils/Colors';
import ProductListings from '../Product/ProductListings';

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <UserProfileInfo
        userImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        userName="John Doe"
        userEmail="johndoe@example.com"
      />
      <SearchInput />
      <View style={styles.container}>
        <Text style={styles.mainText}>Special Offers</Text>
        <Text style={styles.secondaryText}>See All</Text>
      </View>
      <View>
        <ProductListings />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondaryGreen,
  },
});

export default Home;
