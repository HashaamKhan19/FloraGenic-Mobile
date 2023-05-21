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

const Dashboard = () => {
  const navigation = useNavigation();

  const {user, setUser} = React.useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
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

  const inputRef = useRef(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleLogout = () => {
    DeviceStorage.deleteItem('token');
    DeviceStorage.deleteItem('userType');
    DeviceStorage.deleteItem('id');
    notification(
      'success',
      'Logged out',
      'You have been logged out from the system',
    );
    navigation.navigate('Login');

    setUser(() => {
      console.log('gardener khali kara raha', user);
      return null;
    });
    console.log('Gardener Logout Hogya', user);
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
            source={{uri: 'https://picsum.photos/200/300'}}
            style={{
              width: '100%',
              height: 300,
              alignSelf: 'center',
              marginBottom: 24,
              borderRadius: 20,
            }}
          />

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
            value={value}
            setValue={setValue}
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
            value={value2}
            setValue={setValue2}
            setOpen={setOpen2}
            theme="LIGHT"
            multiple={false}
            scrollViewProps={{
              persistentScrollbar: true,
            }}
            mode="SIMPLE"
            items={[
              {label: 'Hourly', value: 'Hourly'},
              {label: 'Daily', value: 'Daily'},
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
            placeholder="Enter Price Duration"
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
          <SkillsComponent />
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
});

export default Dashboard;
