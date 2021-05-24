import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCyCk58wpzwEO6DS0n0X6O5ZmFF8bLAKZE",
  authDomain: "login-for-patientmonetoring.firebaseapp.com",
  projectId: "login-for-patientmonetoring",
  storageBucket: "login-for-patientmonetoring.appspot.com",
  messagingSenderId: "517682061729",
  appId: "1:517682061729:web:c27271c9c0ff69c814abe0",
};

firebase.initializeApp(firebaseConfig);
//   const auth = firebase.auth();

export default firebase;
