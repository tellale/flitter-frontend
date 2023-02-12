<template>
  <!-- AÑADIDO PARA EL CAMBIO DE ORDEN  -->
    <i @click="reverseOrder()">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
    </svg>
  </i>
  <div
    v-for="tweet in tweets"
    :key="tweet._id"
    class="w-full p-4 border-b hover:bg-ligther flex"
  >
    <div class="flex-none mr-4">
      <img
        :src="tweet.postedBy.avatar"
        class="h-16 w-16 rounded-full flex-none"
      />
    </div>
    <div class="w-full">
      <div class="flex flex-wrap items-center text-left w-full">
        <button @click="visitUserProfile(tweet.postedBy.name)">
          <p class="font-semibold">{{ tweet.postedBy.name }}</p>
        </button>
        <p
          class="text-sm text-lightblue ml-2"
          v-for="tag in tweet.tags"
          :key="tag"
        >
          {{ tag }}
        </p>
        <p class="text-grey text-sm ml-1">· {{ timeAgoDate(tweet.updatedAt) }}</p>
      </div>
      <p class="text-left py-3">{{ tweet.text }}</p>

      <div class="flex items-center place-content-end text-md px-4 text-grey">
        <div class="mr-10">
          <button
            v-show="isAuth"
            class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
          >
            Seguir
          </button>
        </div>
        <button
          v-show="isAuth"
          @click="addLike(tweet._id)"
          class="flex items-center place-content-end hover:text-lightblue"
        >
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
import moment from 'moment'
import { useRouter } from 'vue-router'
import Tweet from '@/interfaces/Tweets';

export default {
  name: "tweetGet",
  setup() {
    const store = useTweetsStore();

    const isAuth = ref(true)
    const router = useRouter()

    //AÑADIDO PARA EL CAMBIO DE ORDEN 
    let tweets = ref<Tweet[]>([]);
    fetchData();
    async function fetchData() {
        await store.fetchTweets();
        tweets.value = store.tweets;
    }

    const addLike = async (tweetId: number) => {
        store.likeTweet(tweetId) 
    }

    //AÑADIDO PARA EL CAMBIO DE ORDEN 
    const reverseOrder = () => {
      store.reverseTweets();
      tweets.value = store.tweets;
    };
    
    const timeAgoDate = (date: Date) => {
      return moment(date).fromNow()
    }

    const visitUserProfile = (name:string) => {
            router.push({
                path: `/:${name}`
            })
        }

    return {
      //getTweets,
      tweets,
      addLike,
      timeAgoDate,
      visitUserProfile,
      isAuth,
      //AÑADIDO PARA EL CAMBIO DE ORDEN 
      reverseOrder
    };
  },
};
</script>
