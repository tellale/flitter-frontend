<template>
    <div class="flex-none mr-4">
        <img :src='avatar' class="h-16 w-16 rounded-full flex-none">
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
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useTweetsStore } from '@/store';
import Tweet from '@/interfaces/Tweets';
import moment from 'moment'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "tweetCard",
    props: {
        tweet:{
            type: Object as PropType<Tweet>,
            required: true,
        },
        avatar:{
            type: Object as PropType<string | undefined>,
            required: true,
        }
    },
    setup() {
        const isAuth = ref(true);
        const tweetsStore = useTweetsStore();
        const router = useRouter()

        const addLike = async (tweetId: number) => {
            tweetsStore.likeTweet(tweetId) 
        };

        const timeAgoDate = (date: Date) => {
            return moment(date).fromNow()
        }

        const visitUserProfile = (name:string) => {
            router.push({
                path: `/profile/${name}`
            })
        }

        return{
        isAuth,
        addLike,
        timeAgoDate,
        visitUserProfile,
        }
    }
})
</script>
