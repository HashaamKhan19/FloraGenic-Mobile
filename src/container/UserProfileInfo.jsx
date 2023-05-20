import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import CartIcon from '../assets/svg/cartIcon.svg';
import HeartIcon from '../assets/svg/heartIcon.svg';
import dimensions from '../utils/Dimensions';
import {gql, useQuery} from '@apollo/client';
import {AuthContext} from '../context/authContext';

const GET_USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      userType
      details {
        ... on Customer {
          firstName
          lastName
          image
          nationality
          gender
          addresses {
            city
            location
            name
          }
          payments {
            cardCVV
            cardExpiryDate
            cardHolderName
            cardNumber
          }
          userDetails {
            email
          }
          phoneNumber
        }
        ... on Gardener {
          CNIC
          city
          firstName
          gender
          image
          id
          lastName
          phoneNumber
        }
      }
    }
  }
`;

const UserProfileInfo = () => {
  const {user, setUser} = React.useContext(AuthContext);

  const {loading, error, data} = useQuery(GET_USER, {
    variables: {userId: user?.id},
  });

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri:
              data?.user?.details?.image ||
              'https://www.w3schools.com/howto/img_avatar.png',
          }}
          style={styles.userImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {data?.user?.details?.firstName || 'username'}{' '}
            {data?.user?.details?.lastName}
          </Text>
          <Text style={styles.userEmail}>
            {data?.user?.details?.userDetails?.email || 'email address'}
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
    color: 'black',
    fontFamily: 'Urbanist-Bold',
  },
  userEmail: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Urbanist-Regular',
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
