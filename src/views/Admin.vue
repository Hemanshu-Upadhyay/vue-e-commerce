<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a
        id="show-sidebar"
        @click="closeMenu"
        class="btn btn-sm btn-dark"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">Vue Shop</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name"
                >{{ name }}
                <strong></strong>
              </span>
              <span class="user-role"> {{ email }} </span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-search  -->
          <div class="sidebar-item sidebar-search">
            <div></div>
          </div>
          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li>
                <router-link to="/admin/overview">
                  <i class="fa fa-chart-line"></i>
                  <span>Overview</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/products">
                  <i class="fab fa-amazon"></i>
                  <span>Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>

              <li>
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import { fb, getAuth, db } from "@/Firebase";
export default {
  name: "Admin",
  data() {
    return {
      name: null,
      email: null,
    };
  },
  components: {
    Hero,
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  created() {
    // Get the name of the user from the database

    const user = getAuth().currentUser;
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("profiles")
          .doc(getAuth().currentUser.uid)
          .get()
          .then((doc) => {
            this.name = doc.data().name;
          });
        this.email = user.email;
      } else {
        this.$router.push("/login");
      }
    });
  },
};
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
}
</style>
