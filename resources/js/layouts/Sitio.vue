<template>
    <encabezado />
    <div id="contenedor-secundario" class="container">
        <!-- <alerta
            v-if="alertaStore.ver"
            :cerrar="alertaStore.cerrar"
            :tipo="alertaStore.tipo"
            :texto="alertaStore.texto"
            @cerrar-alerta="cerrarAlertaGlobal()"
        /> -->
        <router-view></router-view>
    </div>
</template>

<script>
import Encabezado from '../components/layouts/Encabezado.vue'

export default {
    components: { Encabezado },
    setup () {
        

        return {}
    }
}
</script>