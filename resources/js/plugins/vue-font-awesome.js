import { faCheck, faCheckCircle, faExclamationCircle,faExclamationTriangle,faInfoCircle,faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faExclamationCircle,faInfoCircle,faCheckCircle,faExclamationTriangle,faCheck,faPlus)

export default {
    install: (app) => {
        app.component('iconos', FontAwesomeIcon)
    }
}