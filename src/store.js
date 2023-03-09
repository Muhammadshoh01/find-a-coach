import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			coaches: [
				{
					id: 'c1',
					name: 'Maximilian Schwarzmüller',
					description:
						"I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
					price: 30,
					badges: ['frontend', 'backend', 'career'],
				},
				{
					id: 'c2',
					name: 'Julie Jones',
					description:
						'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
					price: 30,
					badges: ['frontend', 'career'],
				},
			],
			userId: 'c3',
			userIsCoach: false,
			requests: [],
		}
	},
	mutations: {
		userCoach(state) {
			state.userIsCoach = true
		},
		contactCoach(state, payload) {
			state.requests.push(payload)
		},
		setCoaches(state, payload) {
			state.coaches = payload
		},
		registrCoach(state, payload) {
			state.coaches.push(payload)
		},
		setRequests(state, payload) {
			console.log(payload)
			state.requests = payload
		},
	},
	getters: {
		coaches(state) {
			return state.coaches
		},
		hasCoaches(state) {
			return state.coaches && state.coaches.length > 0
		},
		userIsCoach(state, getters) {
			return getters.coaches.some((coach) => coach.id === state.userId)
		},
		requests(state) {
			return state.requests.filter(
				(request) => request.coachId === state.userId
			)
		},
		hasRequests(_, getters) {
			return getters.requests && getters.requests.length > 0
		},
		userId(state) {
			return state.userId
		},
	},
	actions: {
		async contactCoach(context, payload) {
			const request = {
				message: payload.message,
				userEmail: payload.email,
			}

			const response = await fetch(
				`https://coach-finder-592aa-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
				{
					method: 'POST',
					body: JSON.stringify(request),
				}
			)
			const responseData = await response.json()
			request.id = responseData.name
			request.coachId = payload.coachId

			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch')
				throw error
			}
			context.commit('contactCoach', request)
		},
		async fetchRequest(context, _) {
			const userId = context.getters.userId
			const response = await fetch(
				`https://coach-finder-592aa-default-rtdb.firebaseio.com/requests/${userId}.json`
			)
			const responseData = await response.json()

			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch')
				throw error
			}
			const requests = []

			for (const key in responseData) {
				const request = {
					id: key,
					coachId: userId,
					message: responseData[key].message,
					userEmail: responseData[key].userEmail,
				}
				requests.push(request)
			}
			context.commit('setRequests', requests)
		},
		async addCoach(context, payload) {
			const userId = context.getters.userId
			const coachData = {
				name: payload.fullName,
				description: payload.description,
				price: payload.rate,
				badges: payload.badges,
			}

			const response = await fetch(
				`https://coach-finder-592aa-default-rtdb.firebaseio.com/coaches/${userId}.json`,
				{
					method: 'PUT',
					body: JSON.stringify(coachData),
				}
			)
			if (!response.ok) {
				// error
			}
			context.commit('registrCoach', { ...coachData, id: state.userId })
		},
		async setCoach(context, _) {
			const response = await fetch(
				`https://coach-finder-592aa-default-rtdb.firebaseio.com/coaches.json`
			)

			const responseData = await response.json()

			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch')
				throw error
			}

			const coaches = []

			for (const key in responseData) {
				const coach = {
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
					badges: responseData[key].badges,
				}
				coaches.push(coach)
			}
			context.commit('setCoaches', coaches)
		},
	},
})

export default store
