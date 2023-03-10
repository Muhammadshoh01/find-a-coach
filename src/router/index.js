import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '../views/coaches/CoachesList.vue'
import CoachDetails from '../views/coaches/CoachDetails.vue'
import CoachRegistration from '../views/coaches/CoachRegistration.vue'
import ContactCoach from '../views/requests/ContactCoach.vue'
import RequestsReceived from '../views/requests/RequestsReceived.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/coaches',
		},
		{
			path: '/coaches',
			component: CoachesList,
		},
		{
			path: '/coaches/:id',
			component: CoachDetails,
			props: true,
			children: [
				{
					path: 'contact',
					component: ContactCoach,
				},
			],
		},
		{
			path: '/registr',
			component: CoachRegistration,
		},
		{
			path: '/requests',
			component: RequestsReceived,
		},
		{
			path: '/:NotFound(.*)',
			component: NotFound,
		},
	],
})

export default router
