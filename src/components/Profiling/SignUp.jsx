import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Colors from '../../utils/Colors';

export default function SignUp() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [value, setValue] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
  const [isFocused, setIsFocused] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.normaldiv}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/Logo/floraGenic.png')}
        />
      </View>
      <View style={styles.headingDiv}>
        <Text style={styles.mainHeading}>Create Your Account</Text>
      </View>

      {/* Inputs */}
      <View style={{padding: 14}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            placeholderTextColor={Colors.darkGray}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={Colors.darkGray}
          />
        </View>

        <View style={styles.cbdiv}>
          <BouncyCheckbox
            size={20}
            unfillColor="#FFFFFF"
            fillColor={Colors.secondaryGreen}
            iconStyle={{borderColor: Colors.secondaryGreen}}
            innerIconStyle={{borderWidth: 1, borderRadius: 8}}
          />
          <Text style={styles.label}>Remember Me</Text>
        </View>

        {/* SignUp buttons etc */}
        <TouchableOpacity style={styles.btnCont}>
          <Text style={styles.btnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.normaldiv}>
        <Text style={{color: 'grey', marginTop: 20}}>
          Already got an account?{' '}
          <Text style={{color: Colors.secondaryGreen, fontWeight: '600'}}>
            Log in
          </Text>
        </Text>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity style={styles.socialBtnCont}>
        <Image
          source={require('../../assets/vectors/google.png')}
          style={styles.sclBtn}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
  },
  tinyLogo: {
    width: 180,
    height: 100,
  },
  mainHeading: {
    // fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 30,
    marginVertical: 10,
    color: Colors.black,
    alignSelf: 'center',
    letterSpacing: 0.5,
    fontFamily: 'Urbanist-Black',
  },
  label: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
  },
  cbdiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  normaldiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headingDiv: {
    paddinTop: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  input: {
    width: '90%',
    height: 55,
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    fontFamily: 'Urbanist-Regular',
  },
  btnCont: {
    backgroundColor: Colors.secondaryGreen,
    width: '90%',
    height: 51,
    borderRadius: 100,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    fontFamily: 'Urbanist-Italic',
    fontFamily: 'Urbanist-SemiBold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray,
    marginHorizontal: 14,
  },
  dividerText: {
    marginHorizontal: 4,
    color: 'gray',
    fontFamily: 'Urbanist-SemiBold',
  },
  socialBtnCont: {
    borderColor: '#F5F5F5',
    borderWidth: 2,
    width: '80%',
    height: 50,
    borderRadius: 20,
    alignSelf: 'center',
  },
  sclBtn: {
    width: 25,
    height: 25,
    borderRadius: 1,
    alignSelf: 'center',
    margin: 10,
  },
});
