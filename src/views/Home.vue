<template>
  <Navbar />
  <Hero />
  <Products />
  <br />
  <router-view />
  <div class="home">
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img
            src="https://raw.githubusercontent.com/Hujjat/vue-shop/3282a394fa4c70a2eb8c7b57d6a1629fa5990f51/public/img/svg/product.svg"
            alt=""
            width="400"
          />
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam
            reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum,
            voluptas exercitationem ratione consectetur et!
          </p>
          <button class="btn custom-btn btn-outline-primary mr-4">
            Browse Products
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "../components/Hero.vue";
import Products from "../../Sections/Products.vue";
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Products,
    Navbar,
    Login,
  },
};
</script>

<style></style>
