<template>
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination items-center justify-content-center">
          <li class="page-item">
            <a class="text-lightblue p-3 hover:text-grey" @click="$emit('getPreviousPage')">Anterior</a>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            @click="$emit('getDataPage', page)"
            class="text-lightblue"
          >
            <a class="text-white bg-lightblue p-2 rounded-2 px-3 hover:bg-grey">{{ page }}</a>
          </li>
          <li class="text-lightblue">
            <a class="text-lightblue p-3 hover:text-grey" @click="$emit('getNextPage')">Siguiente</a>
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
