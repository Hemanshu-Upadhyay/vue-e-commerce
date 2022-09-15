<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div class="col-md-4" v-for="product in products">
          <div class="card product-item">
            <div v-for="(image, index) in product.images">
              <img :src="image" class="card-img-top" alt="..." width="250px" />
            </div>

            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.name }}</h5>
                <h5 class="card-priceS">{{ product.price }} $</h5>
                <div></div>
              </div>
              <strong>Description</strong>
              <p class="">{{ product.description }}</p>
              <AddtoCart
                :image="getImage(product.images)"
                :p-id="product.id"
                :price="product.price"
                :name="product.name"
              >
              </AddtoCart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/Firebase";
import { Carousel, Slide } from "vue-carousel";
import AddtoCart from "../src/components/AddtoCart.vue";
export default {
  name: "ProductsList",
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
    };
  },
  components: {
    Carousel,
    Slide,
    AddtoCart,
    AddtoCart,
  },
  methods: {
    currencyFormat(num) {
      let number = Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      return number;
    },
    getImage(images) {
      return images[0];
    },
  },
  created() {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.products.push(doc.data());
          // Get id of document
          this.products[this.products.length - 1].id = doc.id;
          console.log(doc.id, " => ", doc.data());
        });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
</style>
