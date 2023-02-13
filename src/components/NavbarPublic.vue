<template>

<header class="header">
    
  <router-link to="/login">
  <img class="w-10 h-10" src="@/assets/image3.png"/>
  </router-link>
<!--add search-->
  <router-link to="/">
  <img class="w-10 h-10" src="@/assets/image4.png"/>
 </router-link>
 
</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarPublic",
});
</script>
<style>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
  width: 100%;
  bottom: 0;

}
</style>