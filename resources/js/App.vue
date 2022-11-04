<template>
    <div id="contenedor-principal">
        <component :is="layout" />
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import LayoutLogin from './layouts/Login.vue'
import LayoutSitio from './layouts/Sitio.vue'

export default {
    components:{
        LayoutLogin,
        LayoutSitio
    },
    setup(){
        //Composables
        const store = useStore()

        return { 
            layout: computed(() => store.state.auth.layoutActive)
        }
    }
}
</script>