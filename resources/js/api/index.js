import axios from 'axios'
import router from '../router'

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://talently.test/api'
})

export default api 