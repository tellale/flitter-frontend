import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex'

// define typing for store state
export interface Tweets {
    tweets: []
}

// define injection key
export const key: InjectionKey<Store<Tweets>> = Symbol()

export const store = createStore<Tweets>({
    state: {
        tweets: []

    }
})