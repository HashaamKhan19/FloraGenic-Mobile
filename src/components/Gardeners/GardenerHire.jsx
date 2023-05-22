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

const GardenerHire = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const calculateTotalTime = () => {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays.toFixed(0);
  };

  const inputRef = useRef(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyCont}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.container}
        onTouchStart={() => removeFocus()}>
        <View style={styles.normaldiv}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/Logo/floraGenic.png')}
          />
        </View>

        <Text style={styles.mainHeading}>
          Hire a gardener to take care of your garden while you are away.
        </Text>

        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Starting Date</Text>
          <TouchableOpacity
            style={styles.btnCont}
            onPress={() => {
              setOpen1(true);
            }}>
            <Text style={styles.btnTxt}>Select Starting Date</Text>
          </TouchableOpacity>
          <DatePicker
            mode="date"
            date={new Date()}
            textColor="#fff"
            onConfirm={date => {
              setOpen1(false);
              setStartDate(date);
            }}
            onCancel={() => {
              setOpen1(false);
            }}
            open={open1}
            modal
          />
          <Text style={{color: Colors.black, fontFamily: 'Urbanist-Regular'}}>
            {startDate.getDate()}/{startDate.getMonth() + 1}/
            {startDate.getFullYear()}
          </Text>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Ending Date</Text>
          <TouchableOpacity
            style={styles.btnCont}
            onPress={() => {
              setOpen2(true);
            }}>
            <Text style={styles.btnTxt}>Select Ending Date</Text>
          </TouchableOpacity>
          <DatePicker
            mode="date"
            modal
            date={new Date()}
            textColor="#fff"
            onConfirm={date => {
              setOpen1(false);
              setEndDate(date);
            }}
            onCancel={() => {
              setOpen2(false);
            }}
            open={open2}
          />
          <Text style={{color: Colors.black, fontFamily: 'Urbanist-Regular'}}>
            {endDate.getDate()}/{endDate.getMonth() + 1}/{endDate.getFullYear()}
          </Text>
        </View>

        <View style={styles.requestedTimeContainer}>
          <Text style={styles.label}>Requested Time:</Text>
          <Text style={styles.totalTime}>{calculateTotalTime()} days</Text>
        </View>

        <View style={styles.servicesContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Services needed"
            placeholderTextColor={Colors.darkGray}
            multiline={true}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.btnCont,
            {backgroundColor: Colors.floraGreen, marginTop: 14},
          ]}>
          <Text style={[styles.btnTxt, {color: Colors.white}]}>
            Proceed to Payment
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
    marginBottom: 8,
    color: Colors.black,
    fontFamily: 'Urbanist-Bold',
    fontSize: 16,
  },
  requestedTimeContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
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
  btnCont: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    padding: 20,
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
});

export default GardenerHire;
