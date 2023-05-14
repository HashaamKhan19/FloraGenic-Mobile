import {
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Colors from '../../utils/Colors';
import Hand from '../../assets/svg/hand.svg';

const Home = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [image, setImage] = useState(null);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      const result1 = await TextRecognition.recognize(result.assets[0].uri);
    }
  };

  const selectImage = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        setImage(response);
        convertBinary(response);
      } else {
        console.log('Image selection cancelled.');
      }
    } catch (error) {
      console.log(error.response.data);
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
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={openCamera}>
          <Text style={styles.title}>Select from Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={selectImage}>
          <Text style={styles.title}>Select from Gallery</Text>
        </TouchableOpacity>
      </View>
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
  },
  btn: {
    backgroundColor: Colors.gray,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black,
  },
});

export default Home;
