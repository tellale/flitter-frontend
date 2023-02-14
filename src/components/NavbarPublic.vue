<template>
  <header class="header">
    <button v-on:click="handleOpenModal">
      <font-awesome-icon
        icon="fa-solid fa-user"
        class="w-8 h-8 text-lightblue"
      />
    </button>
  </header>
  <div v-if="toggle" class="body-wrapper" v-on:click="handleCloseModal">
    <div class="body-modal">
      <button v-on:click="redirectLogin" class="button-base">Login</button>
      <button v-on:click="redirectRegister" class="button-base button-black">
        Register
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NavbarPublic",
  // STATE
  data() {
    return {
      toggle: false,
    };
  },
  setup() {
    const router = useRouter();

    const redirectLogin = () => router.push("/login");
    const redirectRegister = () => router.push("/register");

    return {
      redirectLogin,
      redirectRegister,
    };
  },

  // HANDLE FUNCTIONS
  methods: {
    handleOpenModal() {
      const loginRoute = window.location.pathname === "/login";
      const registerRoute = window.location.pathname === "/register";

      if (loginRoute || registerRoute) {
        window.location.replace("/");
      } else {
        this.toggle = true;
      }
    },
    handleCloseModal() {
      this.toggle = false;
    },
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
.body-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.body-modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  z-index: 2;
  bottom: 0;
  padding: 3rem 1rem 2rem 1rem;
  border-radius: 1rem 1rem 0 0;
}
.body-modal .button-base {
  position: relative;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5rem;
}
.body-modal .button-black {
  position: relative;
  border: unset;
  background-color: black;
  color: white;
}
</style>
