import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/Logout.vue')
      
    },
    {
      path: '/myworkout',
      name: 'MyWorkout',
      component: () => import('../views/MyWorkout.vue')
    },
    {
      path: '/bmicalculator',
      name: 'BMICalculator',
      component: () => import('../views/BMICalculator.vue')
    },
    {
      path: '/bmrcalculator',
      name: 'BMRCalculator',
      component: () => import('../views/BMRCalculator.vue')
    },
    {
      path: '/workoutgenerator',
      name: 'WorkoutGenerator',
      component: () => import('../views/WorkoutGenerator.vue')
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('../views/Registration.vue')
    },
    {
      path: '/addexercise',
      name: 'AddExercise',
      component: () => import('../views/AddExercise.vue')
    },
  ]
})

export default router