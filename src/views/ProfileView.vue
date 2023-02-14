<template>
  <div class="profile-container">
    <flitterHeader />
    <div v-if="!loading" class="UserView">
      <ProfileDetails
        :userData="userData"
        :isFollowing="isFollowing"
        :isFinished="isFinished"
        @followOrUnfollow="followOrUnfollow"
      />
      <div>
        <h2 class="fleets">Fleets</h2>
        <hr />
        <TweetCard
          v-for="tweet in paginatedData"
          :key="tweet._id"
          :tweet="tweet"
          class="w-full p-4 border-b hover:bg-ligther flex"
        />
        <div v-show="thereAreTweets" class="paginationNav">
          <!-- <i @click="reverseOrder()">
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
          </i> -->
          <PaginationProfile
            :totalPages="totalPages"
            @getPreviousPage="getPreviousPage"
            @getDataPage="getDataPage"
            @getNextPage="getNextPage"
          />
        </div>
      </div>
    </div>
    <div v-else>Cargando...</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import flitterHeader from "@/components/flitterHeader.vue";
import { useUsersStore } from "@/store/user";
import { useTweetsStore } from "@/store";
import PaginationProfile from "@/components/paginationProfile.vue";
import Tweet from "@/interfaces/Tweets";
import TweetCard from "@/components/tweetCard.vue";
import ProfileDetails from "@/components/profileDetails.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    flitterHeader,
    TweetCard,
    PaginationProfile,
    ProfileDetails
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

    const userData = computed(() => {
      fetchData(userStore.user?._id);
      return userStore.user;
    });

    const loading = computed(() => {
      return userStore.isLoading;
    });

    //PAGINATION
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

    // //COLOREA LA PÁGINA ACTUAL
    // const isActive = (page: number) => {
    //   return page == actualPage ? "active" : "";
    // };

    // //REVERSE TWEET ORDER
    // const reverseOrder = () => {
    //   tweetsStore.reverseTweets();
    //   paginatedData.value = tweetsStore.tweets;
    // };

    //FOLLOW AND UNFOLLOW
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
      totalPages,
      getDataPage,
      getPreviousPage,
      getNextPage,
      paginatedData,
      //isActive,
      thereAreTweets,
      //reverseOrder,
      isFinished,
      //actualPage
    };
  },
});
</script>

<style scoped>
.fleets {
  color: #4c9eeb;
  font-weight: bold;
  font-size: x-large;
}

.profile-container {
  margin-bottom: 4rem;
}
</style>
