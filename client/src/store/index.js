import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import Swal from 'sweetalert2'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    cars: [],
    car: { brand: "", carYear: "", licensePlate: "", rentPrice: "" },
    idCar: null,
    carts: []
  },
  mutations: {
    setCars(state, payload) {
      state.cars = payload
    },
    setCar(state, payload) {
      state.car = payload
    },
    setIdCar(state, payload) {
      state.idCar = payload
    },
    setCarts(state, payload) {
      state.carts = payload
    }
  },
  actions: {
    findAllCar(context) {
      axios({
        url: `${baseUrl}/cars`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('setCars', data)
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    addNewCar(context, payload) {
      axios({
        url: `${baseUrl}/cars`,
        method: 'POST',
        data: {
          brand: payload.brand,
          carYear: payload.carYear,
          rentPrice: payload.rentPrice,
          licensePlate: payload.licensePlate
        }
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Created Car',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCar')
        }).catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        });
    },
    findOneCar(context, payload) {
      axios({
        url: `${baseUrl}/cars/${payload}`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('setCar', data)
          context.commit('setIdCar', data.id)
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    editCar(context) {
      axios({
        url: `${baseUrl}/cars/${this.state.idCar}`,
        method: 'PUT',
        data: {
          brand: this.state.car.brand,
          carYear: this.state.car.carYear,
          rentPrice: this.state.car.rentPrice,
        }
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Edit Car',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCar')
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    removeCar(context, payload) {
      axios({
        url: `${baseUrl}/cars/${payload}`,
        method: 'DELETE',
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Remove Car',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCar')
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    findAllCart(context) {
      axios({
        url: `${baseUrl}/rentalCars`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    },
    addToCart(context, payload) {
      axios({
        url: `${baseUrl}/rentalCars`,
        method: 'POST',
        data: {
          carId: payload
        }
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Add To Cart',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCart')
        }).catch(({ response }) => {
          Swal.fire('Error!', response.data, 'error');
        });
    },
    removeCart(context, payload) {
      axios({
        url: `${baseUrl}/rentalCars/${payload}`,
        method: 'DELETE',
      })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success Remove Car From Your Cart',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('findAllCart')
        })
        .catch(({ response }) => {
          Swal.fire('Error!', response.data.message, 'error');
        })
    }
  },
  modules: {
  }
})
