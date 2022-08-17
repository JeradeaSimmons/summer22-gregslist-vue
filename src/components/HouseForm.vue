<template>
  <form @submit.prevent="handleSubmit()" class="house-form">
    <h3 class="text-primary">List Your Home</h3>
    <div class="row">

      <div class="col-4">
        <label class="form-label" for="price">Price</label>
        <input class="form-control" type="text" minlength="5" id="price" name="price" v-model="editable.price">
      </div>

      <div class="col-4">
        <label class="form-label" for="rooms">Rooms</label>
        <input class="form-control" type="text" id="rooms" name="rooms" v-model="editable.rooms">
      </div>
      <div class="col-4">
        <label class="form-label" for="bathrooms">Bathrooms</label>
        <input class="form-control" type="text" id="bathrooms" name="bathrooms" v-model="editable.bathrooms">
      </div>

      

      <label class="form-label" for="year">Year</label>
      <input class="form-control" type="number" id="year" name="year" v-model="editable.year">

      <label class="form-label" for="imgUrl">Image</label>
      <input class="form-control" type="text" id="imgUrl" name="imgUrl" v-model="editable.imgUrl">

      <label class="form-label" for="description">Description</label>
      <textarea class="w-100 form-control" name="description" id="description" rows="5"
        v-model="editable.description"></textarea>

      <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light" data-bs-dismiss="modal">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    // TODO come back to this in one sec for edits
    watchEffect(() => {
      //               v ... is used to break reference
      if (!AppState.activeHouse) { return } // stop
      editable.value = { ...AppState.activeHouse }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            housesService.editHouse(editable.value)
          } else {
            housesService.createHouse(editable.value)
          }
          editable.value = {} // clears the form
        } catch (error) {
          logger.error('[Creating or Editing House]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
