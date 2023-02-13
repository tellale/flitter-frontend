<template>
  <button class="secondary-button" @click="deleteUser">
    Desactivar cuenta
  </button>
</template>

<script lang="ts">
import axios from "axios";
import { useUsersStore } from "@/store/user";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

export default {
  name: "deleteUser",
  setup() {
    const store = useUsersStore();
    onBeforeMount(async () => await store.fetchAuthUser());
    const router = useRouter();
    const deleteUser = async () => {
      try {
        await axios.delete("api/users");
        store.isAuth = false;
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    };
    return { deleteUser };
  },
};
</script>
