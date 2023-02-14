<template>
  <div
    v-for="tweet in tweets"
    :key="tweet._id"
    class="w-full p-4 border-b hover:bg-ligther flex"
  >
    <div class="flex-none mr-4">
      <img
        :src="tweet?.postedBy?.avatar"
        class="h-16 w-16 rounded-full flex-none"
      />
    </div>
    <div class="w-full">
      <div class="flex flex-wrap items-center text-left w-full">
        <button @click="visitUserProfile(tweet?.postedBy?.name)">
          <p class="font-semibold">{{ tweet?.postedBy?.name }}</p>
        </button>
        <p
          class="text-sm text-lightblue ml-2"
          v-for="tag in tweet.tags"
          :key="tag"
        >
          {{ tag }}
        </p>
        <p class="text-grey text-sm ml-1">
          · {{ timeAgoDate(tweet?.updatedAt) }}
        </p>
        <button
          v-show="isAuth"
          v-if="userName === tweet?.postedBy?.name"
          @click="deleteTweet(tweet._id)"
          class="p-1 text-sm text-darkblue hover:text-grey"
        >
          <p>· Delete</p>
        </button>
      </div>
      <p class="text-left py-3">{{ tweet?.text }}</p>

      <div class="flex items-center place-content-end text-md px-4 text-grey">
        <button
          v-show="isAuth"
          @click="addLike(tweet._id)"
          class="flex items-center place-content-end hover:text-lightblue"
        >
          <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
          <p>{{ tweet?.likes?.length }}</p>
        </button>
        <div v-show="!isAuth" class="flex items-center place-content-end">
          <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
          <p>{{ tweet?.likes?.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useTweetsStore } from "../store/index";
import { useUsersStore } from "@/store/user";
import moment from "moment";
import { useRouter } from "vue-router";

export default {
  name: "tweetGet",
  setup() {
    const store = useTweetsStore();
    const userStore = useUsersStore();
    const isAuth = ref(true);
    const router = useRouter();

    const tweets = computed(() => {
      return store.tweets;
    });

    const userName = computed(() => {
      return userStore.authUser.name;
    });

    const addLike = async (tweetId: number) => {
      store.likeTweet(tweetId);
    };

    const timeAgoDate = (date: Date) => {
      return moment(date).fromNow();
    };

    const visitUserProfile = (name: string) => {
      router.push({
        path: `/profile/${name}`,
      });
    };

    const deleteTweet = (tweetId: number) => {
      store.deleteTweet(tweetId);
    };

    return {
      userName,
      tweets,
      addLike,
      timeAgoDate,
      visitUserProfile,
      isAuth,
      deleteTweet,
    };
  },
};
</script>
