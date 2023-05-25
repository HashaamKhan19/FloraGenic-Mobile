import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Colors from '../../utils/Colors';
import {AuthContext} from '../../context/authContext';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useMutation,
  useQuery,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';

const GET_ORDERS = gql`
  query GardenerOrders {
    gardenerOrders {
      id
      customer {
        firstName
        lastName
        phoneNumber
      }
      gardener {
        id
        firstName
        lastName
      }
      service
      date
      requestedTime
      duration
      status
      totalPrice
      createdAt
      updatedAt
    }
  }
`;

const httpLink = new HttpLink({
  uri: 'https://floragenic.herokuapp.com/graphql',
});

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await DeviceStorage.loadItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Orders = () => {
  const {data, loading, error} = useQuery(GET_ORDERS, {client: client});

  console.log('dddadaaaa', data);

  return (
    <View style={styles.container}>
      {data?.gardenerOrders?.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{fontSize: 18, color: 'black', fontFamily: 'Urbanist-Bold'}}>
            No orders yet...
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Hired by: {item.customer.firstName} {item.customer.lastName}
                  </Text>
                  <Text style={{fontSize: 16, color: Colors.gray}}>
                    Contact: {item.customer.phoneNumber}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  card: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
});

export default Orders;
