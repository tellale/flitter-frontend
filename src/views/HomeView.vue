/* eslint-disable */
<template>
  <div id="app" class="mb-16 flex h-screen w-full">
    <!-- Tweets -->
    <div class="w-full h-full overflow-y-scroll static">
      <flitterHeader />
      <searchBar />
      <tweetGet />
      <div>
        <nav>
          <ul class="inline-flex items-center justify-content-center">
            <li>
              <button class="text-lightblue p-2 hover:text-white hover:bg-lightblue rounded-2"
                @click="getPreviousPage()">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
              </button>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              @click="getDataPage(page)"
              class="text-lightblue"
            >
              <button class="text-lightblue p-0.5 rounded-2 px-2 hover:bg-lightblue hover:text-white">
                {{ page }}
              </button>
            </li>
            <li class="text-lightblue">
              <button class="text-lightblue p-2 hover:text-white hover:bg-lightblue rounded-2"
                @click="getNextPage()">
                <font-awesome-icon icon="fa-solid fa-arrow-right" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div v-if="userStore.isAuth" class="fixed z-20 bottom-20 right-5">
        <button @click="click">
          <font-awesome-icon
            icon="fa-solid fa-plus"
            class="text-white bg-lightblue rounded-full text-lg p-4"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import tweetGet from "@/components/tweetGet.vue";
import flitterHeader from "@/components/flitterHeader.vue";
import searchBar from "@/components/searchBar.vue";

import { useRouter } from "vue-router";
import { useTweetsStore } from "@/store/index";
import { useUsersStore } from "@/store/user";

import { onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core";
import { computed } from "vue";

export default {
  name: "HomeView",
  components: {
    tweetGet,
    flitterHeader,
    searchBar,
  },
  setup() {
    const store = useTweetsStore();
    const userStore = useUsersStore();
    onBeforeMount(async () => await userStore.fetchAuthUser());

    onMounted(() => {
      store.fetchTweets(
        // STATE PARAMETERS TO INJECT TO BACKEND QUERY
        store.filters.page,
        store.filters.limit,
        store.filters.search
      );
    });

    onUpdated(() => {
      store.fetchTweets(
        // STATE PARAMETERS TO INJECT TO BACKEND QUERY
        store.filters.page,
        store.filters.limit,
        store.filters.search
      );
    });

    // ROUTER FOR + BUTTON
    const router = useRouter();
    const click = () => {
      router.push({
        path: "/write-tweet",
      });
    };

    // PAGINATION
    const getPreviousPage = () => {
      if (store.filters.page > 0) {
        store.filters.page --
        console.log(store.filters.page)
        return store.fetchTweets(
          store.filters.page,
          store.filters.limit,
          store.filters.search
        )
      }
      
    }

    const getNextPage = () => {
      if (store.filters.page >= 0) {
        store.filters.page ++
        console.log(store.filters.page)
        return store.fetchTweets(
          store.filters.page,
          store.filters.limit,
          store.filters.search
        )
      }
    }

    const getDataPage = (page: number) => {
      console.log(page)
      store.filters.page = page
      console.log(store.filters.page)
      return store.fetchTweets(
          store.filters.page,
          store.filters.limit
        )
    }

    let totalPages = computed(() => {
      return Math.ceil(store.totalLength / store.filters.limit)
    })

    
    return {
      userStore,
      click,
      getPreviousPage,
      getNextPage,
      totalPages,
      getDataPage

    };
  },
};
</script>

