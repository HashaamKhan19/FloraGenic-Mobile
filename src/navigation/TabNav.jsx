import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlantScan from '../screens/PlantScan';
import Store from '../screens/Store';
import Profile from '../screens/Profile';
import Nurseries from '../screens/Nurseries';
import Gardeners from '../screens/Gardeners';
import dimensions from '../utils/Dimensions';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import Colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={route => {
        return {
          headerShown: false,
          tabBarStyle: {
            height: dimensions.Height / 14,
            backgroundColor: 'white',
          },
          //   tabBarIcon: ({focused}) => {
          //     if (route.name === 'Store') {
          //       return focused ? (
          //         <View style={styles.}>
          //           <Icon
          //             name={'Store'}
          //             size={20}
          //             color={Colors.secondaryGreen}
          //             style={{margin: 2}}
          //           />
          //           ;<Text style={styles.activeText}>Store</Text>
          //         </View>
          //       ) : (
          //         <View style={styles.inactiveStyle}>
          //           <Icon
          //             name={'Store'}
          //             size={20}
          //             color={Colors.gray}
          //             style={{margin: 2}}
          //           />
          //           ;<Text style={styles.inactiveText}>Store</Text>
          //         </View>
          //       );
          //     }
          //   },
        };
      }}>
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="PlantScan" component={PlantScan} />
      <Tab.Screen name="Nurseries" component={Nurseries} />
      <Tab.Screen name="Gardeners" component={Gardeners} />
      <Tab.Screen name="Profile" component={Profile} />
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
