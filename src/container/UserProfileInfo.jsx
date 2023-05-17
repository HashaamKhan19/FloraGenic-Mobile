import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import CartIcon from '../assets/svg/cartIcon.svg';
import HeartIcon from '../assets/svg/heartIcon.svg';
import dimensions from '../utils/Dimensions';

const UserProfileInfo = ({userImage, userName, userEmail}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri:
              userImage ||
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
          }}
          style={styles.userImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userName || 'Username'}</Text>
          <Text style={styles.userEmail}>
            {userEmail || 'UserEmail@gmail.com'}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <CartIcon
            fill="black"
            width={dimensions.Width / 17}
            height={dimensions.Height / 17}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <HeartIcon
            fill="black"
            width={dimensions.Width / 17}
            height={dimensions.Height / 17}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'white',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 12,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  icon: {
    marginLeft: 10,
  },
};

export default UserProfileInfo;
