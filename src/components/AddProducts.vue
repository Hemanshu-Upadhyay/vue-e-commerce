<template>
  <div class="products">
    <h3>Add Products</h3>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Name</label>
      <input
        type="name"
        v-model="product.name"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter Product name"
      />
      <label for="exampleFormControlInput1" class="form-label"
        >Description</label
      >
      <textarea
        class="form-control"
        v-model="product.description"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
      <label for="exampleFormControlInput1" class="form-label">Price</label>
      <input
        type="Price"
        v-model="product.price"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter Product Price"
      />
      <label for="exampleFormControlInput1" class="form-label">Tags</label>
      <input
        type="tags"
        v-model="tags"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter Product Tags"
      />
      <label class="form-label" for="customFile"
        >Upload the image for the product</label
      >
      <input
        @change="uploadimage"
        type="file"
        class="form-control"
        id="customFile"
      />
    </div>
    <div class="form-group d-flex">
      <div class="p-1" v-for="(image, index) in product.images">
        <div class="h-100 w-100">
          <img :src="image" alt="" />
          <span class="delete-img" @click="deleteImage(image, index)">X</span>
        </div>
      </div>
    </div>

    <!-- <div class="form-group">
      <label for="product_image">Product Images</label>
      <input type="file" @change="uploadImage" class="form-control" />
    </div> -->
    <button @click="addProduct()" type="button" class="mt-3 btn btn-primary">
      Add Product
    </button>
    <div class="mb-3"></div>
  </div>

  <!-- Create Product Table -->

  <!-- Create Modal for Updating Product -->
</template>

<script>
import Swal from "sweetalert2";
import { fb, db } from "../Firebase";
export default {
  name: "Products",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      },
      activeItem: null,
      modal: null,
      tag: null,
    };
  },
  methods: {
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image.delete().then(() => {
        Swal.fire({
          icon: "success",
          title: "Image Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    uploadimage(e) {
      if (e.target.files.length > 0) {
        let file = e.target.files[0];
        let storageRef = fb.storage().ref("products/" + file.name);
        storageRef.put(file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            this.product.images.push(url);
          });
        });
      }
    },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      };
    },
    addtag() {
      console.log("addtag");
      this.product.tags.push(this.tag);
      this.tag = null;
    },
    readData() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push(doc);
          });
          console.log(this.products);
        });
    },
    addProduct() {
      db.collection("products")
        .add(this.product)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
          this.reset();
          this.$router.push("/admin/products");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      Swal.fire({
        icon: "success",
        title: "Product Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  created() {
    this.readData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .img-wrapp {
//   position: relative;
// }
// .img-wrapp span.delete-img {
//   position: absolute;
//   top: -14px;
//   left: -2px;
// }
// .img-wrapp span.delete-img:hover {
//   cursor: pointer;
// }
</style>
