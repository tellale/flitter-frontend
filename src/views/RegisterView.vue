<template>
  <div class="container-flex container mx-auto mt-10 w-80">
    <flitterHeader />
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit.prevent="authStore.handleRegister(userForm)"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
        </label>
        <input
          v-model="userForm.name"
          class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Nombre de usuario"
        />
        <span v-for="error in v$.name.$errors" :key="error.$uid">{{
          error.$message
        }}</span>
        <p class="pt-1">
          Únicamente letras mayúsculas o minúsculas, sin caracteres especiales,
          número o el carácter.
        </p>
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        </label>
        <input
          v-model="userForm.email"
          class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="E-mail"
        />
        <span v-for="error in v$.email.$errors" :key="error.$uid">{{
          error.$message
        }}</span>
      </div>

      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
        </label>
        <input
          v-model="userForm.password"
          class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Contraseña"
        />
        <span v-for="error in v$.password.$errors" :key="error.$uid">{{
          error.$message
        }}</span>
      </div>

      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password2"
        >
        </label>
        <input
          v-model="userForm.password2"
          class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password2"
          type="password"
          placeholder="Confirmar contraseña"
        />
        <span v-for="error in v$.password2.$errors" :key="error.$uid">{{
          error.$message
        }}</span>
      </div>

      <div class="flex items-center justify-center pt-5">
        <button
          @click="onSubmit"
          type="submit"
          class="bg-black hover:bg-gray-500 text-base text-white font-bold w-full py-2 px-4 mb-5 rounded-full focus:outline-none focus:shadow-outline"
        >
          Crear una cuenta
        </button>
      </div>

      <router-link
        class="text-xs link hover:text-blue-500"
        :to="{ name: 'login' }"
        >¿Ya tienes cuenta?</router-link
      >
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
.container-flex {
  flex-direction: column;
}
.link {
  text-decoration: none;
}
p {
  font-size: 11px;
}
</style>
