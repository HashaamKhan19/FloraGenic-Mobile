import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlantScan from '../screens/PlantScan';
import Store from '../screens/Store';
import UserProfile from '../screens/UserProfile';
import Nurseries from '../screens/Nurseries';
import Gardeners from '../screens/Gardeners';
import dimensions from '../utils/Dimensions';
import {StyleSheet} from 'react-native';
import Colors from '../utils/Colors';
import {View, Text} from 'react-native';
import Leaf from '../assets/svg/leaf.svg';
import Scan from '../assets/svg/scan.svg';
import Profile from '../assets/svg/profile.svg';
import Nursery from '../assets/svg/nursery.svg';
import Garden from '../assets/svg/garden.svg';
import ProductDetails from '../components/Product/ProductDetails';
import NurseryDetails from '../components/Nurseries/NurseryDetails';
import AllProducts from '../components/Product/AllProducts';
import GardenerDetails from '../components/Gardeners/GardenerDetails';
import EditProfile from '../components/Profile/EditProfile';
import Address from '../components/Profile/Address';
import Orders from '../components/Profile/Orders';
import Payments from '../components/Profile/Payments';
import {AuthContext} from '../context/authContext';
import {useContext} from 'react';
import Login from '../components/Profiling/Login';
import SignUp from '../components/Profiling/SignUp';
import EditPassword from '../components/Profile/EditPassword';
import Cart from '../components/Cart/Cart';
import CheckoutPage from '../components/Cart/CheckoutPage';
import PaymentPage from '../components/Cart/PaymentPage';
import MainNav from './MainNav';
import GardenerHire from '../components/Gardeners/GardenerHire';
import Wishlist from '../components/Wishlist/Wishlist';

const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

function TabNavigator() {
  const {user} = useContext(AuthContext);

  const handleTabPress = ({navigation, route}) => {
    if (user && user.id !== null) {
      navigation.navigate('Profile');
      console.log('user found->>', user);
    } else {
      console.log('user not found ->', user);
      navigation.navigate('Login');
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: dimensions.Height / 14,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 600,
        },
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Urbanist-Bold',
                color: focused ? Colors.floraGreen : Colors.gray,
                marginTop: -10,
                marginBottom: 4,
              }}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'Store') {
            return focused ? (
              <View style={styles.activeStyle}>
                <Leaf
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <Leaf
                  fill={Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            );
          }
          if (route.name === 'AI Scan') {
            return focused ? (
              <View style={styles.activeStyle}>
                <Scan
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <Scan
                  fill={Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            );
          }
          if (route.name === 'Nurseries') {
            return focused ? (
              <View style={styles.activeStyle}>
                <Nursery
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 12}
                  height={dimensions.Height}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <Nursery
                  fill={Colors.gray}
                  width={dimensions.Width / 12}
                  height={dimensions.Height}
                />
              </View>
            );
          }
          if (route.name === 'Gardeners') {
            return focused ? (
              <View style={styles.activeStyle}>
                <Garden
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <Garden
                  fill={Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            );
          }
          if (route.name === 'Profile') {
            return focused ? (
              <View style={styles.activeStyle}>
                <Profile
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <Profile
                  fill={Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            );
          }
        },
      })}>
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="AI Scan" component={PlantScan} />
      <Tab.Screen name="Nurseries" component={Nurseries} />
      <Tab.Screen name="Gardeners" component={Gardeners} />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            handleTabPress({navigation, route});
          },
        })}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="NurseryDetails"
        component={NurseryDetails}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="GardenerDetails"
        component={GardenerDetails}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Address"
        component={Address}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Payments"
        component={Payments}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="CheckoutPage"
        component={CheckoutPage}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="PaymentPage"
        component={PaymentPage}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="GardenerHire"
        component={GardenerHire}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="WishList"
        component={Wishlist}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default function TabNav() {
  return <StackNavigator />;
}

const styles = StyleSheet.create({
  activeStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    color: Colors.floraGreen,
    fontSize: 10,
    marginTop: -10,
    fontFamily: 'Urbanist-Medium',
  },
  inactiveText: {
    color: Colors.gray,
    fontSize: 10,
    marginTop: -10,
    fontFamily: 'Urbanist-Regular',
  },
});
