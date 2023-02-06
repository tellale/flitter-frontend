<template>
        <div v-for="tweet in getTweets" :key="tweet._id" class="w-full p-4 border-b hover:bg-ligther flex">
            <div class="flex-none mr-4">
                <img src="`${}`" class="h-12 w-12 rounded-full flex-none">
            </div>
            <div class="w-full">
                <div class="flex items-center w-full">
                    <p class="font-semibold">{{ tweet.postedBy }}</p>
                    <!-- <p class="text-sm text-dark ml-2">{{ follow.handle }}</p>-->
                    <p class="text-sm text-dark ml-2">{{ tweet.tags }}</p>
                </div>
                <p class="py-3">{{ tweet.text }}</p>
                <div class="flex items-center justify-between w-full">
                    <div class="flex items-center text-sm text-dark">
                        <font-awesome-icon icon="fa-regular fa-comment" class="mr-3" />
                    </div>
                    <div class="flex items-center text-sm text-dark">
                        <font-awesome-icon icon="fa-solid fa-retweet" class="mr-3" />
                    
                    </div>
                    <div class="flex items-center text-sm text-dark">
                        <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
                       
                    </div>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useTweetsStore } from '../store/index';

    export default {
        name: 'tweetGet',
        setup() {
            const store = useTweetsStore();


            const getTweets = computed(() => {
                    return store.getTweets;
                })
            
            const tweets = computed(() => {
                return store.tweets;
            })

            onMounted(() => {
                store.fetchTweets()
            })

            return {
                getTweets,
                tweets
            }

        },

    }

</script>
