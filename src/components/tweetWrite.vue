<template>
    <div>
        <div class="flex justify-between m-4">
            <!-- Need to add action to cancelar button -->
            <button @click="click" class="bg-none text-lightblue hover:text-darkblue hover:underline">
                Cancelar
            </button>
            <button
                class="h-10 px-4 bottom-0 right-0 rounded-full text-white font-semibold bg-lightblue hover:bg-darkblue focus:outline-none">
                Fleet
            </button>
        </div>
        <div class="px-5 py-3 flex">
            <div class="">
                <img src="@/assets/profile-pic.jpg" class="w-12 h-12 rounded-full object-cover" />
            </div>
            <form @submit.prevent="handleSubmit" class="w-full px-4 relative">
                <textarea v-model="newTweet" placeholder="Que esta pasando?"
                    class="w-full mt-3 pb-3 focus:outline-none"></textarea>
                <!--Items the emoji y picture
                     <div class="flex items-center">
                <font-awesome-icon icon="fa-regular fa-image" class="text-lg text-blue mr-4" />
                <font-awesome-icon icon="fa-regular fa-face-smile" class="text-lg text-blue mr-4" />
            </div> -->
            </form>
        </div>
        <p class="text-lightblue text-left m-4">Maximo 256 caracteres</p>
    </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useTweetsStore } from '../store/index';
import { useRouter } from 'vue-router'
import { isObjectIdOrHexString } from 'mongoose';

export default {
    name: 'tweetWrite',
    setup() {
        const store = useTweetsStore();

        const newTweet = ref('')

        const handleSubmit = async () => {
            if (newTweet.value.length > 0) {
                try {
                    store.writeTweet({
                        _id: 0,
                        postedBy: {
                            _id: 0,
                            name: '',
                            avatar: '',
                            email: '',
                            followers: [],
                            following: [] 
                        },
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

        const router = useRouter()
        const click = () => {
            router.push({
                path: '/'
            })
        }

    return {
        tweets,
        newTweet,
        handleSubmit,
        click
    }

    }
}
</script>