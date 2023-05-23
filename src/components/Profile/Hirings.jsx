import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ChevronRight from '../../assets/svg/chevronRight.svg';
import Colors from '../../utils/Colors';
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

const HIRED_GARDENERS = gql`
  query GardenerOrders {
    gardenerOrders {
      id
      customer {
        firstName
        lastName
      }
      gardener {
        firstName
        lastName
        city
        experience
        image
        phoneNumber
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

const Hirings = () => {
  const [hiredGardeners, setHiredGardeners] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const navigation = useNavigation();

  const {data, loading, error} = useQuery(HIRED_GARDENERS, {
    client,
    onCompleted: data => {
      setDataLoading(false);
      const newDataObject = {};
      data.gardenerOrders.map(item => {
        if (!newDataObject[item.date]) {
          newDataObject[item.date] = {
            date: item.date,
            gardenerOrders: [item],
          };
        } else {
          newDataObject[item.date].gardenerOrders.push(item);
        }
      });

      const newDataArray = Object.values(newDataObject);
      setHiredGardeners(newDataArray);
    },
    onError: error => {
      setDataLoading(false);
      console.log(error);
    },
  });

  const renderGardenerCard = ({item}) => {
    if (dataLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <ActivityIndicator size="large" color={Colors.secondaryGreen} />
        </View>
      );
    }

    return (
      <ScrollView>
        {error && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Text>Something went wrong, Could not load products</Text>
          </View>
        )}

        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            For {new Date(parseInt(item.date)).toLocaleDateString()}
          </Text>
        </View>

        {item.gardenerOrders.map((gardenerOrder, index) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('HiringDetails', {gardenerOrder})
              }>
              <View style={styles.content}>
                <Text style={styles.name}>
                  {gardenerOrder.gardener.firstName}
                  {gardenerOrder.gardener.lastName}
                </Text>

                <Text style={styles.name}>
                  {gardenerOrder.requestedTime} {gardenerOrder.duration}
                </Text>
                <ChevronRight />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hired Gardeners</Text>
      <FlatList
        data={hiredGardeners}
        renderItem={renderGardenerCard}
        keyExtractor={item => item.date}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    color: Colors.black,
    marginBottom: 24,
    marginTop: 18,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dateContainer: {
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Urbanist-Medium',
    color: Colors.black,
  },
});

export default Hirings;
