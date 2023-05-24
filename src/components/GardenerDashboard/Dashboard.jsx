import React, {useRef, useState} from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../utils/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {PakistanCities} from '../Filters/NurseryFilters/Cities';
import SkillsComponent from './SkillsComponent';
import {useNavigation} from '@react-navigation/native';
import {notification} from '../Popups/Alert';
import DeviceStorage from '../../utils/DeviceStorage';
import {AuthContext} from '../../context/authContext';
import storage from '@react-native-firebase/storage';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useMutation,
} from '@apollo/client';
import {ActivityIndicator} from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';

const UPDATE_GARDENER = gql`
  mutation GardenerCreate($data: GardenerCreateInput!) {
    gardenerCreate(data: $data) {
      id
    }
  }
`;

const httpLink = new HttpLink({
  uri: 'https://floragenic.herokuapp.com/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await DeviceStorage.loadItem('token');
  console.log('token of gardener: ', token);

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

const Dashboard = () => {
  const navigation = useNavigation();

  const {user, setUser} = React.useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [experience, setExperience] = useState('');
  const [cnic, setCnic] = useState('');
  const [skills, setSkills] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [value2, setValue2] = useState('');
  const [open2, setOpen2] = useState(false);
  const [image, setImage] = useState();

  const inputRef = useRef(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleLogout = async () => {
    await DeviceStorage.deleteItem('token');
    await DeviceStorage.deleteItem('userType');
    await DeviceStorage.deleteItem('id');
    notification(
      'success',
      'Logged out',
      'You have been logged out from the system',
    );
    navigation.navigate('Login');

    setUser(() => {
      return null;
    });
  };

  const [update, {data, loading, error}] = useMutation(UPDATE_GARDENER, {
    client,
    onCompleted: async data => {
      console.log(data);
      notification(
        'success',
        'Profile Updated',
        'Profile has been updated successfully!',
      );
    },
    onError: error => {
      console.log(error.message);
      notification(
        'error',
        'Updation Failed',
        'Profile updation failed, please try again!',
      );
    },
  });

  const onSubmit = data => {
    console.log('data inside onSubmit: ', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      city: data.city,
      price: parseInt(data.price),
      duration: data.duration,
      experience: parseInt(data.experience),
      CNIC: data.cnic,
      skills: data.skills,
      gender: 'Male',
      image: image,
    });
    update({
      variables: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          city: data.city,
          price: parseInt(data.price),
          duration: data.duration,
          experience: parseInt(data.experience),
          CNIC: data.cnic,
          skills: data.skills,
          gender: 'Male',
          image: image,
        },
      },
    });
  };

  const pickImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        cropping: true,
      });

      // Create a unique filename for the image
      const filename = `${Date.now()}.jpg`;
      // Upload the image to Firebase Storage
      const reference = storage().ref(filename);

      // uploads file
      await reference.putFile(image.path);
      const url = await reference.getDownloadURL();
      // setLoading(false);
      setImage(url);
      console.log('image url: ', url);
      notification('success', 'Image uploaded successfully!');
    } catch (error) {
      console.log('Error uploading image:', error);
      notification('error', 'Image upload failed!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View onTouchStart={() => removeFocus()}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.editLabel}>Gig Profile</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.editLogout}>Logout</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={{uri: image || 'https://picsum.photos/200/300'}}
            style={{
              width: '100%',
              height: 300,
              alignSelf: 'center',
              marginBottom: 24,
              borderRadius: 20,
            }}
          />

          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: Colors.lightGray,
                marginTop: 0,
              },
            ]}
            onPress={() => {
              pickImage();
            }}>
            <Text style={[styles.btnTxt, {color: Colors.black}]}>
              Upload Image
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={Colors.darkGray}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={Colors.darkGray}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.darkGray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={Colors.darkGray}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <DropDownPicker
            open={open}
            value={city}
            setValue={setCity}
            setOpen={setOpen}
            theme="LIGHT"
            multiple={false}
            mode="BADGE"
            items={PakistanCities}
            scrollViewProps={{
              persistentScrollbar: true,
            }}
            style={{
              backgroundColor: Colors.lightGray,
              width: '100%',
              height: 55,
              borderRadius: 16,
              marginBottom: 24,
              borderColor: Colors.lightGray,
            }}
            zIndex={1000}
            containerStyle={{
              width: '100%',
              height: 55,
              borderRadius: 16,
              marginBottom: 24,
              zIndex: 1000,
              borderWidth: 0,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{
              backgroundColor: Colors.lightGray,
              width: '100%',
              height: 55,
              borderRadius: 16,
              marginBottom: 14,
              borderWidth: 0,
            }}
            placeholder="Select City"
            placeholderStyle={{
              color: Colors.darkGray,
              fontFamily: 'Urbanist-Regular',
              paddingLeft: 8,
            }}
            labelStyle={{
              color: Colors.darkGray,
              fontFamily: 'Urbanist-Regular',
              paddingLeft: 8,
            }}
            selectedLabelStyle={{
              color: Colors.darkGray,
              fontFamily: 'Urbanist-Regular',
              paddingLeft: 8,
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor={Colors.darkGray}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <DropDownPicker
            open={open2}
            value={duration}
            setValue={setDuration}
            setOpen={setOpen2}
            theme="LIGHT"
            multiple={false}
            scrollViewProps={{
              persistentScrollbar: true,
            }}
            mode="SIMPLE"
            items={[
              {label: 'Daily', value: 'Daily'},
              {label: 'Hourly', value: 'Hourly'},
              {label: 'Weekly', value: 'Weekly'},
              {label: 'Monthly', value: 'Monthly'},
            ]}
            style={{
              backgroundColor: Colors.lightGray,
              width: '100%',
              height: 55,
              borderRadius: 16,
              marginBottom: 24,
              borderColor: Colors.lightGray,
            }}
            zIndex={1000}
            containerStyle={{
              width: '100%',
              height: 55,
              borderRadius: 16,
              marginBottom: 24,
              zIndex: 1000,
              borderWidth: 0,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{
              backgroundColor: Colors.lightGray,
              width: '100%',
              height: 55,
              borderRadius: 16,
              marginBottom: 14,
              borderWidth: 0,
            }}
            placeholder="Enter Duration"
            placeholderStyle={{
              color: Colors.darkGray,
              fontFamily: 'Urbanist-Regular',
              paddingLeft: 8,
            }}
            labelStyle={{
              color: Colors.darkGray,
              fontFamily: 'Urbanist-Regular',
              paddingLeft: 8,
            }}
            selectedLabelStyle={{
              color: Colors.darkGray,
              fontFamily: 'Urbanist-Regular',
              paddingLeft: 8,
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Experience (in years)"
            placeholderTextColor={Colors.darkGray}
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="CNIC"
            placeholderTextColor={Colors.darkGray}
            value={cnic}
            onChangeText={setCnic}
            keyboardType="numeric"
          />

          <SkillsComponent skills={skills} setSkills={setSkills} />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onSubmit({
                firstName,
                lastName,
                email,
                phoneNumber,
                city,
                price,
                duration,
                experience,
                cnic,
                skills,
              });
            }}>
            <Text style={styles.btnTxt}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Colors.white} />
              ) : (
                'Update Profile'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    // padding: 16,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.lightGray,
    color: Colors.black,
    fontSize: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    fontFamily: 'Urbanist-Regular',
  },
  editLabel: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
    marginBottom: 14,
    textAlign: 'center',
  },
  editLogout: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    color: Colors.red,
    marginBottom: 14,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  btnTxt: {
    fontSize: 16,
    fontFamily: 'Urbanist-Bold',
    color: Colors.white,
  },
});

export default Dashboard;
