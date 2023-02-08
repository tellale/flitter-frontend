<template>
    <div class="container mx-auto mt-10 w-80">
      
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
  @submit.prevent = "onSubmit">
    
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
      </label>
      <input
        v-model="userForm.name"
        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Nombre de usuario"
        required>
      <p class="pt-1">Únicamente letras mayúsculas o minúsculas, sin caracteres especiales, número o el carácter.</p>
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
        required>
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">       
      </label>
      <input
        v-model="userForm.password"
        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Contraseña"
        required>
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password2">       
      </label>
      <input
        v-model="userForm.password2"
        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password2"
        type="password"
        placeholder="Confirmar contraseña"
        required>
    </div>
      
      <div class="flex items-center justify-center pt-5">
      <button
        type="submit"
        class="bg-black hover:bg-gray-500 text-base text-white font-bold w-full py-2 px-4 mb-5 rounded-full focus:outline-none focus:shadow-outline">
        Crear una cuenta
      </button>
    </div>

      <!-- <button class="bg-white hover:bg-blue-500 text-black text-base font-bold w-full py-2 px-4 mb-5 border border-black rounded-full focus:outline-none focus:shadow-outline">
        <router-link class="link" :to="{ }">Crear una cuenta</router-link> 
      </button> -->

      <router-link class="text-xs link hover:text-blue-500" :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
    
    
  </form>
</div>
  </template>
  
  <script lang="ts">
  
  import { ref } from 'vue';
 // import { useAuthStore } from '../authStore';
 // import useAuth from '@/modules/auth/composables/useAuth';
  //const authStore = useAuthStore()

  

  export default {

    setup() {

    //  const { registerUser } = useAuth()

      const userForm = ref({
        name: '',
        email: '',
        avatar: '',
        password: '',
        password2: ''
      })

      return {
        userForm,
        onSubmit: async () => {
          console.log(userForm.value)
         // const { ok, message } = await registerUser(userForm.value)

        //  console.log(ok, message )
        }
      }

    }

  }
  </script>
  
  <style>
   .link {
    text-decoration: none;
  }
  p {
    font-size: 11px;
  }
  </style>