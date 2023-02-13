<template>
    <div class="pt-5 px-8 pb-3 border-b border-lighter">
        <button @click="goHome">
            <img class="mx-auto w-6 h-6" src="@/assets/logo_fitter_1.png">
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'


export default defineComponent({
    name: 'flitterHeader',
    setup() {
        const router = useRouter()
        const goHome = () => {
            router.push({
                path: '/'
            })
        }
        return {
            goHome,
        }
    }

})
</script>
