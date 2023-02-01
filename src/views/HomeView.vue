/* eslint-disable */
<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side nav -->
    <div class="lg:w-1/5 hidden border-r border-ligther px-2 lg:px-6 py-2 flex flex-col justify-between">
      <div>
        <button class="h-12 w-12 hover:bg-lightblue mb-4 text-3xl rounded-full text-blue">
          <img src="@/assets/logo_fitter_1.png"/>
        </button>
        <div>
          <button v-for="tab in tabs" @click="id = tab.id" :key="tab.id" :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-blue' : ''}`">
            <font-awesome-icon :icon="`${ tab.icon } text-3xl mr-4 text-left`"/>
            <p class="hidden lg:block text-lg font-semibold text-left ml-3">{{ tab.title }}</p>
          </button>
        </div>
        <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
          <p class="hidden lg:block">Tweet</p>
          <font-awesome-icon icon="fa-solid fa-plus" class="lg:hidden" />
        </button>
      </div>
      <div class="w-full relative">
        <button @click="dropdown = true" class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
          <img src="@/assets/profile-pic.jpg" class="w-10 h-10 rounded-full object-cover">
          <div class="ml-4 hidden lg:block">
            <p class="text-sm font-bold leading-tight">Pepita Perez</p>
            <p class="text-sm leading-tight">@pepita</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-angle-down" class="hidden lg:block ml-auto text-lg" />
        </button>
        <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md mb-16 bg-white border-lightest">
          <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none">
            <img src="@/assets/profile-pic.jpg" class="w-10 h-10 rounded-full object-cover">
            <div class="ml-4">
              <p class="text-sm font-bold leading-tight">Pepita Perez</p>
              <p class="text-sm leading-tight">@pepita</p>
            </div>
            <font-awesome-icon icon="fa-solid fa-check" class="ml-auto text-blue" />
          </button>
          <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
            Log out @pepita
          </button>
        </div>
      </div>
    </div>
    <!-- Tweets -->
    <div class="lg:w-1/2 w-full h-full overflow-y-scroll">
      <div class="pt-5 px-8 pb-3 border-b border-lighter">
        <img class="mx-auto w-6 h-6" src="@/assets/logo_fitter_1.png">
      </div>
      <div class="px-5 py-3 border-b b-8 border-lighter flex">
        <div class="">
          <img src="@/assets/profile-pic.jpg" class="w-12 h-12 rounded-full object-cover"/>
        </div>
        <form class="w-full px-4 relative">
          <textarea v-model="tweet.content" placeholder="What are you thinking?" class="w-full mt-3 pb-3 focus:outline-none"></textarea>
          <div class="flex items-center">
            <font-awesome-icon icon="fa-regular fa-image" class="text-lg text-blue mr-4" />
            <font-awesome-icon icon="fa-regular fa-face-smile" class="text-lg text-blue mr-4" />
          </div>
          <button class="h-10 px-4 absolute bottom-0 right-0 rounded-full text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none">
            Fleet
          </button>
        </form>
      </div>
      <div v-for="follow in following" :key="follow.name" class="w-full p-4 border-b hover:bg-ligther flex">
        <div class="flex-none mr-4">
          <img src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none">
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <p class="font-semibold">{{ follow.name }}</p>
            <p class="text-sm text-dark ml-2">{{ follow.handle }}</p>
            <p class="text-sm text-dark ml-2">{{ follow.time }}</p>
          </div>
          <p class="py-3">{{ follow.tweet }}</p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <font-awesome-icon icon="fa-regular fa-comment" class="mr-3" />
              <p>{{ follow.comments }}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <font-awesome-icon icon="fa-solid fa-retweet" class="mr-3" />
              <p>{{ follow.retweets }}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
              <p>{{ follow.likes }}</p>
            </div>

          </div>

        </div>
      </div>

    </div>
    <!-- Trending -->
    <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
      <input type="text" class="rounded-full w-full p-2 bg-lighter pl-12 text-sm" placeholder="Search Twitter">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="absolute left-0 top-0 mt-5 ml-12 text-sm text-light" />
      <div class="w-full rounded-lg bg-lightest mt-4">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for You</p>
          <font-awesome-icon icon="fa-solid fa-gear" class="text-lg text-blue" />
        </div>
        <button v-for="trend in trending" :key="trend.id" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter">
          <div>
            <p class="text-sm text-left leading-tight text-dark">{{ trend.top }}</p>
            <p class="font-bold text-left leading-tight text-dark">{{ trend.title }}</p>
            <p class="text-left leading-tight">{{ trend.bottom }}</p>
          </div>
          <font-awesome-icon icon="fa-solid fa-angle-down" class="text-lg text-dark"/>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>
      <div class="w-full rounded-lg bg-lightest my-4">
        <div class="p-3">
          <p class="text-lg font-bold">Who to Follow</p>
        </div>
        <button v-for="friend in friends" :key="friend.handle" class="w-full flex hover:bg-lighter p-3 border-t border-lighter">
          <img :src="`${ friend.src }`" class="w-12 h-12 rounded-full object-cover">
          <div class="ml-4">
            <p class="text-sm font-bold leading-tight">{{ friend.name }}</p>
            <p class="text-sm leading-tight">{{ friend.handle }}</p>
          </div>
          <button class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue">
            Follow
          </button>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      tabs: [
        {icon: 'fa-solid fa-house-user', title: 'Home', id: 'home'},
        {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
        {icon: 'fa-user', title: 'Profile', id: 'profile'},
      ],
      id: 'home',
      dropdown: false,
      trending: [
        {top: 'Trending in Spain', title: 'Shakira', bottom: '1b Tweets', id: 1},
        {top: 'Trending in Barcelona', title: 'Sal-Pique', bottom: '136k Tweets', id: 2},
      ],
      friends: [
        {src: '', name: 'Elon Musk', handle: '@teslaboy'},
        {src: '', name: 'Kevin Hart', handle: '@minirock'},
      ],
      following: [
        {src: '', name: 'Shakira', handle: '@hipsdontlie', time: '20 min', tweet: 'Perdon que te sal-pique', comments: '1k', retweets: '140k', likes: '456k'},
        {src: '', name: 'Miley Cirus', handle: '@hannah', time: '30min', tweet: 'I can buy myself flowers!', comments: '24k', retweets: '345k', likes: '207m'},
      ],
      tweets: [
        {content: 'Yellow!'}
      ],
      tweet: {content: ''}
    }
  },
}
</script>

