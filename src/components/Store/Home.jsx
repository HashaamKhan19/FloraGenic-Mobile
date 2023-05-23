import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import React from 'react';

import SearchInput from './SearchInput';
import Colors from '../../utils/Colors';
import ProductListings from '../Product/ProductListings';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        {/* <SearchInput /> */}
        <View style={styles.container}>
          <Text style={styles.mainText}>Special Offers</Text>
          <Text
            style={styles.secondaryText}
            onPress={() => navigation.navigate('AllProducts')}>
            See All
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}>
          <ProductListings navigation={navigation} />
        </View>

        <View style={styles.container}>
          <Text style={styles.mainText}>Most Popular</Text>
          <Text
            style={styles.secondaryText}
            onPress={() => navigation.navigate('AllProducts')}>
            See All
          </Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}>
          <ProductListings navigation={navigation} />
        </View>
      </View>
    </ScrollView>
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
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
  },
  secondaryText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    color: Colors.secondaryGreen,
  },
});

export default Home;
