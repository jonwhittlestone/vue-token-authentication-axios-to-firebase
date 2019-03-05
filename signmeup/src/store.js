import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";

// used for storing and fetching user data
import globalAxios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },

    storeUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      // for firebase auth, see: https://goo.gl/1Np5jq
      axios
        .post("/signupNewUser?key=AIzaSyBGRDAbyWHxC-CmViIpAx_VXxM2rnIOzrY", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch("storeUser", authData);
        })
        .then(error => console.log(error));
    },

    login({ commit }, authData) {
      axios
        .post("/verifyPassword?key=AIzaSyBGRDAbyWHxC-CmViIpAx_VXxM2rnIOzrY", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
        .then(error => console.log(error));
    },

    storeUser({ commit }, userData) {
      globalAxios
        .post("/users.json", userData)
        .then(res => console.log(res))
        .then(res => console.log(res));
    },

    fetchUser({ commit }) {
      globalAxios
        .get("/users.json")
        .then(res => {
          // console.log(res)
          const users = [];
          const data = res.data;
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          commit("storeUser", users[0]);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
});
