<template>
  <div>
    <flitterHeader />
    <div v-if="!loading" class="UserView">
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
          <div v-if="isFollowing">
            <button
              v-show="isAuth"
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="followOrUnfollow()"
            >
              Seguir
            </button>
          </div>
          <div v-else>
            <button
              v-show="isAuth"
              class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
              @click="followOrUnfollow()"
            >
              Dejar de seguir
            </button>
          </div>
        </div>
      </div>

      <div class="fleets">
        <h2>Fleets</h2>
        <hr />

        <div class="paginationNav">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="getPreviousPage()">Anterior</a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                @click="getDataPage(page)"
                v-bind:class="isActive(page)"
                class="page-item"
              >
                <a class="page-link">{{ page }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="getNextPage()">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- <tweetGet/> -->
        <div
          v-for="tweet in paginatedData"
          :key="tweet._id"
          class="w-full p-4 border-b hover:bg-ligther flex"
        >
          <div class="flex-none mr-4">
            <img
              src="https://i.pravatar.cc/300"
              class="h-16 w-16 rounded-full flex-none"
            />
          </div>
          <div class="w-full">
            <div class="flex flex-wrap items-center text-left w-full">
              <p class="font-semibold">{{ tweet.postedBy.name }}</p>
              <p
                class="text-sm text-lightblue ml-2"
                v-for="tag in tweet.tags"
                :key="tag"
              >
                {{ tag }}
              </p>
              <p class="text-sm text-lightblue ml-2">{{ tweet.updatedAt }}</p>
            </div>
            <p class="text-left py-3">{{ tweet.text }}</p>

            <div
              class="flex items-center place-content-end text-md px-4 text-grey"
            >
              <div class="mr-10">
                <button
                  v-show="isAuth"
                  class="rounded-full text-lightblue border border-lightblue py-1 px-4 hover:text-white hover:bg-lightblue"
                >
                  Seguir
                </button>
              </div>
              <button
                v-show="isAuth"
                @click="addLike(tweet._id)"
                class="flex items-center place-content-end hover:text-lightblue"
              >
                <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
                <p>{{ tweet.likes.length }}</p>
              </button>
              <div v-show="!isAuth" class="flex items-center place-content-end">
                <font-awesome-icon icon="fa-regular fa-heart" class="mr-3" />
                <p>{{ tweet.likes.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Cargando...</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref } from "vue";
import flitterHeader from "@/components/flitterHeader.vue";
  import { useUsersStore } from "@/store/user";
//import UserDetails from '../components/UserDetails.vue'
import { useTweetsStore } from "@/store";
import Tweet from "@/interfaces/Tweets";
//import tweetGet from '@/components/tweetGet.vue'

export default defineComponent({
  name: "ProfileView",
  components: {
    flitterHeader,
    //tweetGet,
    //UserDetails,
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

    async function fetchData(userId: number | undefined) {
      await tweetsStore.fetchUserTweets(userId);
      paginatedData.value = tweetsStore.getFirstTweets;
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

    const isActive = (page: number) => {
      return page == actualPage ? "active" : "";
    };

    //SEGUIR Y DAR LIKES

    //FALTA MODIFICAR ESTA PROPIEDAD
    const isFollowing = computed(() => {
      return true;
    });

    const followOrUnfollow = () => {
      userStore.followOrUnfollowAUser(props.name);
      //Volvemos a acceder a los datos YA MODIFICADOS del usuario??
      userStore.fetchUser(props.name);
    };

    const addLike = async (tweetId: number) => {
      tweetsStore.likeTweet(tweetId);
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
      // tweets,
      addLike,
    };
  },
});
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
h2 {
  color: #4c9eeb;
  font-weight: bold;
  font-size: x-large;
}
</style>
