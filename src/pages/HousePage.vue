<template>
  <div class="house-page" v-if="house">
    <div class="my-3" :title="house.price">
      <img class="img-fluid" :src="house.imgUrl" alt="">
      <div class="p-2">
        <h4 class="text-center">{{ house.rooms }} | {{ house.bathrooms }} | {{ house.year }}</h4>
        <p>{{ house.description }}</p>
        <p class="text-end text-success m-0">$<b>{{ house.price }}</b></p>
        <button class="btn btn-info" @click="adjustHouse(house)" data-bs-toggle="modal" data-bs-target="#house-form">Adjust
          House Settings</button>
        <button class="btn btn-danger" @click="deleteHouse(house)">Delete</button>
      </div>
    </div>
    <Modal id="house-form">
      <HouseForm />
    </Modal>
  </div>
  <div v-else>
    loading...
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { housesService } from '../services/HousesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute()


    async function getHouseById() {
      try {
        
        await housesService.getHouseById(route.params.houseId)
      } catch (error) {
        logger.error('[Get House By Id]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getHouseById()
    })

    return {
      house: computed(() => AppState.activeHouse),
      adjustHouse(house) {
        housesService.setActiveHouse(house)
      },
      async deleteHouse(house) {
        try {
          const yes = await Pop.confirm('Delete this House?')
          if (!yes) { return }
          await housesService.deleteHouse(house.id)
        } catch (error) {
          logger.error('[Deleting House]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
