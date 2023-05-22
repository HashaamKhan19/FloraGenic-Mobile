import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import User from '../../assets/svg/user.svg';
import ChevronRight from '../../assets/svg/chevronRight.svg';
import Address from '../../assets/svg/address.svg';
import Payment from '../../assets/svg/payment.svg';
import Orders from '../../assets/svg/orders.svg';
import Logout from '../../assets/svg/logout.svg';
import Lock from '../../assets/svg/lock.svg';
import DeviceStorage from '../../utils/DeviceStorage';
import {notification} from '../Popups/Alert';
import {AuthContext} from '../../context/authContext';

const Home = ({navigation}) => {
  const values = [
    'Edit Profile',
    'Edit Password',
    'Address',
    'Payment',
    'Orders',
    'Logout',
  ];
  const icons = [
    <User />,
    <Lock />,
    <Address />,
    <Payment />,
    <Orders />,
    <Logout />,
  ];

  const {user, setUser} = React.useContext(AuthContext);

  console.log('user in homePage:->', user);

  const handlePress = index => {
    switch (index) {
      case 0:
        navigation.navigate('EditProfile');
        break;
      case 1:
        navigation.navigate('EditPassword');
        break;
      case 2:
        navigation.navigate('Address');
        break;
      case 3:
        navigation.navigate('Payments');
        break;
      case 4:
        navigation.navigate('Orders');
        break;
      case 5:
        DeviceStorage.deleteItem('token');
        DeviceStorage.deleteItem('userType');
        DeviceStorage.deleteItem('id');
        notification(
          'success',
          'Logged out',
          'You have been logged out from the system',
        );
        navigation.navigate('Store');

        setUser(() => {
          console.log('setting users2, please', user);
          return null;
        });
        console.log('logout hogya2', user);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.mainCntr}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: user?.details?.image || 'https://picsum.photos/200/300',
          }}
          style={styles.image}
        />
        <Text style={styles.username}>
          {user?.details?.firstName || 'First Name'}{' '}
          {user?.details?.lastName || 'Last Name'}
        </Text>
      </View>

      {values.map((value, index) => {
        return (
          <TouchableOpacity
            style={styles.buttonContainer}
            key={index}
            onPress={() => handlePress(index)}>
            <View style={styles.insideBtn}>
              {icons[index]}
              <Text
                style={[
                  styles.buttonText,
                  value === 'Logout' && {color: Colors.red},
                ]}>
                {value}
              </Text>
            </View>
            <ChevronRight />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainCntr: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  insideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  username: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 22,
    color: Colors.black,
    marginBottom: 24,
  },
  imgContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default Home;
