/* eslint-disable */
<template>
  <div id="app" class="flex h-screen w-full">
    <!-- Tweets -->
    <div class="w-full h-full overflow-y-scroll static">
      <flitterHeader />
      <tweetGet />
      <div class="fixed bottom-3 right-14">
        <button @click="click">
          <font-awesome-icon
            icon="fa-solid fa-plus"
            class="text-white bg-lightblue rounded-full text-lg p-4"
          />
        </button>
             
      </div>
      <div class="w-full fixed bottom-3 flex justify-content-around">
          <NavbarPublic v-if="!isAuth" />
    <NavbarPrivate v-else />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import tweetGet from "@/components/tweetGet.vue";
import NavbarPublic from "@/components/NavbarPublic.vue";
import NavbarPrivate from "@/components/NavbarPrivate.vue";
import flitterHeader from "@/components/flitterHeader.vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "@/store/user";
import { useTweetsStore } from "../store/index";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "HomeView",
  components: {
    tweetGet,
    flitterHeader,
    NavbarPublic,
    NavbarPrivate,
  },
  setup() {
    const store = useTweetsStore();
    const userStore = useUsersStore();
    onMounted(() => {
      store.fetchTweets();
    });

    const isAuth = () => {
      return userStore.isAuth;
    };

    const router = useRouter();
    const click = () => {
      router.push({
        path: "/write-tweet",
      });
    };

    return {
      click,
      isAuth
    };
  },
};
</script>
