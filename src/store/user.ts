import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore('users', {
    
    state: () => ({
        users: [] as User[],
        isLoading: false,
        user: undefined as User | undefined,
    }),
    getters: {
        getUsers(state) {
            return state.users;
        },
        getIsLoading(state){
            return state.isLoading;
        },
        getUser(state){
            return state.user;
        },
        getUserId(state){
            return state.user?._id;
        }
    },
    actions: {
        async fetchUsers() {
            try {
                this.isLoading = true;
                const data = await axios.get('http://localHost:3000/api/users');
                this.isLoading = false;
                this.users = data.data
            } catch(err) {
                alert(err)
                console.log(err)
            }
        },

        async fetchUser(user: string) {
            try {
                this.isLoading = true;
                const { data } = await axios.get(`http://localHost:3000/api/user/${user}`);
                console.log(data.user)
                this.isLoading = false;
                this.user = data.user
            } catch(err) {
                alert(err)
                console.log(err)
            }
        },
        async followOrUnfollowAUser(user: string) {
            try {
                const { data } = await axios.put(`http://localHost:3000/api/user/follow/${user}`);
                console.log(data)
            } catch(err) {
                alert("Error 403: No puedes seguir a un miembro sin estar logeado")
                console.log(err)
            }
        },
    },
})

interface User {
    _id: number,
    name: string, 
    email: string,
    avatar: string,
    passwordHash: string,
    followers: [],
    following: [],
    date: Date
}