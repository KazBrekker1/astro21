import { createStore } from "vuex"
import * as fb from "../../Firebase"
import router from "../router/index"

export default createStore({
	state: {
		userProfile: {},
		events: [],
		volunteers: [],
		visitors: [],
		error: "",
		success: "",
	},
	mutations: {
		setUserProfile(state, val) {
			state.userProfile = val
		},
		setError(state, val) {
			state.error = val
			setTimeout(() => (state.error = ""), 5000)
		},
		setSuccess(state, val) {
			state.success = val
			setTimeout(() => (state.success = ""), 4000)
		},
		SET_EVENTS(state, val) {
			state.events = val
		},
		ADD_EVENT(state, val) {
			state.events.push(val)
		},
		REMOVE_EVENT(state, eventId) {
			state.events = state.events.filter((e) => e.id != eventId)
		},
		SET_VOLUNTEERS(state, val) {
			state.volunteers = val
		},
		ADD_VOLUNTEER(state, val) {
			state.volunteers.unshift(val)
		},
		REMOVE_VOLUNTEER(state, volunteerId) {
			state.volunteers = state.volunteers.filter((vol) => vol.id != volunteerId)
		},
		SET_VISITORS(state, val) {
			state.visitors = val
		},
		ADD_VISITOR(state, val) {
			state.visitors.push(val)
		},
		REMOVE_VISITOR(state, visitorId) {
			state.visitors = state.visitors.filter((vis) => vis.id != visitorId)
		},
		ARRIVE_VISITOR(state, visitorId) {
			let visitorIdx = state.visitors.findIndex((vis) => vis.id == visitorId)
			state.visitors[visitorIdx].arrived = !state.visitors[visitorIdx].arrived
		},
	},
	actions: {
		/////////////////////////////////
		async login({ dispatch, commit }, form) {
			// sign user in
			try {
				const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
				dispatch("fetchUserProfile", user)
				commit("setError", "")
				commit("setSuccess", "Welcome Back!")
			} catch (err) {
				commit("setError", err.code)
				NProgress.done()
			}
			// fetch user profile and set in state
		},
		async fetchUserProfile({ commit }, user) {
			const userProfile = await fb.usersCollection.doc(user.uid).get()
			// set user profile in state
			commit("setUserProfile", userProfile.data())
			// change route to dashboard
			let currentPath = router.currentRoute.value.path
			if (currentPath == "/login" || currentPath == "/register" || currentPath == "/") {
				router.push("/volunteers")
				NProgress.done()
			}
		},
		async register({ dispatch, commit }, form) {
			try {
				const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
				// create user profile object in userCollections
				await fb.usersCollection.doc(user.uid).set({
					name: form.name,
				})
				NProgress.done()
				commit("setError", "")
				commit("setSuccess", "Welcome!")
				// fetch user profile and set in state
				dispatch("fetchUserProfile", user)
			} catch (err) {
				commit("setError", err.code)
			}
		},
		async logout({ commit }) {
			await fb.auth.signOut()
			commit("setUserProfile", {})
			router.push("/login")
		},
		setEvents({ state, commit }, events) {
			commit("SET_EVENTS", events)
		},
		async addEvent({ state, commit }, event) {
			await fb.eventsCollection.add({
				createdOn: new Date(),
				name: event.name,
				time: event.time,
				description: event.description,
				userId: fb.auth.currentUser.uid,
				// userName: state.userProfile.name,
			})
			// commit("ADD_EVENT", event)
		},
		async removeEvent({ state, commit }, eventId) {
			await fb.eventsCollection.doc(eventId).delete()
			// .then(() => {
			// 	// commit("setError", "Recipe Removed")
			// })
			// commit("REMOVE_EVENT", eventId)
		},
		setVolunteers({ state, commit }, volunteers) {
			commit("SET_VOLUNTEERS", volunteers)
		},
		async addVolunteer({ state, commit }, volunteer) {
			await fb.volunteersCollection.add({
				createdOn: new Date(),
				name: volunteer.name,
				email: volunteer.email,
				team: volunteer.team,
				number: volunteer.number,
				userId: fb.auth.currentUser.uid,
				// userName: state.userProfile.name,
			})
			// commit("ADD_VOLUNTEER", volunteer)
		},
		async removeVolunteer({ state, commit }, volunteerId) {
			await fb.volunteersCollection.doc(volunteerId).delete()
			// commit("REMOVE_VOLUNTEER", volunteerId)
		},
		setVisitors({ state, commit }, visitors) {
			commit("SET_VISITORS", visitors)
			commit(
				"SET_VISITORS",
				state.visitors.sort((x, y) => {
					return x.arrived - y.arrived
				})
			)
		},
		async addVisitor({ state, commit }, visitor) {
			await fb.visitorsCollection.add({
				createdOn: new Date(),
				name: visitor.name,
				email: visitor.email,
				age: visitor.age,
				arrived: visitor.arrived,
				userId: fb.auth.currentUser.uid,
				// userName: state.userProfile.name,
			})
			commit(
				"SET_VISITORS",
				state.visitors.sort((x, y) => {
					return x.arrived - y.arrived
				})
			)
		},
		async removeVisitor({ state, commit }, visitorId) {
			await fb.visitorsCollection.doc(visitorId).delete()
			// commit("REMOVE_VISITOR", visitorId)
		},
		async visitorArrived({ state, commit }, visitor) {
			await fb.visitorsCollection.doc(visitor.id).update({
				arrived: !visitor.arrived,
			})
			// commit("ARRIVE_VISITOR", visitorId)
			commit(
				"SET_VISITORS",
				state.visitors.sort((x, y) => {
					return x.arrived - y.arrived
				})
			)
		},
	},
})
