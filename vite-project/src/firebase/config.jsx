import { initializeApp } from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_apiKey,
  authDomain: import.meta.env.REACT_APP_authDomain,
  projectId: import.meta.env.REACT_APP_projectId,
  storageBucket: import.meta.env.REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.REACT_APP_messagingSenderId,
  appId: import.meta.env.REACT_APP_appId,
  measurementId: import.meta.env.REACT_APP_measurementId
};

const app = initializeApp(firebaseConfig);
const db = app.firestore();

export default app;