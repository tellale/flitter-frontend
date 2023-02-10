"use strict";
import { defineStore } from "pinia";
import axios from "axios";
import Tweet from "@/interfaces/Tweets";

export const useTweetsStore = defineStore("tweets", {
    state: () => ({
        tweets: [] as Tweet[],
        isLoading: false,
    }),
    getters: {
        getTweets(state) {
            return state.tweets;
        },
        getTweetsLength(state){
            return state.tweets.length;
        },
        getFirstTweets(state){
            return state.tweets.slice(0, 10);
        }
    },
    actions: {
        async fetchTweets(page = 0, limit = 20) {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/tweet?page=${page}&limit=${limit}`
                );
                this.tweets = res.data[0].tweets;
            } catch (err) {
                alert(err);
                console.log(err);
            }
        },

        async writeTweet(tweet: string) {
            const data = await axios.post(
                "http://localhost:3000/api/create-tweet",
                tweet
            );
            this.tweets.push(data.data);
        },

        async fetchUserTweets(userId: number | undefined) {
            try {
                const data = await axios.get(
                    `http://localhost:3000/api/tweet/user/${userId}`
                );
                console.log(data.data[0].tweets)
                this.tweets = data.data[0].tweets;
            } catch (err) {
                alert(err);
                console.log(err);
            }
        },

        async likeTweet(tweetId: number | undefined) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/tweet/${tweetId}/like`)
                this.tweets = data.data
            } catch (err) {
                console.log(err)
            }
        }
    },
});
