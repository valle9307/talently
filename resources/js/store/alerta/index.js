const alertaStore = {
    namespaced: true,
    state: () => ({
        alertaGlobal: {
            cerrar: true,
            texto: null,
            tipo: null,
            ver: false
        }
    }),
    mutations:{
        VALORES_ALERTA(state,valores){
            state.alertaGlobal = valores
        },
        RESETEAR_ALERTA(state) {
            state.alertaGlobal = {
                cerrar: true,
                texto: null,
                tipo: null,
                ver: false
            }
        }
    }
}

export default alertaStore
