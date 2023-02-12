<template>
  <div class="container">
    <div class="buttons">
      <img class="mb-20 mx-auto w-8 h-8" src="@/assets/logo_fitter_1.png" />
      <router-link to="/profile">
      <button class="secondary-button">Perfil</button>
      </router-link>
      <deleteUser />
      <userLogout />
    </div>
  </div>
</template>

<script lang="ts">
import deleteUser from "@/components/deleteUser.vue";
import userLogout from "@/components/userLogout.vue";

export default {
  name: "ExitView",
  components: { deleteUser, userLogout },
};
</script>

<style>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.secondary-button {
  width: 250px;
  background-color: white;
  border: 1px solid #687684;
  color: black;
  font-weight: bold;
  font-size: 16px;
  border-radius: 25px;
  padding: 10px 20px;
  margin-bottom: 10px;
}

.secondary-button:hover {
  background-color: black;
  color: white;
}
</style>
