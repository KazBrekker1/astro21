import firebase from "firebase"

const firebaseConfig = {
	apiKey: "AIzaSyBYAJH86SCAG4K8FtfwrPyjguNEXapBSMA",
	authDomain: "astro21-a90b6.firebaseapp.com",
	projectId: "astro21-a90b6",
	storageBucket: "astro21-a90b6.appspot.com",
	messagingSenderId: "226656084400",
	appId: "1:226656084400:web:2b2020d2ec3d8517827675",
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection("users")
const eventsCollection = db.collection("events")
const volunteersCollection = db.collection("volunteers")
const visitorsCollection = db.collection("visitors")

export { db, auth, usersCollection, eventsCollection, volunteersCollection, visitorsCollection }
