import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import Hand from '../../assets/svg/hand.svg';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {notification} from '../Popups/Alert';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import Camera from '../../assets/svg/camera.svg';
import Device from '../../assets/svg/device.svg';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        cropping: true,
      });

      // Create a unique filename for the image
      const filename = `${Date.now()}.jpg`;
      // Upload the image to Firebase Storage
      const reference = storage().ref(filename);
      setLoading(true);
      // uploads file
      await reference.putFile(image.path);
      const url = await reference.getDownloadURL();
      // setLoading(false);
      setImage(url);
      notification('success', 'Image uploaded successfully!');

      await axios
        .post('https://floragenic.herokuapp.com/ai-scan', {
          image_url: url,
        })
        .then(res => {
          console.log(res.data);
          setLoading(false);
          navigation.navigate('PlantDetails', {data: res.data, url: url});
        })
        .catch(err => {
          console.log(err);
          setLoading(false);

          console.log('error me agya begharat axios k andr  :');
        });
    } catch (error) {
      console.log('Error uploading image:', error);
      setLoading(false);
      notification('error', 'Image upload failed!');
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: true,
      });

      // Create a unique filename for the image
      const filename = `${Date.now()}.jpg`;
      // Upload the image to Firebase Storage
      const reference = storage().ref(filename);
      setLoading(true);
      // uploads file
      await reference.putFile(image.path);
      const url = await reference.getDownloadURL();
      // setLoading(false);
      setImage(url);
      notification('success', 'Image uploaded successfully!');

      await axios
        .post('https://floragenic.herokuapp.com/ai-scan', {
          image_url: url,
        })
        .then(res => {
          console.log(res.data);
          setLoading(false);
          navigation.navigate('PlantDetails', {data: res.data, url: url});
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          console.log('error me agya begharat axios ke');
        });
    } catch (error) {
      console.log('Error uploading image:', error);
      setLoading(false);
      notification('error', 'Image upload failed!');
    }
  };

  return (
    <>
      <View style={styles.imgCont}>
        <Hand fill={Colors.floraGreen} style={styles.img} />

        <Text style={styles.imgText}>
          Get free assistance from our Virtual Botanist to take care of your
          plant!
        </Text>
      </View>
      {!loading ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.btn} onPress={openCamera}>
            <View style={styles.insideBtn}>
              <Camera />
              <Text style={styles.title}>Select from Camera</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              pickImage();
            }}>
            <View style={styles.insideBtn}>
              <Device />
              <Text style={styles.title}>Select from Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={Colors.floraGreen}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    gap: 5,
  },
  imgCont: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  img: {
    width: 200,
    height: 200,
  },
  imgText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
  },
  btn: {
    backgroundColor: Colors.lightGray,
    padding: 30,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.secondaryGreen,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'Urbanist-Regular',
  },
  insideBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default Home;
