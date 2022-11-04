require('./bootstrap');

import { createApp } from 'vue'
import App from './App.vue'

//Router
import Router from './router'

//Store
import Store from './store'

//Plugins
import ElementPlus from './plugins/element-ui-plus'
import Iconos from './plugins/vue-font-awesome'
import PriveVue from './plugins/prime-vue'

//Componentes globales
import Alerta from './components/common/Alerta.vue'
import Card from './components/common/Card.vue'
import ErroresFormulario from './components/common/ErroresFormulario.vue'
import Modal from './components/common/Modal.vue'
import Spinner from './components/common/Spinner.vue'

const app = createApp(App)

app.use(Router)
app.use(Store)
app.use(ElementPlus)
app.use(Iconos)
app.use(PriveVue)

app.component('Alerta', Alerta)
app.component('Card', Card)
app.component('ErroresFormulario', ErroresFormulario)
app.component('Modal',Modal)
app.component('Spinner',Spinner)

app.mount('#app')
