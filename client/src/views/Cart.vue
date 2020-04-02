<template>
  <div class="container">
    <div class="card shopping-cart">
      <div class="card-header bg-dark text-light">
        <div class="row">
          <div class="col-2">Picture</div>
          <div class="col-5">Description</div>
          <div class="col-3">Price</div>
          <div class="col-1">Day</div>
        </div>
      </div>
      <div class="card-body">
        <div class="row" v-for="(cart, index) in allCarts" :key="index">
          <div class="col-12 col-sm-12 col-md-2 text-center">
            <img
              src="https://pngimage.net/wp-content/uploads/2018/06/vektor-mobil-png-3.png"
              class="img-responsive"
              alt="prewiew"
              width="120"
              height="80"
            />
          </div>
          <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
            <h4 class="cart-name">
              <strong>{{cart.Car.brand}}</strong>
            </h4>
            <h4>
              <small>{{`year Car : ${cart.Car.carYear}, Lisence Plate: ${cart.Car.licensePlate}`}}</small>
            </h4>
          </div>
          <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
              <h6>
                <strong>
                  Rp. {{(cart.Car.rentPrice*cart.duration).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}
                  <span
                    class="text-muted"
                  >x</span>
                </strong>
              </h6>
            </div>
            <div class="col-4 col-sm-4 col-md-4">
              <div class="quantity">
                <input @click="plus(cart.id, cart.duration)" type="button" value="+" class="plus" />
                <input
                  type="number"
                  min="1"
                  v-model="cart.duration"
                  title="Qty"
                  class="qty"
                  disabled
                />
                <input @click="minus(cart.id, cart.duration)" type="button" value="-" class="minus" />
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-2 text-right">
              <button @click="removeRentCar(cart.id)" class="btn-remove">remove</button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div class="card-footer">
        <div class="col">
          <div
            style="margin: 5px;margin-left: 35%;"
            v-if="discount === 'No Discount'"
          >{{myDiscount}} Discount: {{discount}}</div>
          <div
            style="margin: 5px;margin-left: 35%;"
            v-if="discount !== 'No Discount'"
          >{{myDiscount}} Discount: {{discount}}%</div>
        </div>
        <div class="col">
          <div style="margin: 5px;margin-left: 35%;">
            Subtotal :
            <b>Rp.{{(myTotalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</b>
          </div>
          <div style="margin: 5px;margin-left: 35%;" v-if="discount === 'No Discount'">
            Discount :
            <b style="color:red">Rp. -</b>
          </div>
          <div style="margin: 5px;margin-left: 35%;" v-if="discount !== 'No Discount'">
            Discount :
            <b
              style="color:red"
            >Rp. {{(Math.floor(myTotalPrice*(discount/100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</b>
          </div>
          <div style="margin: 5px; margin-left: 35%;" v-if="discount !== 'No Discount'">
            Total price :
            <b>Rp.{{(myTotalPrice-(myTotalPrice*(discount/100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</b>
          </div>
          <div style="margin: 5px; margin-left: 35%;" v-if="discount === 'No Discount'">
            Total price :
            <b>Rp.{{(myTotalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      discount: "No Discount",
      priceRentCar: null,
      myTotalPrice: null
    };
  },
  computed: {
    allCarts() {
      return this.$store.state.carts;
    },
    myDiscount() {
      return this.checkDiscount();
    }
  },
  created() {
    this.findAllMyCart();
  },
  methods: {
    findAllMyCart() {
      axios({
        url: `http://localhost:3000/rentalCars`,
        method: "GET"
      })
        .then(({ data }) => {
          this.priceRentCar = 0;
          this.myTotalPrice = 0;
          const carts = data;
          carts.forEach(el => {
            this.priceRentCar = el.duration * el.Car.rentPrice;
            this.myTotalPrice += this.priceRentCar;
          });
        })
        .catch(({ response }) => {
          Swal.fire("Error!", response.data.message, "error");
        });
    },
    checkDiscount() {
      const carts = this.$store.state.carts;
      if (carts.length >= 2) {
        this.discount = 10;
      } else if (carts.length) {
        carts.forEach(rent => {
          if (rent.Car.carYear < 2010) {
            this.discount = 7;
          } else if (rent.duration >= 3) {
            this.discount = 5;
          } else {
            this.discount = "No Discount";
          }
        });
      } else {
        this.discount = "No Discount";
      }
    },
    removeRentCar(id) {
      axios({
        url: `http://localhost:3000/rentalCars/${id}`,
        method: "DELETE"
      })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success Remove Car From Your Cart",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("findAllCart");
          this.findAllMyCart();
        })
        .catch(({ response }) => {
          Swal.fire("Error!", response.data.message, "error");
        });
    },
    plus(id, day) {
      axios({
        url: `http://localhost:3000/rentalCars/${id}`,
        method: "PUT",
        data: {
          duration: (day += 1)
        }
      })
        .then(() => {
          this.$store.dispatch("findAllCart");
          this.findAllMyCart();
        })
        .catch(({ response }) => {
          Swal.fire("Error!", response.data, "error");
        });
    },
    minus(id, day) {
      axios({
        url: `http://localhost:3000/rentalCars/${id}`,
        method: "PUT",
        data: {
          duration: (day -= 1)
        }
      })
        .then(() => {
          this.$store.dispatch("findAllCart");
          this.findAllMyCart();
        })
        .catch(({ response }) => {
          Swal.fire("Error!", response.data, "error");
        });
    }
  }
};
</script>

<style scoped>
.pull-right {
  display: flex;
  flex-direction: column-reverse;
}
.quantity {
  float: left;
  margin-right: 15px;
  background-color: #eee;
  position: relative;
  width: 80px;
  overflow: hidden;
}

.quantity input {
  margin: 0;
  text-align: center;
  width: 15px;
  height: 15px;
  padding: 0;
  float: right;
  color: #000;
  font-size: 20px;
  border: 0;
  outline: 0;
  background-color: #f6f6f6;
}

.quantity input.qty {
  position: relative;
  border: 0;
  width: 100%;
  height: 40px;
  padding: 10px 25px 10px 10px;
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  border-radius: 0;
  background-clip: padding-box;
}

.quantity .minus,
.quantity .plus {
  line-height: 0;
  background-clip: padding-box;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  color: #bbb;
  font-size: 20px;
  position: absolute;
  height: 50%;
  border: 0;
  right: 0;
  padding: 0;
  width: 25px;
  z-index: 3;
}

.quantity .minus:hover,
.quantity .plus:hover {
  background-color: #dad8da;
}

.quantity .minus {
  bottom: 0;
}
.shopping-cart {
  margin-top: 20px;
}
.card-footer {
  display: flex;
  justify-content: space-between;
}
</style>