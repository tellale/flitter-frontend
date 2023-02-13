<template>
  <router-view />
  <div class="w-full fixed bottom-3 flex justify-content-around">
    <NavbarPublic v-if="!store.isAuth" />
    <NavbarPrivate v-else />
  </div>
</template>
<script lang="ts">
import NavbarPublic from "@/components/NavbarPublic.vue";
import NavbarPrivate from "@/components/NavbarPrivate.vue";
import { useUsersStore } from "@/store/user";
import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "App",
  components: {
    NavbarPublic,
    NavbarPrivate,
  },
  setup() {
    const store = useUsersStore();
    onBeforeMount(async () => await store.fetchAuthUser());
    return {
      store,
    };
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
