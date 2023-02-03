import { defineStore } from "pinia";
import axios from "axios";

export const useTweetsStore = defineStore('tweets', {
    state: () => ({
        tweets: []
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
            } catch(err) {
                alert(err)
                console.log(err)
            }
        }
    },
})