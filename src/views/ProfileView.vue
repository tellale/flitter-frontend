<template>
  <div>
    <flitterHeader />
    <div v-if="!loading" class="UserView">
      <div class="block place-content-center">
        <div
          class="flex justify-center mt-10 mb-30 place-content-center items-center"
        >
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

      <div
        class="flex items-center place-content-center text-md px-4 text-grey"
      >
        <div class="mb-4 items-center">
          <div v-if="!isFollowing">
            <button
              v-show="isAuth"
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="followOrUnfollow()"
              :disabled="!isFinished"
            >
              Seguir
            </button>
          </div>
          <div v-else>
            <button
              v-show="isAuth"
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="followOrUnfollow()"
              :disabled="!isFinished"
            >
              Dejar de seguir
            </button>
          </div>
        </div>
      </div>

      <div class="fleets">
        <h2 class="mb-1">Fleets</h2>
        <hr />

        <div v-show="thereAreTweets" class="paginationNav">
          <!-- AÑADIDO PARA EL CAMBIO DE ORDEN  -->
          <i @click="reverseOrder()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </i>
          <!-- HASTA AQUÍ  -->

          <nav aria-label="Page navigation example">
            <ul class="inline-flex items-center justify-content-center">
              <li>
                <button
                  class="text-lightblue p-2 hover:text-white hover:bg-lightblue rounded-2"
                  @click="getPreviousPage()"
                >
                  <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </button>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                @click="getDataPage(page)"
                v-bind:class="isActive(page)"
                class="text-lightblue"
              >
                <button
                  class="text-lightblue p-0.5 rounded-2 px-2 hover:bg-lightblue hover:text-white"
                >
                  {{ page }}
                </button>
              </li>
              <li class="text-lightblue">
                <button
                  class="text-lightblue p-2 hover:text-white hover:bg-lightblue rounded-2"
                  @click="getNextPage()"
                >
                  <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </button>
              </li>
            </ul>
          </nav>

          <!-- <tweetGet/> -->
          <TweetCard
            v-for="tweet in paginatedData"
            :key="tweet._id"
            :tweet="tweet"
            :avatar="userData?.avatar"
            :name="userData?.name"
            class="w-full p-4 border-b hover:bg-ligther flex"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import flitterHeader from "@/components/flitterHeader.vue";
import { useUsersStore } from "@/store/user";
import { useTweetsStore } from "@/store";
import Tweet from "@/interfaces/Tweets";
import TweetCard from "@/components/tweetCard.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    flitterHeader,
    TweetCard,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUsersStore();
    const tweetsStore = useTweetsStore();
    userStore.fetchUser(props.name);
    const isAuth = ref(true);

    const userData = computed(() => {
      fetchData(userStore.user?._id);
      return userStore.user;
    });

    const loading = computed(() => {
      return userStore.isLoading;
    });

    //PAGINACIÓN
    const elementsPerPage = 10;
    let actualPage = 1;

    let totalPages = computed(() => {
      const pages = Math.ceil(tweetsStore.getTweetsLength / elementsPerPage);
      return pages;
    });

    const getDataPage = (page: number) => {
      actualPage = page;
      paginatedData.value = [];
      let ini = page * elementsPerPage - elementsPerPage;
      let fin = page * elementsPerPage;
      paginatedData.value = tweetsStore.getTweets.slice(ini, fin);
    };

    let paginatedData = ref<Tweet[]>([]);
    let thereAreTweets = ref<boolean>(false);
    async function fetchData(userId: number | undefined) {
      await tweetsStore.fetchUserTweets(userId);
      paginatedData.value = tweetsStore.getFirstTweets;
      if (paginatedData.value.length <= 0) {
        thereAreTweets.value = false;
      } else {
        thereAreTweets.value = true;
      }
    }

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

    //COLOREA LA PÁGINA ACTUAL
    const isActive = (page: number) => {
      return page == actualPage ? "active" : "";
    };

    //AÑADIDO PARA EL CAMBIO DE ORDEN
    // let tweets = ref<Tweet[]>([]);
    // fetchData();
    // async function fetchData() {
    //     await store.fetchTweets();
    //     tweets.value = store.tweets;
    // }
    // const reverseOrder = () => {
    //   store.reverseTweets();
    //   tweets.value = store.tweets;
    // };

    const reverseOrder = () => {
      tweetsStore.reverseTweets();
      paginatedData.value = tweetsStore.tweets;
    };
    //HASTA AQUI

    //SEGUIR Y DEJAR DE SEGUIR
    let isFollowing = ref<boolean>(false);
    let isFinished = ref<boolean>(true);

    function delay(time: number) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    const followOrUnfollow = async () => {
      // await userStore.fetchUser(props.name);
      // await userStore.fetchAuthUser();
      isFinished.value = false;
      await userStore.followOrUnfollowAUser(isFollowing.value, props.name);
      isFollowing.value = userStore.amIFollowing();
      delay(1000).then(() => (isFinished.value = true));
    };

    return {
      userData,
      loading,
      isFollowing,
      //getTweets,
      followOrUnfollow,
      isAuth,
      totalPages,
      getDataPage,
      getPreviousPage,
      getNextPage,
      paginatedData,
      isActive,
      thereAreTweets,
      //AÑADIDO PARA EL CAMBIO DE ORDEN
      reverseOrder,
      isFinished,
    };
  },
});
</script>

<style scoped>
.avatarimg {
  margin-top: 10px;
  margin-bottom: 30px;
  display: flex;
}

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

.followData {
  display: flex;
}

p {
  font-family: "Roboto", sans-serif;
  color: #687684;
  margin-left: 10px;
  margin-right: 10px;
}

h2 {
  color: #4c9eeb;
  font-weight: bold;
  font-size: x-large;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}
</style>
