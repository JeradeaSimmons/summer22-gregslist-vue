<template>
  <div class="hover-house selectable my-3" :title="house.price">
    <router-link :to="{ name: 'House', params: { houseId: house.id } }">
      <img class="img-fluid" :src="house.imgUrl" alt="">
    </router-link>
   
  </div>
</template>


<script>
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    house: { type: House, required: true }
  },
  setup() {
    return {
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
.hover-house {
  transition: all .15s linear;

  &:hover {
    transform: translateY(2px);
    border-radius: 10px;
  }

}
</style>
