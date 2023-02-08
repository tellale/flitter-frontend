<template>
    <div>
      <flitterHeader/>
      <div v-if="!loading" class="UserView">
        <div class="avatarimg">          
          <img :src=userData?.avatar class="avatar">
        </div>
        <div class="profileDetails">
          <h1>{{ userData?.name }}</h1> 
          <h3>@{{ userData?.name }}</h3> 
        </div>
        <div class="followData">
          <p><strong>{{ userData?.following.length }}</strong> Siguiendo</p> 
          <p><strong>{{ userData?.followers.length }}</strong> Seguidores</p> 
          </div>
        <div v-if="isFollowing">
          <button class="bg-none text-grey p-4 border-1 border-grey hover:bg-grey hover:text-white hover:border-none hover:rounded-full" @click="followOrUnfollow()">Seguir</button>
        </div>
        <div v-else>          
          <button class="bg-none text-grey p-4 border-1 border-grey hover:bg-grey hover:text-white hover:border-none hover:rounded-full" @click="followOrUnfollow()">Dejar de seguir</button>
        </div>
        <div class="fleets">
          <h2> Fleets </h2> 
          <hr>
        </div>
      </div>
      <div v-else>Cargando...</div>
    </div>
  </template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import flitterHeader from '@/components/flitterHeader.vue'
import { useUsersStore } from '@/store/user';
import UserDetails from '../components/UserDetails.vue'
import { useTweetsStore } from '@/store';

export default defineComponent({
  name: 'ProfileView',
  components: {
    flitterHeader
        //UserDetails,
  },
  props: {
        name: {
            type: String,
            required: true
        }
  },
  setup(props) {
    const userStore = useUsersStore();
    const tweetsStore = useTweetsStore();
    userStore.fetchUser(props.name);
    tweetsStore.fetchTweets;

    const userData = computed(() => {
       return userStore.user;
    })

    const loading = computed(() => {
       return userStore.isLoading;
    })

    const isFollowing = computed(() => {
      return true;
    })

    //RECOGER TWEETS SOLO DE MI SEGUIDOR, FILTRADO EN BACK
    // const userTweets = computed(() => {
    //    return tweetsStore.tweets;
    // })

    const followOrUnfollow = () => {
      userStore.followOrUnfollowAUser(props.name);
      
      //Volvemos a acceder a los datos YA MODIFICADOS del usuario
      userStore.fetchUser(props.name);
    }

    return{
      userData,
      loading,
      isFollowing,
      //userTweets,
      followOrUnfollow
    }
  },
})
</script>

<style scoped>
.avatarimg{
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.avatar{
  margin-left: 30px;
  width:200px;
  height:200px;
  border-radius:150px;
  border:5px solid #0a0a0a;
}
/* .follow{
  margin-right: 30px;
  display: inline-block;
  background: #ffffff;
  color: #687684;
  border-radius: 2em;
  border: 2px solid #687684;  
  padding: 14px 28px;
}
.follow:hover{
   color: #4C9EEB;
   border: 2px solid #4C9EEB; 
   /* stroke: 1px solid #687684; 
 } */ 
.profileDetails{
  margin-bottom: 20px;
  position: relative;
  left: -787px;
}
h1{
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size:x-large;
}
h3{
  font-family: 'Roboto', sans-serif;
  color: #687684;
}
.followData{
  display: flex;
  justify-content: left;
  margin-left: 40px;
}
p{
  font-family: 'Roboto', sans-serif;
  color: #687684;
  margin-left: 10px;
  margin-right: 10px;
}
h2{
  color: #4C9EEB;
  font-weight: bold;
  font-size: x-large;
}
</style>