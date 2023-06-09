import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import Colors from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/authContext';
import {notification} from '../Popups/Alert';

const GardenerDetails = ({
  route: {
    params: {gardener},
  },
}) => {
  const contactGardener = phoneNumber => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(err =>
      console.error('Failed to open Phone app:', err),
    );
  };

  const {user} = useContext(AuthContext);

  const navigation = useNavigation();

  const handleUserAuth = () => {
    if (user) {
      if (user.userType === 'gardener') {
        notification(
          'error',
          'Not Authorized',
          'You can not hire gardener, login as a customer to hire.',
        );
      } else {
        navigation.navigate('GardenerHire', {gardener});
      }
    } else {
      notification('error', 'Not Authorized', 'Login as a customer to hire.');
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainCont}>
      <View style={styles.container}>
        <Image source={{uri: gardener.image}} style={styles.image} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => {
              contactGardener(gardener?.phoneNumber);
            }}>
            <Text style={styles.btnsTxt}>Contact Gardener</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns} onPress={handleUserAuth}>
            <Text style={styles.btnsTxt}>Hire Gardener</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsCont}>
          <Text style={styles.details}>
            <Text style={styles.desc}>Name: </Text>
            {gardener?.firstName} {gardener?.lastName}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.desc}>City: </Text>
            {gardener?.city}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.desc}>Price: </Text>
            Rs. {gardener?.price} / {gardener?.duration}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.desc}>Experience: </Text>
            {gardener?.experience} years
          </Text>
          <Text style={styles.details}>
            <Text style={styles.desc}>Rating: </Text>
            {gardener?.rating}
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.skillHead}>Skills</Text>
        </View>
        <View style={[styles.skillsCont, {flexDirection: 'row'}]}>
          {gardener?.skills?.map(skill => (
            <View key={skill?.id} style={styles.skillBadge}>
              <Text style={styles.skill}>{skill?.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    padding: 10,
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
    fontSize: 22,
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
    marginBottom: 10,
  },
  detailsCont: {
    // flex: 1,
    marginTop: 10,
    paddingLeft: 4,
  },
  desc: {
    fontFamily: 'Urbanist-Bold',
  },
  skillsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 4,
  },
  skillBadge: {
    backgroundColor: Colors.floraGreen,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  skill: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
  },
  skillHead: {
    fontSize: 22,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
    paddingLeft: 4,
  },
});

export default GardenerDetails;
