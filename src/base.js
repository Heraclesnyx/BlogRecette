import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBKINM4Pd4fouVT2z88LV-dejVlYLPzMHk",
    authDomain: "blog-recette-2a4b3.firebaseapp.com",
    databaseURL: "https://blog-recette-2a4b3-default-rtdb.europe-west1.firebasedatabase.app"
});

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
