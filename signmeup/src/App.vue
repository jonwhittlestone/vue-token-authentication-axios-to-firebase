<template>
  <div id="app">
    <app-header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
export default {
  name: "app",
  components: {
    "app-header": Header
  },
  created() {
    // auto check if user is logged in when app starts
    this.$store.dispatch("tryAutoLogin");
  }
};

/* 
  1. Axios: POSTing and GETting user in signup/dashboard to/from 
    firebase with Axios (specifying baseURL/customised axios instance)

  2. Firebase Auth: Sign-up, sign-in initiating action in Vuex store,
    token-storage and Protecting routes with `beforeEnter` route guard

  3. Auth Quality of Life: UI sugar, log out and auto-login to persist a valid token
    accross page reloads
*/
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
