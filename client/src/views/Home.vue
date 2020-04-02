<template>
  <div class="home">
    <Car />
    <FormEditCar />
  </div>
</template>

<script>
// @ is an alias to /src
import Car from "@/components/Car.vue";
import FormEditCar from "@/components/FormEditCar";

export default {
  name: "Home",
  components: {
    Car,
    FormEditCar
  }
};
</script>
