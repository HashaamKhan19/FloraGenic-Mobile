import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Colors from '../../utils/Colors';
import Edit from '../../assets/svg/edit.svg';
import Delete from '../../assets/svg/delete.svg';
import GroupAddress from '../../assets/svg/groupAddress.svg';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

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

const GET_ADDRESSES = gql`
  query Addresses {
    addresses {
      id
      userID
      name
      location
      pin
      city
      setAsDefault
    }
  }
`;

const Address = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const {data, loading, error} = useQuery(GET_ADDRESSES, {
    client,
    onCompleted: data => {
      console.log(data.addresses);
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <View style={styles.screenContainer}>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <ActivityIndicator size="large" color={Colors.secondaryGreen} />
        </View>
      )}

      {error && (
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text>Something went wrong, Could not load addresses</Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data?.addresses?.map(address => (
          <View key={address.id} style={styles.cardContainer}>
            <GroupAddress />
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.name}>{address.name}</Text>
                <Text style={styles.location}>{address.location}</Text>
              </View>
              <View style={styles.btnsCont}>
                <TouchableOpacity>
                  <Edit />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Delete />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {!loading && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddAddress')}>
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 100,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 21,
    backgroundColor: Colors.lightGray,
    borderRadius: 22,
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
    color: Colors.black,
  },
  location: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
    fontFamily: 'Urbanist-Regular',
  },
  addButton: {
    backgroundColor: Colors.secondaryGreen,
    borderRadius: 100,
    paddingVertical: 18,
    paddingHorizontal: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: '90%',
  },
  addButtonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Urbanist-Bold',
  },
});

export default Address;
