<template>
    <div>
        <div class="px-5 py-3 flex">
            <form @submit.prevent="handleSubmit" class="w-full px-4 relative">
                <div class="flex justify-between my-4">
                    <button 
                        @click="click" 
                        class="bg-none text-lightblue hover:text-darkblue hover:underline"
                        >
                            Cancelar
                    </button>
                    <button
                        class="h-10 px-4 bottom-0 right-0 rounded-full text-white font-semibold bg-lightblue hover:bg-darkblue focus:outline-none">
                            Fleet
                    </button>
                </div>
                <div class="flex justify-between">
                    <img 
                        src="@/assets/profile-pic.jpg"
                        class="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <textarea 
                        v-model="newTweet" 
                        placeholder="Que esta pasando?"
                        class="w-full mt-3 pb-3 focus:outline-none">
                    </textarea>
                </div>
                <!--Items the emoji y picture
                     <div class="flex items-center">
                <font-awesome-icon icon="fa-regular fa-image" class="text-lg text-blue mr-4" />
                <font-awesome-icon icon="fa-regular fa-face-smile" class="text-lg text-blue mr-4" />
            </div> -->
                <p class="text-lightblue text-left text-sm">Maximo 256 caracteres</p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useTweetsStore } from '../store/index';
import { useRouter } from 'vue-router'


export default {
    name: 'tweetWrite',
    setup() {
        const store = useTweetsStore();

        const newTweet = ref('')

        const router = useRouter()

        const handleSubmit = async () => {
            if (newTweet.value.length > 0) {
                try {
                    store.writeTweet(newTweet.value)
                } catch (err) {
                    console.log(err)
                } finally {
                    store.fetchTweets({})
                    router.push({
                        path: '/'
                    })
                }
            }
        }

        const tweets = computed(() => {
            return store.tweets;
        })


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