// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDd9KjqnfC3djbG8o6ArSPAsUpgdy_g3SI',
  authDomain: 'filmoteka-7329e.firebaseapp.com',
  projectId: 'filmoteka-7329e',
  storageBucket: 'filmoteka-7329e.appspot.com',
  messagingSenderId: '348930327817',
  appId: '1:348930327817:web:665a85ab0ea97757d97fd8',
  measurementId: 'G-CK3DHCP9CG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const admin = require('firebase-admin');

const serviceAccount = require('../../firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
