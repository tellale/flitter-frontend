import { defineStore } from "pinia";
import authApi from "../api/authApi";
import { User } from "../interfaces/User";
import axios from "axios";
import { AxiosResponse } from "axios"


export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        user: {
            name: '',
            email: '',
            password: ''
        }

    }),

    actions: {
        logout() {
            this.$patch((state) => {
              state.isAuthenticated = false,
              state.user = {
                    name: '',
                    email: '',
                    password: ''
              }
            })
          },
        
        async register() {
            const { data } = await authApi.get<User, AxiosResponse<User>>("/register") 
            
            console.log(data)
            this.user = data
            this.isAuthenticated = true
        },

        async login() {
            const res = await axios.post('https://localhost:5000/login')
            this.user = res.data
        }
        
    }

})
