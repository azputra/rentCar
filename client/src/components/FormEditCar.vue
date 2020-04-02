<template>
  <div
    class="modal fade"
    id="formEditCar"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document" style="margin-left: 70vh;">
      <div class="modal-content" style="width: 50vh;">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Car</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="/upload-single" method="post" enctype="multipart/form-data">
          <div class="modal-body">
            <div class="mb-3" id="exampleModalCenterTitle">
              <label for="validationServer03">Brand :</label>
              <input
                v-model="$store.state.car.brand"
                type="text"
                class="form-control"
                id="add-brand"
              />
              <label for="validationServer03">Car Year :</label>
              <input
                v-model="$store.state.car.carYear"
                type="number"
                class="form-control"
                id="add-carYear"
              />
              <label for="validationServer03">Price :</label>
              <input
                v-model="$store.state.car.rentPrice"
                type="number"
                class="form-control"
                id="add-rentPrice"
              />
              <label for="validationServer03">Lisence Plate : {{$store.state.car.licensePlate}}</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click.prevent="editedCar"
              type="button"
              class="btn btn-secondary btn-sm"
              data-dismiss="modal"
            >Edit Car</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    editedCar() {
      this.$store.dispatch("editCar");
    }
  }
};
</script>

<style>
</style>