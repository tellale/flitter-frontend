<template>
    <div class="user">
        <h3>{{ user?.name }}</h3>
    </div>
</template>

<script lang="ts">
// import { useUsersStore } from '@/store/user';
import { useUsersStore } from '@/store/user';
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'userDetails',
    // props: ['user'],
    // setup() {
    //     const userStore = useUsersStore();

    //     return{
    //     userStore,
    //     }
    // },
    setup() {
        // const store = useUsersStore();

        
        // const user = computed(() => {
        //     return store.getUser;
        // })
        
        // const isLoading = computed(() => {
        //     return store.getIsLoading;
        // })

        // onMounted(() => {
        //     store.fetchUser()
        // })

        return {
            // user,
            // isLoading
        }
    }
})
</script>