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
            class="h-10 px-4 bottom-0 right-0 rounded-full text-white font-semibold bg-lightblue hover:bg-darkblue focus:outline-none"
          >
            Fleet
          </button>
        </div>
        <div class="flex justify-between">
          <img
            :src="userStore.authUser.avatar"
            class="w-12 h-12 rounded-full object-cover mr-4"
          />
          <textarea
            v-model="newTweet"
            placeholder="Que esta pasando?"
            class="w-full mt-3 pb-3 focus:outline-none"
            required
          >
          </textarea>
        </div>
        <div>
          <textarea
            v-model="newTags"
            placeholder="Escribe aquí tus etiquetas"
            class="w-full mt-3 pb-3 focus:outline-none"
          >
          </textarea>
        </div>
        <p class="text-lightblue text-left text-sm">Maximo 256 caracteres</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useTweetsStore } from "@/store/index";
import { useUsersStore } from "@/store/user";
import { onBeforeMount } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  name: "tweetWrite",
  setup() {
    const store = useTweetsStore();
    const userStore = useUsersStore();

    const newTweet = ref("");
    const newTags = ref("");
    const router = useRouter();
    onBeforeMount(async () => await userStore.fetchAuthUser());

    const handleSubmit = async () => {
      let tags: Array<string> = []
      if(newTags.value.length>0){
        tags = newTags.value.split(" ");
      }
      if (newTweet.value.length > 0) {
        try {
          store.writeTweet({text: newTweet.value, tags: tags});
        } catch (err) {
          console.log(err);
        } finally {
          store.fetchTweets();
          router.push({
            path: "/",
          });
        }
      }
    }

    const tweets = computed(() => {
      return store.tweets;
    });

    const click = () => {
      router.push({
        path: "/",
      });
    };

    return {
      userStore,
      tweets,
      newTweet,
      newTags,
      handleSubmit,
      click,
    };
  },
};
</script>
