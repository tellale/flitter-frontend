<template>
  <div>
    <tweetWrite />
  </div>
</template>

<script lang="ts">
import tweetWrite from "@/components/tweetWrite.vue";

export default {
  name: "writeTweet",
  components: {
    tweetWrite,
  },
};
</script>
