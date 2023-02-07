<template>
    <div>
      <NavLinks/>
      <div v-if="!isLoading" class="profileView">
        <CustomCard>
          <template v-slot:image>
            <div class="picture"><img :src="authUser.avatar" class="card-img-top" alt=""></div>
          </template>
          <template v-slot:header>
            <h2 class="card-title">{{ authUser.name }}</h2>
          </template>
          <template v-slot:body>
            <p class="card-text">{{ authUser.email }}</p>
          </template>
          <template v-slot:footer>
            <div class="messages-list">
                <MessageItem v-for="message in messagesFiltered" :key="message.id" :message="message" @like="like"/>
            </div>
            <h2>Role: {{ authUser.role }}</h2>
          </template>
        </CustomCard>
      </div>
      <div v-else>Cargando...</div>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavLinks from "../components/NavLinks.vue";
import CustomCard from "../components/CustomCard.vue";
import ProductItem from '../components/ProductItem.vue';
import useAuthUser from '../composables/useAuthUser';

export default defineComponent({
  name: 'ProfileView',
  components: {
        NavLinks,
        CustomCard,
        ProductItem,
  },
  setup() {
    //Accedemos a los getters y actions de authUser, a través del composable useAuthUser, para acceder al usuario registrado
    const {authUser, isLoading, fetchAuthUser } = useAuthUser();
    fetchAuthUser();

    return{
      authUser, 
      isLoading, 
      fetchAuthUser
    }
  },
})
</script>