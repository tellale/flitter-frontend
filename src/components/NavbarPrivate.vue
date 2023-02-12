<template>
  <header class="flex justify-between block fixed bottom-5 inset-x-3 z-50 ">
    
        <router-link to="/">
        <img class="w-10 h-10" src="@/assets/image2.png"/>
        </router-link>
<!--add search-->
        <router-link to="/">
        <img class="w-10 h-10" src="@/assets/image4.png"/>
       </router-link>

       <router-link to="/exit">
        <img class="w-8 h-10" src="@/assets/image1.png"/>
      </router-link>
   
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarPrivate",
});
</script>
<style>
 

</style>
