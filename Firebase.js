import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: process.env.VUE_APP_apiKey,
	authDomain: "astro21-a90b6.firebaseapp.com",
	projectId: "astro21-a90b6",
	storageBucket: "astro21-a90b6.appspot.com",
	messagingSenderId: process.env.VUE_APP_messagingSenderId,
	appId: process.env.VUE_APP_appId,
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection("users")
const eventsCollection = db.collection("events")
const volunteersCollection = db.collection("volunteers")
const visitorsCollection = db.collection("visitors")

export { db, auth, usersCollection, eventsCollection, volunteersCollection, visitorsCollection }
