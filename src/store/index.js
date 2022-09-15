import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
  },
  getters: {},
  mutations: {
    addtocart(state, payload) {
      state.cart.push(payload);
    },
  },
  actions: {},
  modules: {},
});
