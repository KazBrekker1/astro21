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
			console.log(val)
		},
	},
	actions: {
		setEvents({ state, commit }, events) {
			commit("SET_EVENTS", events)
		},
		addEvent({ state, commit }, event) {
			commit("ADD_EVENT", event)
		},
	},
})
