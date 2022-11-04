import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

//Modules
import alertaStore from './alerta'
import authStore from './auth'
import taskStore from './task'

const store = createStore({
    plugins: [createPersistedState()],
    modules:{
        alerta: alertaStore,
        auth: authStore,
        task: taskStore
    }
})

export default store