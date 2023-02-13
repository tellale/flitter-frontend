/* eslint-disable */
<template>
  <div id="app" class="flex h-screen w-full">
    <!-- Tweets -->
    <div class="w-full h-full overflow-y-scroll static">
      <flitterHeader />
      <tweetGet />
      <div class="paginationNav">
        <nav>
          <ul class="pagination items-center justify-content-center">
            <li class="page-item">
              <a
                class="text-lightblue p-3 hover:text-grey"
                @click="getPreviousPage()"
                >Anterior</a
              >
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              @click="getDataPage(page)"
              v-bind:class="isActive(page)"
              class="text-lightblue"
            >
              <a
                class="text-white bg-lightblue p-2 rounded-2 px-3 hover:bg-grey"
                >{{ page }}</a
              >
            </li>
            <li class="text-lightblue">
              <a
                class="text-lightblue p-3 hover:text-grey"
                @click="getNextPage()"
                >Siguiente</a
              >
            </li>
          </ul>
        </nav>
      </div>

      <div v-if="userStore.isAuth" class="fixed z-10 bottom-20 right-5">
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
import { useRouter } from "vue-router";
import { useTweetsStore } from "@/store/index";
import { useUsersStore } from "@/store/user";

import { onBeforeMount, onMounted } from "@vue/runtime-core";
import { ref, computed } from "vue";
import Tweet from "@/interfaces/Tweets";

export default {
  name: "HomeView",
  components: {
    tweetGet,
    flitterHeader,
  },
  setup() {
    const store = useTweetsStore();
    const userStore = useUsersStore();
    onBeforeMount(async () => await userStore.fetchAuthUser());
    onMounted(() => {
      store.fetchTweets(0, 10);
    });

    const router = useRouter();
    const click = () => {
      router.push({
        path: "/write-tweet",
      });
    };

    //PAGINACIÓN
    const elementsPerPage = 10;
    let actualPage = 1;

    let totalPages = computed(() => {
      const pages = Math.ceil(store.getTweetsLength / elementsPerPage);
      return pages;
    });

    const getDataPage = (page: number) => {
      actualPage = page;
      paginatedData.value = [];
      let ini = page * elementsPerPage - elementsPerPage;
      let fin = page * elementsPerPage;
      paginatedData.value = store.getTweets.slice(ini, fin);
    };

    let paginatedData = ref<Tweet[]>([]);

    const getPreviousPage = () => {
      if (actualPage > 1) {
        actualPage--;
      }
      getDataPage(actualPage);
    };

    const getNextPage = () => {
      if (actualPage < totalPages.value) {
        actualPage++;
      }
      getDataPage(actualPage);
    };

    const isActive = (page: number) => {
      return page == actualPage ? "active" : "";
    };

    return {
      userStore,
      click,
      totalPages,
      getDataPage,
      getPreviousPage,
      getNextPage,
      paginatedData,
      isActive,
    };
  },
};
</script>
