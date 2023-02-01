<template>
    <div class="container mx-auto mt-10 w-80">
      
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Nombre de usuario"
        required>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Contraseña"
        required>
      
      <div class="flex items-center justify-center pt-5">
      <button
        type="submit"
        class="bg-black hover:bg-gray-500 text-base text-white font-bold w-full py-2 px-4 mb-5 rounded-full focus:outline-none focus:shadow-outline">
        Entrar
      </button>
    </div>

      <button class="bg-white hover:bg-blue-500 text-black text-base font-bold w-full py-2 px-4 mb-5 border border-black rounded-full focus:outline-none focus:shadow-outline">
        <router-link class="link" :to="{ }">Crear una cuenta</router-link> 
      </button>

      <p class="text-xs">¿Olvidaste tu contraseña? <router-link class="link text-blue-500" :to="{ }">Reestablecerla</router-link> </p>
    </div>
    
  </form>
</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';

  

  export default defineComponent ({
    
  })
  </script>
  
  <style>
   .link {
    text-decoration: none;
  }
  </style>