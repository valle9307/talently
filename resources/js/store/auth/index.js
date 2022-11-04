import api from '../../api'
import router from '../../router'

const authStore = {
    namespaced: true,
    state: () => ({
        erroresLogin: {},
        layoutActive: 'layout-login',
        user: null
    }),
    actions:{
        async login({ commit }, user) {
           try {
                await api.get('/auth/sanctum/csrf-cookie')
                let { data } = await api.post('/auth/login', user)

                commit('CURRENT_USER', (data.user || data))
                commit('LAYOUT_ACTIVE', 'layout-sitio')

                router.push('/dashboard')
           } catch (error) {
                let { errors } = error.response.data

                commit('ERRORES_LOGIN', errors)
           }
        },
        async logout({ commit }) {
            try {
                await api.post('/auth/logout')

                commit('CURRENT_USER', null)
                commit('LAYOUT_ACTIVE', 'layout-login')
                
                router.push('/login')
           } catch (error) {
                let { errors } = error.response.data

                commit('ERRORES_LOGIN', errors)
           }
        }
    },
    mutations:{
        CURRENT_USER(state,user) {
            state.user = user
        },
        ERRORES_LOGIN(state, errores) {
            state.erroresLogin = errores
        },
        LAYOUT_ACTIVE(state, layout) {
            state.layoutActive = layout
        }
    }
}

export default authStore