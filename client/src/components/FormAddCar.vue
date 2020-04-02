<template>
  <div
    class="modal fade"
    id="formCreateCar"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document" style="margin-left: 3vh; margin-top: 8vh;">
      <div class="modal-content" style="width: 50vh;">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Car</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action="/upload-single" method="post" enctype="multipart/form-data">
          <div class="modal-body">
            <div class="mb-3" id="exampleModalCenterTitle">
              <label for="validationServer03">Brand :</label>
              <input v-model="brand" type="text" class="form-control" id="add-brand" />
              <label for="validationServer03">License Plate :</label>
              <input v-model="licensePlate" type="text" class="form-control" id="add-lisencePlate" />
              <label for="validationServer03">Car Year :</label>
              <input v-model="carYear" type="number" class="form-control" id="add-carYear" />
              <label for="validationServer03">Price :</label>
              <input v-model="rentPrice" type="number" class="form-control" id="add-rentPrice" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click.prevent="createCar"
              type="button"
              class="btn btn-secondary btn-sm"
              data-dismiss="modal"
            >Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brand: "",
      licensePlate: "",
      rentPrice: "",
      carYear: ""
    };
  },
  methods: {
    createCar() {
      const dataCar = {
        brand: this.brand,
        licensePlate: this.licensePlate,
        rentPrice: this.rentPrice,
        carYear: this.carYear
      };
      this.$store.dispatch("addNewCar", dataCar);
      this.goReset();
    },
    goReset() {
      this.brand = "";
      this.licensePlate = "";
      this.rentPrice = "";
      this.carYear = "";
    }
  }
};
</script>

<style>
</style>