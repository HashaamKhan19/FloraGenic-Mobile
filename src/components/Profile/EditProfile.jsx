import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import {notification} from '../Popups/Alert';
import {ActivityIndicator} from 'react-native-paper';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useMutation,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';
import {AuthContext} from '../../context/authContext';

const UPDATE_USER = gql`
  mutation UpdateProfile($details: updateProfileInput!) {
    updateProfile(details: $details) {
      firstName
      lastName
      phoneNumber
      gender
      image
    }
  }
`;

const httpLink = new HttpLink({
  uri: 'https://floragenic.herokuapp.com/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await DeviceStorage.loadItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState();
  const [btnLoading, setBtnLoading] = useState(false);

  const {user, setUser} = React.useContext(AuthContext);

  React.useEffect(() => {
    setFirstName(user?.details?.firstName);
    setLastName(user?.details?.lastName);
    setPhoneNumber(user?.details?.phoneNumber);
    setEmail(user?.email);
    setImage(user?.details?.image);
  }, []);

  const validatePhoneNumber = () => {
    const reg = /^\+92 31[3-7] \d{7}$/;
    if (reg.test(phoneNumber) === false) {
      notification(
        'error',
        'Invalid Phone Number',
        'Valid format is +92 31X XXXXXXX',
      );
      return false;
    } else {
      return true;
    }
  };

  const validateFirstName = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(firstName) === false) {
      notification(
        'error',
        'Invalid First Name',
        'It should only contain alphabets',
      );
      return false;
    } else {
      return true;
    }
  };

  const validateLastName = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(lastName) === false) {
      notification(
        'error',
        'Invalid Last Name',
        'It should only contain alphabets',
      );
      return false;
    } else {
      return true;
    }
  };

  const [update, {data, loading, error}] = useMutation(UPDATE_USER, {
    client,
    onCompleted: async data => {
      setBtnLoading(false);

      setUser(prevUser => ({
        ...prevUser,
        details: {
          ...prevUser.details,
          ...data.updateProfile,
        },
      }));

      notification(
        'success',
        'User Updated',
        'User has been updated successfully!',
      );

      console.log(
        'user after update profile, checking context data aswell->',
        user,
      );

      navigation.navigate('Profile');
    },
    onError: error => {
      setBtnLoading(false);
      console.log(error);
      notification(
        'error',
        'Updation Failed',
        'User updation failed, please try again!',
      );
    },
  });

  const onSubmit = data => {
    if (!validateFirstName() || !validateLastName() || !validatePhoneNumber()) {
      setBtnLoading(false);
      return;
    }

    update({
      variables: {
        details: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          gender: 'Male',
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image || 'https://picsum.photos/200/300',
        }}
        style={styles.image}
      />

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
        editable={false}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />

      <View style={styles.btnCntr}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setBtnLoading(true);
            onSubmit({firstName, lastName, email, phoneNumber, image});
          }}>
          <Text style={styles.btnTxt}>
            {btnLoading ? (
              <ActivityIndicator animating={true} color={Colors.white} />
            ) : (
              'Update Profile'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingTop: '20%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 55,
    backgroundColor: Colors.lightGray,
    color: Colors.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    fontFamily: 'Urbanist-Regular',
  },
  cbdiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
    marginVertical: 14,
  },
  btnCntr: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: {
    height: 51,
    width: '100%',
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: Colors.white,
    fontFamily: 'Urbanist-Bold',
    fontSize: 16,
  },
});

export default EditProfile;
