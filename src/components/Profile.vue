<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Profile settings</h3>

            <p>Change your profile settings here</p>
          </div>
          <div class="col-md-5">
            <img
              src="../../public/img/Product.svg"
              width="300"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 profile-content">
        <h1>See or update your profile settings here</h1>
        Hi <strong>{{ profile.name }}</strong> Here You can add/change your
        profile settings
        <div class="m-2 tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group mb-2">
                    <input
                      type="text"
                      name=""
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="profile.phone"
                      placeholder="Enter Your Phone Number"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group mt-2">
                    <textarea
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>

                <div class="col-md-4 mt-2">
                  <div class="form-group">
                    <input
                      type="submit"
                      @click="updateProfile"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                    />
                  </div>
                </div>
              </div>
              <button
                @click="resetPassword"
                class="col-md-4 mt-2 btn btn-success"
              >
                Reset Password With Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { fb, db } from "../Firebase";
export default {
  name: "Profile",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      profile: {
        name: null,
        email: null,
        address: null,
        phone: null,
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
      },
    };
  },
  methods: {
    resetPassword() {
      const auth = fb.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Email sent",
            text: `Email sent to ${auth.currentUser.email} to reset password With instructions`,
            timer: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProfile() {
      const user = fb.auth().currentUser;
      user
        .updateProfile({
          displayName: this.profile.name,
        })
        .then(() => {
          db.collection("profiles")
            .doc(user.uid.toString())
            .set({
              name: this.profile.name,
              phone: this.profile.phone,
              address: this.profile.address,
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Profile Updated",
              });
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    const user = fb.auth().currentUser;
    this.profile.email = user.email;
    db.collection("profiles")
      .doc(user.uid)
      .get()
      .then((doc) => {
        this.profile = doc.data();
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
