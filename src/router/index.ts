import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(), // Change to createWebHistory()
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');  // Verificar si está autenticado
  const isAdmin = localStorage.getItem('is_superuser') === 'true' || localStorage.getItem('is_staff') === 'true';  // Verificar si es admin

  // Si la ruta requiere autenticación y no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'home' });  // Redirigir al home si no está autenticado
  }
  // Verificar si la ruta requiere permisos de administrador
  else if (to.meta.isAdmin && !isAdmin) {
    next({ name: 'home' });  // Redirigir al home si no es administrador
  } 
  else {
    next();  // Continuar a la ruta solicitada si todo está bien
  }
});

export default router
