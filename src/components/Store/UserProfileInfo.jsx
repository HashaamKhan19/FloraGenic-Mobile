import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import CartIcon from '../../assets/svg/cartIcon.svg';
import HeartIcon from '../../assets/svg/heartIcon.svg';
import dimensions from '../../utils/Dimensions';

const UserProfileInfo = ({userImage, userName, userEmail}) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{uri: userImage}} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
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
