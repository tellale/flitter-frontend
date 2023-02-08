"use strict";
import { defineStore } from "pinia";
import axios from "axios";
import Tweet from '@/interfaces/Tweets'

export const useTweetsStore = defineStore('tweets', {
    state: () => ({
        tweets: [] as Tweet[]
    }),
    getters: {
        getTweets(state) {
            return state.tweets
        }
    },
    actions: {
        async fetchTweets() {
            try {
                const data = await axios.get('http://localHost:3000/api/tweets')
                this.tweets = data.data
            } catch (err) {
                alert(err)
                console.log(err)
            }
        },

        async writeTweet(tweet: Tweet) {
            const data = await axios.post('http://localHost:3000/api/create-tweet', tweet)
            this.tweets.push(data.data)
        }
    },
})

