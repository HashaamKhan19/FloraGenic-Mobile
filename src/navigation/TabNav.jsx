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

const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

function TabNavigator() {
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
                fontWeight: '600',
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
      <Tab.Screen name="Profile" component={UserProfile} />
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
    </stack.Navigator>
  );
}

export default function TabNav() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
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
    fontWeight: 600,
    marginTop: -10,
  },
  inactiveText: {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: 600,
    marginTop: -10,
  },
});
