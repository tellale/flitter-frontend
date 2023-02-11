import axios, { AxiosHeaders } from 'axios'

const authApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

// authApi.interceptors.request.use((config)=>{
//     //ACCESSING LOCALSTORAGE TOKEN 
//     const token = localStorage.getItem('token');
//     if (token){
//         (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`); //JWT
//     }
//     return config;
// });


export default authApi