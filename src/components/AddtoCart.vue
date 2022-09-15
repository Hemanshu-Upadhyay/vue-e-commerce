<template>
  <div class="add-to-cart">
    <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
  </div>
  <div
    class="modal fade"
    id="addtocart"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label"
                >Items in Your bag</label
              >

              <ul>
                <li v-for="item in this.$store.state.cart" :key="item.id">
                  <!-- Add small image of the product -->
                  <img :src="item.productImage"  class="image align-self-center mr-3 h-2 w-4" >
                  <div class="media-body">
                        <h6 class="mt-0">{{item.productName}}</h6>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="close"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Continue Shopping
          </button>
          <button type="button" class="btn btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String,
  },
  data() {
    return {
      item: {
        productName: this.name,
        productImage: this.image,
        productPrice: this.price,
        productId: this.pId,
        productQuantity: 1,
      },
    };
  },
  methods: {
    close() {
      $("#addtocart").modal("hide");
    },
    addToCart() {
      $("#addtocart").modal("show");
      this.$store.commit("addtocart", this.item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .image{
    width: 100px;
    height: 90px;

  }
</style>
