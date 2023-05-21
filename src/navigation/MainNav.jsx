import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authContext';
import dimensions from '../utils/Dimensions';
import PlantScan from '../screens/PlantScan';

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
                fontWeight: '600',
                color: focused ? Colors.floraGreen : Colors.gray,
                marginTop: -10,
                marginBottom: 4,
              }}>
              {route.name}
            </Text>
          );
        },
        // tabBarIcon: ({focused}) => {
        //   if (route.name === 'Store') {
        //     return focused ? (
        //       <View style={styles.activeStyle}>
        //         <Leaf
        //           fill={Colors.floraGreen}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     ) : (
        //       <View style={styles.inactiveStyle}>
        //         <Leaf
        //           fill={Colors.gray}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     );
        //   }
        //   if (route.name === 'AI Scan') {
        //     return focused ? (
        //       <View style={styles.activeStyle}>
        //         <Scan
        //           fill={Colors.floraGreen}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     ) : (
        //       <View style={styles.inactiveStyle}>
        //         <Scan
        //           fill={Colors.gray}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     );
        //   }
        //   if (route.name === 'Nurseries') {
        //     return focused ? (
        //       <View style={styles.activeStyle}>
        //         <Nursery
        //           fill={Colors.floraGreen}
        //           width={dimensions.Width / 12}
        //           height={dimensions.Height}
        //         />
        //       </View>
        //     ) : (
        //       <View style={styles.inactiveStyle}>
        //         <Nursery
        //           fill={Colors.gray}
        //           width={dimensions.Width / 12}
        //           height={dimensions.Height}
        //         />
        //       </View>
        //     );
        //   }
        //   if (route.name === 'Gardeners') {
        //     return focused ? (
        //       <View style={styles.activeStyle}>
        //         <Garden
        //           fill={Colors.floraGreen}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     ) : (
        //       <View style={styles.inactiveStyle}>
        //         <Garden
        //           fill={Colors.gray}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     );
        //   }
        //   if (route.name === 'Profile') {
        //     return focused ? (
        //       <View style={styles.activeStyle}>
        //         <Profile
        //           fill={Colors.floraGreen}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     ) : (
        //       <View style={styles.inactiveStyle}>
        //         <Profile
        //           fill={Colors.gray}
        //           width={dimensions.Width / 17}
        //           height={dimensions.Height / 17}
        //         />
        //       </View>
        //     );
        //   }
        // },
      })}>
      {/* <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="AI Scan" component={PlantScan} />
      <Tab.Screen name="Nurseries" component={Nurseries} />
      <Tab.Screen name="Gardeners" component={Gardeners} /> */}
      {/* <Tab.Screen
        name="Profile"
        component={UserProfile}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            handleTabPress({navigation, route});
          },
        })}
      /> */}
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="PlantScan"
        component={PlantScan}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
}

export default function MainNav() {
  return <StackNavigator />;
}
