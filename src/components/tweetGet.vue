<template>
  <div
    v-for="tweet in tweets"
    :key="tweet._id"
    class="w-full p-4 border-b hover:bg-ligther flex"
  >
    <div class="flex-none mr-4">
      <img src="https://i.pravatar.cc/300" class="h-16 w-16 rounded-full flex-none">
    </div>
    <div class="w-full">
      <div class="flex flex-wrap items-center text-left w-full">
        <p class="font-semibold">{{ tweet.postedBy.name }}</p>
        <p
          class="text-sm text-lightblue ml-2"
          v-for="tag in tweet.tags"
          :key="tag"
        >
          {{ tag }}
        </p>
      </div>
      <p class="text-left py-3">{{ tweet.text }}</p>

        <div class="flex items-center place-content-end text-md px-4 text-grey">
            <div class="mr-10">
                <button v-show="isAuth" class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue">
                    Seguir
                </button>
            </div>
            <button v-show="isAuth" @click="addLike(tweet._id)" class="flex items-center place-content-end hover:text-lightblue">
                <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
                <p>{{ tweet.likes.length }}</p>
            </button>
            <div v-show="!isAuth" class="flex items-center place-content-end">
                <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
                <p>{{ tweet.likes.length }}</p>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useTweetsStore } from "../store/index";

export default {
  name: "tweetGet",
  setup() {
    const store = useTweetsStore();

    const isAuth = ref(true)

    // const getTweets = computed(() => {
    //     return store.getTweets;
    //     })

    const tweets = computed(() => {
      return store.tweets;
    });

    // onMounted(() => {
    //   store.fetchTweets();
    // });

    const addLike = async (tweetId: number) => {
        store.likeTweet(tweetId) 
    } 

    return {
      //getTweets,
      tweets,
      addLike,
      isAuth
    };
  },
};
</script>
