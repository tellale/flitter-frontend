<template>
    <div class="message-item">
        <div>
            <div>
            <img :src="message.image" :alt="message.author">
            <div class="card-body">
                <h5>{{ product.date }}. {{ product.text }}</h5>
                <p>{{ product.kudos }}$</p>
                <a  @click="$emit('like', message)"></a>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Message } from '../models/message'

export default defineComponent({
    props: {
        product:{
            type: Object as PropType<Message>,
            required: true,
        }
    },
})
</script>