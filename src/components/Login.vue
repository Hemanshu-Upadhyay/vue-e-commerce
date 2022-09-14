<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            v-model="email"
            class="form-control"
            v-model.trim="email"
            required
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            v-model.trim="password"
            required
          />
        </div>

        <div class="my-3">
          <button type="submit" class="btn btn-primary" @click="login()">
            Login
          </button>
        </div>
        Don't have an account?
        <router-link to="/signup">Sign Up!</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { fb, db } from "../Firebase";
export default {
  name: "Login",
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
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Signin Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.replace("admin");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            Swal.fire({
              icon: "error",
              title: "Wrong Password, Please Try Again",
              showConfirmButton: true,
              timer: 2000,
            });
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
