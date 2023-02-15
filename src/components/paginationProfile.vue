<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="inline-flex items-center justify-content-center">
        <li>
          <button class="text-lightblue p-2 hover:text-white hover:bg-lightblue rounded-2" @click="$emit('getPreviousPage')">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
          </button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          @click="$emit('getDataPage', page)"
          class="text-lightblue"
        >
          <button class="text-lightblue p-0.5 rounded-2 px-2 hover:bg-lightblue hover:text-white">
            {{ page }}
          </button>
        </li>
        <li class="text-lightblue">
          <button class="text-lightblue p-2 hover:text-white hover:bg-lightblue rounded-2" @click="$emit('getNextPage')">
            <font-awesome-icon icon="fa-solid fa-arrow-right"/>
          </button >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: "PaginationProfile",
props: {
  totalPages:{
    type: Number,
    required: true,
  }
}
})
</script>