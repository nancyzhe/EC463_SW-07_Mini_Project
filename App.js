import React from 'react';
import * as firebase from 'firebase';
import "firebase/firestore";

import apiKeys from './config/keys';
import FinalStackScreen from './stack/FinalStackScreen';

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <FinalStackScreen/>
  );
}