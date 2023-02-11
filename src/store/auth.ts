import { defineStore } from "pinia";
import authApi from "../api/authApi";
import { User } from "../interfaces/User";
import { UserRequest } from "@/interfaces/UserRequest";
import router from "@/router";
import { Token } from "@/interfaces/Token";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null,
        isAuthenticated: false,
        authUser: null

    }),

    getters: {
        authUser: (state) => state.authUser,
        token: (state) => state.token
    },

    actions: {

        // async getToken() {

        // },

        async getAuthUser () {
          // await this.getToken()
          const data = await authApi.get('/user')
          this.authUser = data.data
        },

        async handleLogin (user: UserRequest) {
          try {
            //await this.getToken()
            const data = await authApi.post('/login', {
              name: user.name,
              password: user.password
            })
            localStorage.setItem('token', data.data.jwt)
            router.push({ name: "home" })
          } catch (error: any) {
              console.error(error.message)
              alert('401 Unauthorized user')
          }
          
        },
        
        async handleRegister (user: User) {
        //await this.getToken()
          await authApi.post('/register', {
            name: user.name,
            email: user.email,
            password: user.password,
            password2: user.password2
          })
          router.push({ name: "home" })
        },

          handleLogout () {
            this.authUser = null
            localStorage.removeItem('token')
            router.push({ name: "login" });
      }

        
    }

})
