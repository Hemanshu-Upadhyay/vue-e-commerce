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
          this.$router.replace("admin");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    register() {
      fb.auth()
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
          this.$router.replace("admin");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
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
