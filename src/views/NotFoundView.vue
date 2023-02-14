<template>
    <div>
        <flitterHeader />
        <h1>Error 404: Page not found</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import flitterHeader from "@/components/flitterHeader.vue";

export default defineComponent({
    name: "NotFoundView",
    components: {
    flitterHeader
  }
})
</script>
