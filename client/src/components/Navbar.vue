<template>
  <div>
    <div class="row">
      <div class="grad-bar"></div>
      <div id="top-header">
        <div class="container">
          <div class="header-links pull-left">
            <div class="header-top">
              <router-link to="/" class="col">
                <img
                  src="https://pngimage.net/wp-content/uploads/2018/05/car-rental-logo-png-6.png"
                  style="height:25px; width:70px; margin-right:5vh"
                  alt="Company Logo"
                />
              </router-link>
              <button
                class="btn btn-dark"
                data-toggle="modal"
                data-target="#formCreateCar"
                style="font-family: monospace;"
              >Add Car</button>
            </div>
          </div>
          <div class="header-links pull-right">
            <div class="header-top">
              <router-link
                class="header-cart header-cool"
                style="text-decoration: none; font-family: monospace;"
                to="/cart"
              >
                <button>Cart</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FormAdd />
  </div>
</template>

<script>
import FormAdd from "@/components/FormAddCar";
export default {
  components: {
    FormAdd
  }
};
</script>

<style lang="scss" scoped>
.row {
  margin-right: 0px !important;
}
.container {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding: 8px;
}
.header-cool {
  color: #000000b7;
}
.header-cool:hover {
  color: #462b15;
}
.header-top {
  margin: 0 15px 0 15px;
  margin-top: 0.1%;
}
#top-header {
  top: 0;
  width: 100%;
  background-color: #726c6c;
}
.pull-left {
  float: left !important;
  display: flex;
}
.pull-right {
  float: right !important;
  display: flex;
}
.cart-cool {
  color: #ff7300;
  font-size: 155%;
  margin-top: -1%;
}
.cart-cool:hover {
  color: #ff820d;
}

cart .header-cart {
  font-size: 100%;
  outline: none;
  font-family: monospace;
}

.grad-bar {
  width: 100%;
  height: 5px;
  background: linear-gradient(-45deg, #52ee86, #e73cde, #c3d523, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: gradbar 5s ease infinite;
  -moz-animation: gradbar 5s ease infinite;
  animation: gradbar 5s ease infinite;
}

/* NAVIGATION */

.Navbar img {
  height: 16px;
  width: auto;
  justify-self: start;
  margin-left: 20px;
}

/* KEYFRAME ANIMATIONS */

@-webkit-keyframes gradbar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes gradbar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradbar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>