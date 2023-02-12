<template>
            <div class="flex-none mr-4">
              <img :src='avatar' class="h-16 w-16 rounded-full flex-none">
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
                <p class="text-sm text-lightblue ml-2">{{ tweet.updatedAt }}</p>
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

export default defineComponent({
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
        
        const addLike = async (tweetId: number) => {
            tweetsStore.likeTweet(tweetId) 
        } 

        return{
        isAuth,
        addLike
        }
    }
})
</script>
