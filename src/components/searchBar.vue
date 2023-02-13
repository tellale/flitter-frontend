<template>
  <div>
    <input @input="onInput" />
  </div>
</template>
<script lang="ts">
export default {
  name: "searchBar",
  methods: {
    onInput(e: any) {
      console.log(e);
    },
  },
};
</script>
<style scoped>
input {
  width: 75%;
}
div {
  text-align: center;
  margin: 20px;
}
</style>
