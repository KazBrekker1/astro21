import { createStore } from "vuex"

export default createStore({
	state: {
		events: [],
		volunteers: [],
		visitors: [],
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
		setVisitors({ state, commit }, visitors) {
			commit("SET_VISITORS", visitors)
			commit(
				"SET_VISITORS",
				state.visitors.sort((x, y) => {
					return x.arrived - y.arrived
				})
			)
		},
		addVisitor({ state, commit }, visitor) {
			commit("ADD_VISITOR", visitor)
			commit(
				"SET_VISITORS",
				state.visitors.sort((x, y) => {
					return x.arrived - y.arrived
				})
			)
		},
		removeVisitor({ state, commit }, visitorId) {
			commit("REMOVE_VISITOR", visitorId)
		},
		visitorArrived({ state, commit }, visitorId) {
			commit("ARRIVE_VISITOR", visitorId)
			commit(
				"SET_VISITORS",
				state.visitors.sort((x, y) => {
					return x.arrived - y.arrived
				})
			)
		},
	},
})
