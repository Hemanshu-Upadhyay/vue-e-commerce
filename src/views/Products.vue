<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="../../public/img/Product.svg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />
    </div>
    <!-- <div class="form-group">
      <label for="product_image">Product Images</label>
      <input type="file" @change="uploadImage" class="form-control" />
    </div> -->
    <router-link
      to="/admin/addproducts"
      type="button"
      class="mt-3 btn btn-primary"
      >Add Product</router-link
    >
    <div class="mb-3"></div>
  </div>

  <!-- Create Product Table -->
  <!-- Put a condition To show No Products when there is No Products -->
  <div class="container">
    <h3>Product List</h3>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Tags</th>
              <th scope="col">Update Product</th>
              <th scope="col">Delete Product</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.data().name }}</td>
              <td>{{ product.data().description }}</td>
              <td>{{ product.data().price }}</td>
              <td>{{ product.data().tags }}</td>
              <td>
                <button
                  @click="openModal(product)"
                  type="button"
                  class="btn btn-success"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  @click="deleteProduct(product.id)"
                  type="button"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Create Modal for Updating Product -->
  <div
    class="modal fade"
    id="updateProductModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Product</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Name</label
            >
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
            <label for="exampleFormControlInput1" class="form-label"
              >Price</label
            >
            <input
              type="Price"
              v-model="product.price"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Product Price"
            />
            <label for="exampleFormControlInput1" class="form-label"
              >Tags</label
            >
            <input
              type="tags"
              v-model="product.tags"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Product Tags"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            onclick="reset()"
          >
            Close
          </button>
          <button
            @click="updateProduct()"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";
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
    openModal(product) {
      this.product = product.data();
      this.activeItem = product;
      this.modal = new bootstrap.Modal(
        document.getElementById("updateProductModal"),
        {
          keyboard: false,
        }
      );
      this.modal.show();
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
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
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem.id)
        .update(this.product)
        .then(() => {
          this.reset();
          this.modal.hide();
          window.location.reload();
        });
    },
    readData() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push(doc);
          });
        });
    },
    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection("products")
            .doc(doc)
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
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
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>
