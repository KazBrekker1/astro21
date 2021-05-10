import firebase from "firebase"

console.log(process.env.VUE_APP_apiKey)
const firebaseConfig = {
	// apiKey: "AIzaSyBYAJH86SCAG4K8FtfwrPyjguNEXapBSMA",
	apiKey: process.env.VUE_APP_apiKey,
	authDomain: "astro21-a90b6.firebaseapp.com",
	projectId: "astro21-a90b6",
	storageBucket: "astro21-a90b6.appspot.com",
	// messagingSenderId: "226656084400",
	messagingSenderId: process.env.VUE_APP_messagingSenderId,
	// appId: "1:226656084400:web:2b2020d2ec3d8517827675",
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
