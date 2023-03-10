"use strict";
import { defineStore } from "pinia";
import axios from "axios";
import Tweet from "@/interfaces/Tweets";
import TweetBody from "@/interfaces/TweetBody";

export const useTweetsStore = defineStore("tweets", {
  state: () => ({
    tweets: [] as Tweet[],
    isLoading: false,
    filters: {
      page: 0,
      limit: 10,
      search: "",
    },
    totalLength: 0,
  }),
  getters: {
    getTweets(state) {
      return state.tweets;
    },
    getTweetsLength(state) {
      return state.tweets.length;
    },
    getFirstTweets(state) {
      return state.tweets.slice(0, 10);
    },
  },
  actions: {
    async fetchTweets() {
      try {
        const res = await axios.get(
          `/api/tweet?page=${this.filters.page}&limit=${this.filters.limit}&search=${this.filters.search}`
        );
        this.tweets = res.data[0].tweets;
        this.totalLength = res.data[0].total[0].count;
      } catch (err) {
        console.log(err);
      }
    },

    async writeTweet(body: TweetBody) {
      const data = await axios.post("/api/create-tweet", {
        text: body.text,
        tags: body.tags,
      });
      this.tweets.push(data.data);
    },

    async fetchUserTweets(userId: number | undefined) {
      try {
        if (userId) {
          const { data } = await axios.get(`/api/tweet/user/${userId}`);
          this.tweets = data?.[0]?.tweets?.reverse() ?? [];
        }
      } catch (err) {
        console.log(err);
      }
    },

    async likeTweet(tweetId: number | undefined) {
      try {
        await axios.patch(`/api/tweet/${tweetId}/like`);
        const res = await axios.get(
          `/api/tweet?page=${this.filters.page}&limit=${this.filters.limit}&search=${this.filters.search}`
        );
        this.tweets = res.data[0].tweets;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteTweet(tweetId: number) {
      try {
        axios.delete(`/api/delete-tweet/${tweetId}`).then((response) => {
          const i = this.tweets.map((data) => data._id).indexOf(tweetId);
          this.tweets.splice(i, 1);
        });
      } catch (err) {
        console.log(err);
      }
    },
    //A??ADIDO PARA EL CAMBIO DE ORDEN
    async reverseTweets() {
      this.tweets.reverse();
    },
  },
});
