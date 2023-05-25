// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';

import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAAl6gZyGiarqIC-T8QAMDx40wsRP8tllU',
  authDomain: 'iot-floragenic-2bca8.firebaseapp.com',
  databaseURL:
    'https://iot-floragenic-2bca8-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'iot-floragenic-2bca8',
  storageBucket: 'iot-floragenic-2bca8.appspot.com',
  messagingSenderId: '20015558229',
  appId: '1:20015558229:web:ed7fbdeb126e6feaf4aedc',
  measurementId: 'G-V0FBQN3LYC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
