<template>
  <div class="row">
    <div class="container">
      <div class="row mt-1">
        <div class="col mt-3" v-for="(car, index) in allCars" :key="index">
          <div class="card" style="width: 18rem; padding: 2vh;">
            <img
              src="https://pngimage.net/wp-content/uploads/2018/06/vektor-mobil-png-3.png"
              class="card-img-top"
              alt="car"
            />
            <div class="card-body">
              <h5 class="card-title">Brand: {{car.brand}}</h5>
              <p class="card-text">Lisence Plate: {{car.licensePlate}}</p>
              <p>Year: {{car.carYear}}</p>
              <p>Rp. {{(car.rentPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</p>
              <div style="display: flex;justify-content: space-around; margin-top: 3vh">
                <button
                  @click="checkEditCar(car.id)"
                  data-toggle="modal"
                  data-target="#formEditCar"
                >Edit Car</button>
                <button @click="removeCar(car.id)">Delete</button>
                <button @click="addToCart(car.id)">Add Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allCars() {
      return this.$store.state.cars;
    }
  },
  methods: {
    checkEditCar(id) {
      this.$store.dispatch("findOneCar", id);
    },
    removeCar(id) {
      this.$store.dispatch("removeCar", id);
    },
    addToCart(id) {
      this.$store.dispatch("addToCart", id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  margin: 0px !important;
}
</style>
