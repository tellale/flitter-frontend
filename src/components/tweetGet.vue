<template>
        <div class="lg:w-1/2 w-full h-full overflow-y-scroll">
            <div class="pt-5 px-8 pb-3 border-b border-lighter">
                <img class="mx-auto w-6 h-6" src="@/assets/logo_fitter_1.png">
            </div>
        <div class="px-5 py-3 border-b b-8 border-lighter flex">
            <div class="">
                <img src="@/assets/profile-pic.jpg" class="w-12 h-12 rounded-full object-cover"/>
            </div>
            <form class="w-full px-4 relative">
                <textarea placeholder="What are you thinking?" class="w-full mt-3 pb-3 focus:outline-none"></textarea>
                <div class="flex items-center">
                    <font-awesome-icon icon="fa-regular fa-image" class="text-lg text-blue mr-4" />
                    <font-awesome-icon icon="fa-regular fa-face-smile" class="text-lg text-blue mr-4" />
                </div>
                <button class="h-10 px-4 absolute bottom-0 right-0 rounded-full text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none">
                    Fleet
                </button>
            </form>
        </div>
        <div v-for="tweet in getTweets" :key="tweet" class="w-full p-4 border-b hover:bg-ligther flex">
            <div class="flex-none mr-4">
                <img src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none">
            </div>
            <div class="w-full">
                <div class="flex items-center w-full">
                    <p class="font-semibold">{{ tweet }}</p>
                    <!-- <p class="text-sm text-dark ml-2">{{ follow.handle }}</p>-->
                    <p class="text-sm text-dark ml-2">{{ tweet }}</p>
                </div>
                <p class="py-3">{{ tweet }}</p>
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
