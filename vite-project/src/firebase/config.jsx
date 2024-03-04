import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

/* const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
}; */

const firebaseConfig = {
  apiKey: "AIzaSyAK0lnoJHRxf6pwibEqeyng11WwDcOrb-k",
  authDomain: "fir-project-6c5de.firebaseapp.com",
  projectId: "fir-project-6c5de",
  storageBucket: "fir-project-6c5de.appspot.com",
  messagingSenderId: "607270569279",
  appId: "1:607270569279:web:d9c98ec0d6e02417287f8a",
  measurementId: "G-SCZCZBPM9V"
}; 

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };