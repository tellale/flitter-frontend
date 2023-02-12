<template>
  <button class="secondary-button" @click="userLogout">
    Cerrar sessión
  </button>
</template>

<script lang="ts">
import axios from "axios";
import { useUsersStore } from "@/store/user";
import { useRouter } from "vue-router";

export default {
  name: "userLogout",
  setup() {
    const router = useRouter();
    const userStore = useUsersStore();
    const userLogout = async () => {
      try {
        await axios.delete("api/logout");
        userStore.isAuth = false;
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    };
    return { userLogout };
  },
};
</script>
