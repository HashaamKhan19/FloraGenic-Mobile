import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
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
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="🔎︎ Search..."
            placeholderTextColor="darkgrey"
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
});

export default Home;
