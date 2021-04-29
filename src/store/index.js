import { createStore } from "vuex"

export default createStore({
	state: {
		events: [],
		volunteers: [],
	},
	mutations: {
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
			state.volunteers.push(val)
		},
		REMOVE_VOLUNTEER(state, volunteerId) {
			state.volunteers = state.volunteers.filter((vol) => vol.id != volunteerId)
		},
	},
	actions: {
		setEvents({ state, commit }, events) {
			commit("SET_EVENTS", events)
		},
		addEvent({ state, commit }, event) {
			commit("ADD_EVENT", event)
		},
		removeEvent({ state, commit }, eventId) {
			commit("REMOVE_EVENT", eventId)
		},
		setVolunteers({ state, commit }, volunteers) {
			commit("SET_VOLUNTEERS", volunteers)
		},
		addVolunteer({ state, commit }, volunteer) {
			commit("ADD_VOLUNTEER", volunteer)
		},
		removeVolunteer({ state, commit }, volunteerId) {
			commit("REMOVE_VOLUNTEER", volunteerId)
		},
	},
})
