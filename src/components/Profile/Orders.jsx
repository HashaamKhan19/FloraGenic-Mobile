import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
import ActiveOrders from './OrderTabs/ActiveOrders';
import CompletedOrders from './OrderTabs/CompletedOrders';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('active');

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'active' && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress('active')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'active' && styles.activeTabButtonText,
            ]}>
            Active Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'completed' && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress('completed')}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'completed' && styles.activeTabButtonText,
            ]}>
            Completed Orders
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'active' ? <ActiveOrders /> : <CompletedOrders />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: 'transparent',
    marginRight: 8,
  },
  activeTabButton: {
    borderColor: Colors.secondaryGreen,
  },
  tabButtonText: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Urbanist-Medium',
  },
  activeTabButtonText: {
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
  },
});

export default Orders;
