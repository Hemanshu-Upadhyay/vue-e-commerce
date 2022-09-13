import { createApp, Vue } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/app.scss";
import "popper.js";
import jQuery from "jquery";
import { fb } from "./Firebase";
window.$ = window.jQuery = jQuery;
require("firebase/firestore");
import swal from "sweetalert2";

window.Swal = swal;

let app;
fb.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
  // if (user) {
  //   store.dispatch("fetchUserProfile", user);
  // }
});

// createApp(App).use(store).use(router).mount("#app");
