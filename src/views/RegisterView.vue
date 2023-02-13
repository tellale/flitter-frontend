<template>
  <div class="auth-container">
    <flitterHeader />
    <form @submit.prevent="authStore.handleRegister(userForm)">
      <input
        v-model="userForm.name"
        id="username"
        type="text"
        placeholder="Nombre de usuario"
      />
      <p>
        Únicamente letras mayúsculas o minúsculas, sin caracteres especiales,
        número o el carácter.
      </p>
      <input
        v-model="userForm.email"
        id="email"
        type="email"
        placeholder="E-mail"
      />
      <input
        v-model="userForm.password"
        id="password"
        type="password"
        placeholder="Contraseña"
      />
      <input
        v-model="userForm.password2"
        id="password2"
        type="password"
        placeholder="Confirmar contraseña"
      />
      <button class="button-black" @click="onSubmit" type="submit">
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
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, alpha } from "@vuelidate/validators";
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

    const rules = computed(() => {
      return {
        name: { required, alpha },
        email: { required, email },
        password: { required },
        password2: { required, sameAs: sameAs(userForm.value.password) },
      };
    });

    const v$ = useVuelidate(rules, userForm);

    return {
      userForm,
      rules,
      v$,
      authStore,

      onSubmit: async () => {
        const result = await v$.value.$validate();

        if (result) {
          console.log("Formulario válido");
        } else {
          console.log("Error, formulario inválido");
        }
      },
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
