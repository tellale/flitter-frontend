<template>
  <button class="secondary-button" @click="deleteUser">
    Desactivar cuenta
  </button>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/auth";

export default {
  name: "deleteUser",
  setup() {
    const store = useAuthStore();
    const deleteUser = async () => store.handledeleteAccount();
    return { deleteUser };
  },
};
</script>
