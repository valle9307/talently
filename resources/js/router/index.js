import { createRouter,createWebHistory } from 'vue-router'
import Store from '../store'

const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta:{
            title: 'Login',
            auth: false
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
        meta:{
            title: 'Dashboard',
            auth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    let { title }   = to.meta

    document.title = title
    
     if (to.matched.some(record => record.meta.auth)) {
        if (!Store.state.auth.user) {
            next({ path:'/login' });
        } else {
            next();
        }
    } else if (to.matched.some(record => !record.meta.auth)){
        if (!Store.state.auth.user) {
            next();
        } else {
            document.title = title;
            next({ path:'/dashboard' });
        }
    }
    
})

export default router