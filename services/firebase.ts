import firebase from 'firebase/app';
import 'firebase/firestore';
import {Platform} from 'react-native';

const config = {
  apiKey: 'AIzaSyCMoApbCmvr3_uL2yGZoZ7UcU24h0rhlgU',
  authDomain: 'interview-todos.firebaseapp.com',
  projectId: 'interview-todos',
  storageBucket: 'interview-todos.appspot.com',
  messagingSenderId: '598035300081',
  appId: '1:598035300081:web:dc63e598fe7998b2f5f350',
  measurementId: 'G-QY9P3TP4PH',
};

console.log(config);

firebase.initializeApp(config);

// Experimental Long Polling Open Issue - https://github.com/firebase/firebase-js-sdk/issues/1674
firebase
  .firestore()
  .settings({experimentalForceLongPolling: Platform.OS === 'android'});
