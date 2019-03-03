import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL = "https://auth-vuejs-example.firebaseio.com";
axios.defaults.headers.get["Accepts"] = "application/json";

import router from "./router";
import store from "./store";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
