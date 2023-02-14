<template>
    <div>
        <div class="avatarimg">
        <img :src="userData?.avatar" class="avatar" />
      </div>
      <div class="profileDetails">
        <h1>{{ userData?.name }}</h1>
        <h3>@{{ userData?.name }}</h3>
      </div>
      <div class="followData">
        <p>
          <strong>{{ userData?.following.length }}</strong> Siguiendo
        </p>
        <p>
          <strong>{{ userData?.followers.length }}</strong> Seguidores
        </p>
      </div>

      <div class="flex items-center place-content-end text-md px-4 text-grey">
        <div class="mr-10">
          <div v-if="!isFollowing">
            <button
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="$emit('followOrUnfollow')"
              :disabled="!isFinished"
            >
              Seguir
            </button>
          </div>
          <div v-else>
            <button
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="$emit('followOrUnfollow')"
              :disabled="!isFinished"
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

.avatarimg {
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.avatar {
  margin-left: 30px;
  width: 200px;
  height: 200px;
  border-radius: 150px;
  border: 5px solid #0a0a0a;
}
.profileDetails {
  margin-bottom: 20px;
  position: relative;
  text-align: left;
  margin-left: 50px;
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
.followData {
  display: flex;
  justify-content: left;
  margin-left: 40px;
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