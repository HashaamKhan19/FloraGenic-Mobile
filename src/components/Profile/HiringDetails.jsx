import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

const HiringDetails = ({
  route: {
    params: {gardenerOrder},
  },
}) => {
  const contactNursery = phoneNumber => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(err =>
      console.error('Failed to open Phone app:', err),
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: gardenerOrder.gardener.image}}
        style={styles.image}
      />
      <Text style={styles.txt}>
        {gardenerOrder.gardener.firstName} {gardenerOrder.gardener.lastName}
        {'\n'}
        From {gardenerOrder.gardener.city}
        {'\n'}
        {gardenerOrder.gardener.experience} years of experience
        {'\n'}
      </Text>

      <Text style={styles.scndTxt}>
        Services to be provided: {gardenerOrder.service}
        {'\n'}
        Hired on {new Date(parseInt(gardenerOrder.date)).toLocaleDateString()}
        {'\n'}
        For {gardenerOrder.requestedTime} {gardenerOrder.duration}
        {'\n'}
        Amount to be paid: Rs. {gardenerOrder.totalPrice}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          contactNursery(gardenerOrder.gardener.phoneNumber);
        }}>
        <Text style={styles.buttonText}>Contact Gardener</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
    textAlign: 'center',
  },
  scndTxt: {
    fontSize: 18,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.black,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.secondaryGreen,
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
  },
});

export default HiringDetails;
