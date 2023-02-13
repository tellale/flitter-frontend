import { defineStore } from "pinia";
import axios from "axios";
import User from "@/interfaces/Users";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    user: undefined as User | undefined,
    isAuth: false,
    authUser: {} as User
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getUser(state) {
      return state.user;
    },
    getUserId(state) {
      return state.user?._id;
    },
  },
  actions: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const data = await axios.get("/api/users");
        this.isLoading = false;
        this.users = data.data;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchAuthUser() {
      try {
        this.isLoading = true;
        const { data } = await axios.get(`/api/user`);
        this.isLoading = false;

        if (data?.user) {
          this.isAuth = true
          this.authUser = data?.user
          console.log(this.authUser)
        }
        return data?.user ?? {};
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUser(user: string) {
      try {
        this.isLoading = true;
        const { data } = await axios.get(`/api/user/${user}`);
        this.isLoading = false;
        this.user = data.user;
      } catch (err) {
        console.log(err);
      }
    },
    
    async followOrUnfollowAUser(user: string) {
      try {
        const { data } = await axios.put(`/api/user/follow/${user}`);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },

    amIFollowing(){
      for (let i = 0; i < this.authUser.following.length; i++) {
        if(this.authUser.following[i] == this.user?._id){
          return true;
        }else{
          return false;
        }
      }
    }
  },
});
