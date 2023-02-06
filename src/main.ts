import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown, faCheck, faGear, faHashtag, faHomeUser, faMagnifyingGlass, faPlus, faRetweet, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { faComment, faFaceSmile, faHeart, faImage } from '@fortawesome/free-regular-svg-icons'

library.add(faTwitter, faHomeUser, faHashtag, faUser,faAngleDown, faCheck, faPlus, faMagnifyingGlass, faGear, faStar, faImage, faFaceSmile, faStar, faComment, faRetweet, faHeart)

createApp(App).use(createPinia()).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
