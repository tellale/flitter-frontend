<template>

<header class="flex justify-between block fixed bottom-5 inset-x-3 z-50 ">
    
  <router-link to="/profile">
  <img class="w-10 h-10" src="@/assets/image2.png"/>
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
