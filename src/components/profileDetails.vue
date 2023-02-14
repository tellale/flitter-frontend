<template>
    <div>
      <div class="block place-content-center">
        <div class="flex justify-center mt-10 mb-30 place-content-center items-center">
          <img :src="userData?.avatar" class="avatar mb-2" />
        </div>
        <div class="profileDetails justify-center">
          <h1 class="text-center">{{ userData?.name }}</h1>
        </div>
        <div class="flex justify-center mb-3">
          <p>
            <strong>{{ userData?.following.length }}</strong> Siguiendo
          </p>
          <p>
            <strong>{{ userData?.followers.length }}</strong> Seguidores
          </p>
        </div>
      </div>
      <div class="flex items-center place-content-center text-md px-4 text-grey">
        <div class="mb-4 items-center">
          <div v-if="!isFollowing">
            <button
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="$emit('followOrUnfollow')" :disabled="!isFinished"
            >
              Seguir
            </button>
          </div>
          <div v-else>
            <button
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="$emit('followOrUnfollow')" :disabled="!isFinished"
            >
              Dejar de seguir
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import User from '@/interfaces/Users';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: "PaginationProfile",
    props: {
        userData:{
            type: Object as PropType<User | undefined>,
            required: true,
        },
        isFollowing:{
            type: Boolean,
            required: true,
        },
        isFinished:{
            type: Boolean,
            required: true,
        }
    },
})
</script>

<style scoped>
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 150px;
  }

  .profileDetails {
    margin-bottom: 20px;
    position: relative;
    text-align: left;
  }

  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    font-size: x-large;
  }

  h3 {
    font-family: "Roboto", sans-serif;
    color: #687684;
  }

  p {
    font-family: "Roboto", sans-serif;
    color: #687684;
    margin-left: 10px;
    margin-right: 10px;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
</style>