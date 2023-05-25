import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import {useState, useEffect} from 'react';

import app from '../../../firebase';

const Home = ({temperature}) => {
  const [data, setData] = useState([]);

  app
    .database()
    .ref('/UsersData')
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val());
      const data = snapshot.val();
      setData(data);
    });

  return (
    <View style={styles.container}>
      <Text style={styles.temperatureText}>
        {temperature !== null ? `${temperature}°C` : 'Loading temperature...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  temperatureText: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
  },
});

export default Home;
