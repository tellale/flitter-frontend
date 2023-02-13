/* eslint-disable */
<template>
  <div id="app" class="flex h-screen w-full">
    <!-- Tweets -->
    <div class="w-full h-full overflow-y-scroll static p-4">
      <flitterHeader/>
      <tweetGet
        v-for="tweet in tweets"
        :key="tweet._id"
        :tweet="tweet"
        class="w-full p-4 border-b hover:bg-ligther flex"/>
      <div class="flex items-center justify-center">
        <button class="text-lightblue p-2 border rounded-full mx-3 mt-3 hover:bg-lightblue hover:text-white" @click="previousPage">Anterior</button>
        <ul>
          <li v-for="page in totalPages" :key="page">
            <button >{{ page }}</button>
          </li>
        </ul>
        <button class="text-lightblue p-2 border rounded-full mx-3 mt-3 hover:bg-lightblue hover:text-white" @click="newPage">Siguiente</button>
      </div>    
      
      <div v-if="userStore.isAuth" class="fixed z-10 bottom-20 right-5">
        <button @click="click">
          <font-awesome-icon
            icon="fa-solid fa-plus"
            class="text-white bg-lightblue rounded-full text-lg p-4"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import tweetGet from "@/components/tweetGet.vue";

import flitterHeader from "@/components/flitterHeader.vue";
import { useRouter } from "vue-router";
import { useTweetsStore } from "../store/index";
import { onMounted, onBeforeMount } from '@vue/runtime-core';
import { ref, computed } from "vue";
import { useUsersStore } from '../store/user'




export default {
  name: "HomeView",
  components: {
    tweetGet,
    flitterHeader,
  },
  setup() {
    const store = useTweetsStore()
    const state = ref({page: 0, limit: 10})
    const userStore = useUsersStore();

    onBeforeMount(async() => await userStore.fetchAuthUser())
    
    onMounted(() => {
      console.log('data mounted');
      store.fetchTweets(state.value)
    })

    const tweets = computed(() => {
      return store.tweets;
    });
    
    const router = useRouter()
    const click = () => {
      router.push({
        path: '/write-tweet'
      })
    }
    
    let totalPages = () => {
      return Math.ceil(state.value.limit / store.getTweetsLength)
    }

    //missing the function to go to the page you click. 

    
    const newPage = () => {
      state.value.page ++
      return store.fetchTweets(state.value)
    }

    const previousPage = () => {
      if (state.value.page !== 0) {
        state.value.page --
      return store.fetchTweets(state.value)
      }
    }


    return {
      userStore,
      click,
      tweets,
      newPage,
      previousPage,
      totalPages, 
    }
  },
}
</script>
