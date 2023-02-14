<template>
  <div class="auth-container">
    <flitterHeader />
    <form @submit.prevent="authStore.handleRegister(userForm)" id="form">
      <input
        v-model.trim="userForm.name"
        id="username"
        type="text"
        placeholder="Nombre de usuario"
        name="letras"
        required
        pattern="[a-zA-Z]+"
      />
      <p>
        Únicamente letras mayúsculas o minúsculas, sin caracteres especiales,
        número o el carácter.
      </p>
      <input
        v-model.trim="userForm.email"
        id="email"
        type="email"
        placeholder="E-mail"
        required
      />
      <input
        v-model.trim="userForm.password"
        id="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <input
        v-model.trim="userForm.password2"
        id="password2"
        type="password"
        placeholder="Confirmar contraseña"
        required
      />
      <button class="button-black" type="submit">
        Crear una cuenta
      </button>
      <button>
        <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import flitterHeader from "@/components/flitterHeader.vue";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

export default {
  name: "RegisterView",
  components: {
    flitterHeader,
  },

  setup() {
    const userForm = ref({
      name: "",
      email: "",
      password: "",
      password2: "",
    });

    
    return {
      userForm,
      authStore,

    };
  },
};
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
.auth-container p {
  font-size: 0.7rem;
  width: calc(100% - 6rem);
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
