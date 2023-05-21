import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/authContext';
import dimensions from '../utils/Dimensions';
import Dashboard from '../components/GardenerDashboard/Dashboard';
import Colors from '../utils/Colors';
import DashboardIcon from '../assets/svg/dashboard.svg';
import OrdersIcon from '../assets/svg/ordersGard.svg';
import PaymentIcon from '../assets/svg/money.svg';
import Orders from '../components/GardenerDashboard/Orders';
import Payments from '../components/GardenerDashboard/Payments';
import Login from '../components/Profiling/Login';

const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

function TabNavigator() {
  const {user} = useContext(AuthContext);

  const handleTabPress = ({navigation, route}) => {
    if (user && user.id !== null) {
      navigation.navigate('Dashboard');
      console.log('user found->>', user);
    } else {
      console.log('user not found ->', user);
      navigation.navigate('Login');
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
                color: focused ? Colors.floraGreen : Colors.gray,
                marginTop: -10,
                marginBottom: 4,
                fontFamily: 'Urbanist-Bold',
              }}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'Dashboard') {
            return focused ? (
              <View style={styles.activeStyle}>
                <DashboardIcon
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <DashboardIcon
                  fill={Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            );
          }
          if (route.name === 'Orders') {
            return focused ? (
              <View style={styles.activeStyle}>
                <OrdersIcon
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <OrdersIcon
                  fill={Colors.gray}
                  width={dimensions.Width / 17}
                  height={dimensions.Height / 17}
                />
              </View>
            );
          }
          if (route.name === 'Payments') {
            return focused ? (
              <View style={styles.activeStyle}>
                <PaymentIcon
                  fill={Colors.floraGreen}
                  width={dimensions.Width / 12}
                  height={dimensions.Height}
                />
              </View>
            ) : (
              <View style={styles.inactiveStyle}>
                <PaymentIcon
                  fill={Colors.gray}
                  width={dimensions.Width / 12}
                  height={dimensions.Height}
                />
              </View>
            );
          }
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Payments" component={Payments} />
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
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="MainNav"
        component={MainNav}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default function MainNav() {
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
    fontFamily: 'Urbanist-Regular',
    fontSize: 10,
    marginTop: -10,
  },
});
