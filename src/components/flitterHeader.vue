<template>
  <div class="header-base pt-5 px-8 pb-3 border-b border-lighter">
    <img class="mx-auto w-6 h-6" src="@/assets/logo_fitter_1.png" v-on:click="handleRedirectSelector" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "flitterHeader",
  setup() {
    // STATES
    const router = useRouter();

    // HANDLE FUNCTIONS
    const handleRedirectSelector = () => {
      return router.push("/");
    };
    return {
      handleRedirectSelector,
    };
  },
});
</script>
<style>
.header-base {
  width: 100%;
}
img { 
  cursor: pointer; 
}
</style>
