import { createStore } from "vuex"

export default createStore({
	state: {
		events: [],
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
	},
})
