<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup page</h3>
          <hr />
        </div>
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            v-model.trim="name"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            v-model="email"
            class="form-control"
            v-model.trim="email"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            v-model.trim="password"
          />
        </div>

        <div class="my-3">
          <button type="submit" class="btn btn-primary" @click="register()">
            Register
          </button>
        </div>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { fb, db } from "../Firebase";
export default {
  name: "Signup",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    register() {
      fb.auth()
        // Also send the name to the database
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.name,
            })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
          Swal.fire({
            icon: "success",
            title: "Signup Succssfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.replace("login");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            Swal.fire({
              icon: "error",
              title: errorMessage,
              showConfirmButton: true,
              timer: 2000,
            });
          }
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.row {
  margin-top: 100px;
}
</style>
