import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Colors from '../../utils/Colors';

const Orders = () => {
  const [activeOrders, setActiveOrders] = useState([
    {id: 1, title: 'Order 1', status: 'Active'},
    {id: 2, title: 'Order 2', status: 'Active'},
  ]);

  const [pendingOrders, setPendingOrders] = useState([
    {id: 3, title: 'Order 3', status: 'Pending'},
    {id: 4, title: 'Order 4', status: 'Pending'},
  ]);

  const [completedOrders, setCompletedOrders] = useState([
    {id: 5, title: 'Order 5', status: 'Completed'},
    {id: 6, title: 'Order 6', status: 'Completed'},
  ]);

  const [activeTab, setActiveTab] = useState('active');

  const renderOrderCard = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
    );
  };

  const renderOrders = () => {
    let orders = [];

    if (activeTab === 'active') {
      orders = activeOrders;
    } else if (activeTab === 'pending') {
      orders = pendingOrders;
    } else if (activeTab === 'completed') {
      orders = completedOrders;
    }

    return (
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}>
          <Text style={styles.tabText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}>
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}>
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ordersContainer}>{renderOrders()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
  },
  activeTab: {
    borderBottomColor: Colors.secondaryGreen,
  },
  tabText: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
  },
  ordersContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.blackishGray,
  },
  status: {
    fontSize: 16,
    color: Colors.floraGreen,
    fontFamily: 'Urbanist-SemiBold',
  },
  badge: {
    backgroundColor: Colors.floraGreen,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: Colors.white,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: 14,
  },
});

export default Orders;
