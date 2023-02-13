<template>
  <button class="secondary-button" @click="userLogout">
    Cerrar sessión
  </button>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/auth";

export default {
  name: "userLogout",
  setup() {
    const authStore = useAuthStore()
    const userLogout = () => {
      try {
        authStore.handleLogout()
      } catch (error) {
        console.error(error);
      }
    };
    return { userLogout };
  },
};
</script>
