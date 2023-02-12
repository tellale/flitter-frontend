<template>
  <button class="secondary-button" @click="deleteUser">
    Desactivar cuenta
  </button>
</template>

<script lang="ts">
import axios from "axios";
import { useUsersStore } from "@/store/user";
import { useRouter } from "vue-router";

export default {
  name: "deleteUser",
  setup() {
    const router = useRouter();
    const userStore = useUsersStore();
    const deleteUser = async () => {
      try {
        await axios.delete("api/users");
        userStore.isAuth = false;
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    };
    return { deleteUser };
  },
};
</script>
