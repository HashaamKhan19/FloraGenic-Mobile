import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../utils/Colors';
import DatePicker from 'react-native-date-picker';
import {ActivityIndicator} from 'react-native-paper';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
  useMutation,
} from '@apollo/client';
import DeviceStorage from '../../utils/DeviceStorage';
import {notification} from '../Popups/Alert';
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

const HIRE_GARDENER = gql`
  mutation GardenerOrderCreate($data: GardenerOrderCreateInput!) {
    gardenerOrderCreate(data: $data)
  }
`;

const GardenerHire = ({
  route: {
    params: {gardener},
  },
}) => {
  const navigation = useNavigation();

  const [hire, {data, loading, error}] = useMutation(HIRE_GARDENER, {
    client,
    onCompleted: data => {
      setBtnLoading(false);
      notification('success', 'Gardener Hired', 'Gardener hired successfully.');
      navigation.navigate('Gardeners');
    },
    onError: error => {
      setBtnLoading(false);
      notification(
        'error',
        'Error Hiring Gardener',
        'Failed to hire gardener, try again.',
      );
      console.log(error);
    },
  });

  const onSubmit = data => {
    hire({
      variables: {
        data: {
          gardener: gardener?.id,
          date: data.date,
          requestedTime: parseInt(data.requestedTime),
          duration: data.selectedButton,
          service: data.services,
        },
      },
    });
  };

  const [date, setDate] = useState(new Date());

  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Days');
  const [requestedTime, setRequestedTime] = useState();
  const [services, setServices] = useState('');

  const inputRef = useRef(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleButtonPress = value => {
    setSelectedButton(value);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyCont}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.container}
        onTouchStart={() => removeFocus()}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Starting Date</Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 24,
            }}>
            <DatePicker
              mode="date"
              date={date}
              textColor="#000"
              onDateChange={setDate}
              minimumDate={new Date()}
              fadeToColor="none"
            />
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Requested Time (in numbers)"
            placeholderTextColor={Colors.darkGray}
            keyboardType="numeric"
            value={requestedTime}
            onChangeText={setRequestedTime}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'Days' && {
                backgroundColor: Colors.secondaryGreen,
              },
            ]}
            onPress={() => handleButtonPress('Days')}>
            <Text style={styles.buttonText}>Days</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'Hours' && {
                backgroundColor: Colors.secondaryGreen,
              },
            ]}
            onPress={() => handleButtonPress('Hours')}>
            <Text style={styles.buttonText}>Hours</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Services needed"
            placeholderTextColor={Colors.darkGray}
            multiline={true}
            numberOfLines={2}
            value={services}
            onChangeText={setServices}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.btnCont,
            {backgroundColor: Colors.floraGreen, marginTop: 14},
          ]}
          onPress={() => {
            setBtnLoading(true);
            onSubmit({
              date,
              requestedTime,
              selectedButton,
              services,
            });
          }}>
          <Text
            style={[
              styles.btnTxt,
              {color: Colors.white, fontSize: 18, fontFamily: 'Urbanist-Bold'},
            ]}>
            {btnLoading ? (
              <ActivityIndicator color={Colors.white} size={'large'} />
            ) : (
              'Hire Gardener'
            )}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.white,
  },
  mainHeading: {
    marginBottom: 24,
    paddingBottom: 24,
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  datePickerContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 12,
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
    fontSize: 22,
    textAlign: 'left',
  },
  servicesContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.lightGray,
    color: Colors.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    fontFamily: 'Urbanist-Regular',
  },
  reqInput: {
    width: '50%',
    height: 55,
    backgroundColor: Colors.lightGray,
    color: Colors.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    fontFamily: 'Urbanist-Regular',
  },
  btnCont: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  btnTxt: {
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
  },
  totalTime: {
    color: Colors.darkGray,
    fontFamily: 'Urbanist-Medium',
    fontSize: 16,
  },
  tinyLogo: {
    width: 180,
    height: 100,
  },
  normaldiv: {
    justifyContent: 'center',
  },
  keyCont: {
    flex: 1,
  },
  requestedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    gap: 14,
  },
  button: {
    backgroundColor: Colors.darkGray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Urbanist-Bold',
  },
});

export default GardenerHire;
