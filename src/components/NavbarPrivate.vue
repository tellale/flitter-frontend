<template>
  <header class="header">
    <router-link to="/">
      <img class="w-10 h-10" src="@/assets/image2.png" />
    </router-link>
    <img
      v-on:click="handleRedirectSelector"
      class="avatar-img"
      :src="store.authUser.avatar"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "@/store/user";
import { onBeforeMount } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NavbarPrivate",
  setup() {
    // STATES
    const store = useUsersStore();
    const router = useRouter();

    // LIFECYLE
    onBeforeMount(async () => await store.fetchAuthUser());

    // HANDLE FUNCTIONS
    const handleRedirectSelector = () => {
      return router.push("/dashboard");
    };
    return {
      store,
      handleRedirectSelector,
    };
  },
});
</script>
<style>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  background-color: white;
  padding: 1rem;
  width: 100%;
  bottom: 0;
}
.avatar-img {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
}
</style>
