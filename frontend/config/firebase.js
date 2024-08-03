// // Import the functions you need from the SDKs you need
// import { initializeApp,getReactNativePersistence } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth } from "firebase/auth";
// import { getFirestore, collection } from "firebase/firestore";
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDUeS0rgnYRx8j2HSaZwyxSCBwmBYVQYk4",
//   authDomain: "pengelola-keuangan-597ab.firebaseapp.com",
//   projectId: "pengelola-keuangan-597ab",
//   storageBucket: "pengelola-keuangan-597ab.appspot.com",
//   messagingSenderId: "162173403903",
//   appId: "1:162173403903:web:1f147ce4d237f0d84342ca",
//   measurementId: "G-6TTBYCYDYK",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

// export const tanggalRef = collection(db, "tanggall");
// export const tripsRef = collection(db, "trips");
// export const expensesRef = collection(db, "expenses");

// // const analytics = getAnalytics(app);

// export default app;

import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUeS0rgnYRx8j2HSaZwyxSCBwmBYVQYk4",
  authDomain: "pengelola-keuangan-597ab.firebaseapp.com",
  projectId: "pengelola-keuangan-597ab",
  storageBucket: "pengelola-keuangan-597ab.appspot.com",
  messagingSenderId: "162173403903",
  appId: "1:162173403903:web:1f147ce4d237f0d84342ca",
  measurementId: "G-6TTBYCYDYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const tanggalRef = collection(db, "tanggall");
const tripsRef = collection(db, "trips");
const expensesRef = collection(db, "expenses");

export { auth, db, tanggalRef, tripsRef, expensesRef };
export default app;
