<template>
  <div class="search-bar">
    <input @input="handleChange" placeholder="&#x1F50E;  Search tweets here" />
  </div>
</template>
<script lang="ts">
import { useTweetsStore } from "@/store/index";

export default {
  name: "searchBar",
  setup() {
    const store = useTweetsStore();

    const handleChange = (e: any) => {
      store.$patch({
        ...store,
        filters: { ...store.filters, search: e.target.value },
      });
      return store.fetchTweets();
    };
    return {
      handleChange,
    };
  },
};
</script>
<style scoped>
.search-bar {
  position: sticky;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #eee;
  top: 0;
}
.search-bar img {
  position: absolute;
  z-index: 1;
  margin: 1rem;
  left: calc(50% - 2rem);
}
.search-bar input {
  position: relative;
  margin: 1rem 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
  background-color: #eee;
  border-radius: 2rem;
  width: calc(100% - 4rem);
}
</style>
