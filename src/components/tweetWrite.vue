<template>
    <div class="px-5 py-3 border-b b-8 border-lighter flex">
        <div class="">
            <img src="@/assets/profile-pic.jpg" class="w-12 h-12 rounded-full object-cover"/>
        </div>
        <form @submit.prevent="handleSubmit" class="w-full px-4 relative">
            <textarea v-model="newTweet" placeholder="What are you thinking?" class="w-full mt-3 pb-3 focus:outline-none"></textarea>
            <div class="flex items-center">
                <font-awesome-icon icon="fa-regular fa-image" class="text-lg text-blue mr-4" />
                <font-awesome-icon icon="fa-regular fa-face-smile" class="text-lg text-blue mr-4" />
            </div>
            <button class="h-10 px-4 absolute bottom-0 right-0 rounded-full text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none">
                Fleet
            </button>
        </form>
    </div>
</template>

<script lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useTweetsStore } from '../store/index';

    export default {
        name: 'tweetWrite',
        setup() {
            const store = useTweetsStore();

            const newTweet = ref('')

            const handleSubmit = async () => {
                if (newTweet.value.length > 0) {
                    try{
                        store.writeTweet({
                            _id: 0,
                            postedBy: 'Ale', 
                            text: newTweet.value,
                            tags: [''],
                            likes: []
                        })
                    } catch (err) {
                        console.log(err)
                    } finally {
                        store.fetchTweets()
                    } 
                }
            }
            
            const tweets = computed(() => {
                return store.tweets;
            })

            return {
                tweets,
                newTweet,
                handleSubmit
            }

        },

    }
</script>