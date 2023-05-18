import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

const GardenerDetails = () => {
  const gardener = {
    image: require('../../assets/images/Nurseries/1.jpg'),
  };

  return (
    <View style={styles.container}>
      <Image source={gardener.image} style={styles.image} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.btnsTxt}>Contact Gardener</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.btnsTxt}>Hire Gardener</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsCont}>
        <Text style={styles.details}>HASHAAM</Text>
        <Text style={styles.details}>PRICING</Text>
        <Text style={styles.details}>LOCATION</Text>
        <Text style={styles.details}>HASHAAM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 10,
  },
  btns: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 8,
  },
  btnsTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
  },
  details: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
  },
  detailsCont: {
    flex: 1,
    marginTop: 10,
  },
});

export default GardenerDetails;
