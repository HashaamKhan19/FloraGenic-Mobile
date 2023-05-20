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
import Eye from '../../assets/svg/eye.svg';
import {LOGIN_QUERY} from './LoginQuery';
import {useMutation} from '@apollo/client';
import {AuthContext} from '../../context/authContext';
import DeviceStorage from '../../utils/DeviceStorage';
import {useNavigation} from '@react-navigation/native';
import {notification} from '../Popups/Alert';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const {setUser} = React.useContext(AuthContext);

  const navigation = useNavigation();

  const [login, {data, loading, error}] = useMutation(LOGIN_QUERY, {
    onCompleted: async data => {
      data?.login?.token && navigation.goBack();

      await DeviceStorage.saveItem('token', data?.login.token);
      await DeviceStorage.saveItem('userType', data?.login.userType);
      await DeviceStorage.saveItem('id', data?.login.id);

      notification(
        'success',
        'Logged in',
        'You have been logged in to the system',
      );

      setUser(() => {
        console.log('setting users2, please', data.login);
        return data.login;
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  const onSubmit = data => {
    console.log('data->', data);
    login({
      variables: {
        credentials: {
          email: data.email,
          password: data.password,
          userType: 'Customer',
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.normaldiv}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/Logo/floraGenic.png')}
        />
      </View>
      <View style={styles.headingDiv}>
        <Text style={styles.mainHeading}>Login to Your Account</Text>
      </View>

      {/* Inputs */}
      <View style={{padding: 14}}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            placeholderTextColor={Colors.darkGray}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.darkGray}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
          />
          <View style={{position: 'absolute', right: 24, top: 95}}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Eye
                fill={Colors.darkGray}
                width={20}
                height={20}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
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
        <TouchableOpacity
          style={styles.btnCont}
          onPress={() => {
            onSubmit({email, password});
          }}>
          <Text style={styles.btnTxt}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.normaldiv}>
        <Text style={styles.frgtPsd}>Forgot the Password?</Text>
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

      <View style={styles.lastCont}>
        <Text
          style={{
            color: Colors.darkGray,
            marginTop: 20,
            fontFamily: 'Urbanist-Medium',
          }}>
          Don't have an account?{' '}
          <Text style={{color: Colors.secondaryGreen, fontWeight: '600'}}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: Colors.white,
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
    color: Colors.black,
    fontSize: 16,
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
    fontSize: 18,
    color: 'white',
    fontFamily: 'Urbanist-SemiBold',
  },
  frgtPsd: {
    color: Colors.secondaryGreen,
    fontFamily: 'Urbanist-Black',
    fontSize: 16,
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
  lastCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
  },
});
