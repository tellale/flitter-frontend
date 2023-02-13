<template>
  <div class="auth-container">
    <flitterHeader />
    <form @submit.prevent="authStore.handleLogin(userForm)">
      <input
        v-model="userForm.name"
        id="username"
        type="text"
        placeholder="Nombre de usuario"
        required
      />
      <input
        v-model="userForm.password"
        id="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <button type="submit" class="button-black">Entrar</button>
      <button>
        <router-link :to="{ name: 'register' }">Crear una cuenta</router-link>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import flitterHeader from "@/components/flitterHeader.vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

export default defineComponent({
  name: "LoginView",
  components: {
    flitterHeader,
  },

  setup() {
    const userForm = ref({
      name: "",
      password: "",
    });

    return {
      userForm,
      authStore,
    };
  },
});
</script>

<style>
.auth-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.auth-container form {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.auth-container input {
  position: relative;
  margin: 1rem 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  background-color: #eee;
  border-radius: 2rem;
  width: calc(100% - 6rem);
}
.auth-container input:last-of-type {
  margin-bottom: 4rem;
}
.auth-container button {
  position: relative;
  padding: 1rem;
  margin: 1rem 2rem;
  border: 1px solid #ddd;
  border-radius: 5rem;
  width: calc(100% - 6rem);
}
.auth-container .button-black {
  position: relative;
  border: unset;
  background-color: black;
  color: white;
}
</style>
