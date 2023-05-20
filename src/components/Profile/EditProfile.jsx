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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Colors from '../../utils/Colors';

const EditProfile = ({
  navigation,
  route: {
    params: {data},
  },
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(false);

  const handleSaveProfile = () => {
    // Logic to save the profile data
  };

  console.log('user data in his profile tab->: ', data);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data?.user?.details?.image,
        }}
        style={styles.image}
      />

      <TextInput
        placeholder="First Name"
        value={data?.user?.details?.firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="Last Name"
        value={data?.user?.details?.lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />
      <TextInput
        placeholder="Email Address"
        value={data?.user?.details?.userDetails?.email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
        editable={false}
      />
      {/* <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      /> */}
      <TextInput
        placeholder="Phone Number"
        value={data?.user?.details?.phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
        placeholderTextColor={Colors.darkGray}
      />

      {/* <View style={styles.cbdiv}>
        <BouncyCheckbox
          size={20}
          unfillColor="#FFFFFF"
          fillColor={Colors.secondaryGreen}
          iconStyle={{borderColor: Colors.secondaryGreen}}
          innerIconStyle={{borderWidth: 1, borderRadius: 8}}
          text="Male"
          textStyle={{fontFamily: 'Urbanist-Bold', fontSize: 16}}
        />
        <BouncyCheckbox
          size={20}
          unfillColor="#FFFFFF"
          fillColor={Colors.secondaryGreen}
          iconStyle={{borderColor: Colors.secondaryGreen}}
          innerIconStyle={{borderWidth: 1, borderRadius: 8}}
          text="Female"
          textStyle={{fontFamily: 'Urbanist-Bold', fontSize: 16}}
        />
      </View> */}

      <View style={styles.btnCntr}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Update Profile</Text>
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
