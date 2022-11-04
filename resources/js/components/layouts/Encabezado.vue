<template>
    <header
        id="encabezado"
        class="p-3 d-flex align-items-center justify-content-end bg-white shadow-sm sticky-top"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Cerrando sesión..."
    >
        <div>
            <ul class="navbar-nav">
                <li class="nav-item dropdown-center">
                    <a
                        class="nav-link dropdown-toggle text-dark"
                        href="#"
                        id="submenusDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{ user.name }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="submenusDropdown">
                        <li>
                            <button class="dropdown-item" @click="logout()">
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import useFormularios from '../../composables/useFormularios'

export default {
    setup(){
        //Composables
        const store       = useStore()
        const { loading } =  useFormularios()

        //Methods
        const logout = async () => {
            loading.value = true
            await store.dispatch('auth/logout')
            loading.value = false
        }

        return {
            loading,
            logout,
            user: computed(() => store.state.auth.user)
        }
    }
}
</script>

<style scoped>
    .dropdown-item {
        cursor: pointer;
    }
</style>
