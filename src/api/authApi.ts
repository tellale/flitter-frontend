import axios from 'axios'

const authApi = axios.create({
    baseURL: 'http://localhost:5000/api'
})


export default authApi