import { defineStore } from "pinia";
import axios from "axios";
import { AuthUser } from "../interfaces/AuthUser";
import { UserRequest } from "@/interfaces/UserRequest";
import router from "@/router";

const setCookie = (name: string, value: string, days = 7) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const eraseCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    isAuthenticated: false,
    authUser: {},
  }),

  getters: {
    authUser: (state) => state.authUser,
    token: (state) => state.token,
  },

  actions: {
    async getAuthUser() {
      const data = await axios.get("/api/user");
      this.authUser = data.data;
    },
    async handleLogin(user: UserRequest) {
      try {
        const { data } = await axios.post("/api/login", {
          name: user.name,
          password: user.password,
        });
        setCookie(data.token[0], data.token[1]);
        return window.location.replace("/");
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    async handleRegister(user: AuthUser) {
      const { data } = await axios.post("/api/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        password2: user.password2,
      });
      setCookie(data.token[0], data.token[1]);
      return window.location.replace("/");
    },
    async handleLogout() {
      eraseCookie("express:sess");
      return window.location.replace("/login");
    },
    async handledeleteAccount() {
      try {
        await axios.delete("/api/user");
        eraseCookie("express:sess");
        return window.location.replace("/register");
      } catch (error) {
        console.error(error);
      }
    },
  },
});
