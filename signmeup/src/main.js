import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL = "https://auth-vuejs-example.firebaseio.com";

// manipulate the config?
const reqInterceptor = axios.interceptors.request.use(config => {
  console.log("Request Interceptor", config);
  return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
  console.log("Response Interceptor", res);
  return res;
});

// Remove the interceptors - so no console.logs
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

import router from "./router";
import store from "./store";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
