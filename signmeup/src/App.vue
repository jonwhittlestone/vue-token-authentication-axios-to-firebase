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
  }
};

/* 
  1. Axios: POSTing and GETting user in signup/dashboard to/from 
    firebase with Axios (specifying baseURL/customised axios instance)

  2. Firebase Auth: Sign-up, sign-in initiating action in Vuex store,
    token-storage and Protecting routes with `beforeEnter` route guard
*/
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
