import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";
import router from "./router";

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
    },

    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    tryAutoLogin({ commit }) {
      // see if I have a valid token in local storage
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();

      if (now >= expirationDate) {
        return;
      }

      // if we get here, we have a valid token
      const userId = localStorage.getItem("userId");
      commit("authUser", {
        token: token,
        userId: userId
      });
    },

    setLogoutTimer({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch("logout");
      }, expirationTime * 1000);
    },

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

          // store token and date for auto login across page refreshes
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          // store the user in firebase and set the timer to auto-logout when token expires
          dispatch("storeUser", authData);
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .then(error => console.log(error));
    },

    login({ commit, dispatch }, authData) {
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

          // store token and date for auto login across page refreshes
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .then(error => console.log(error));
    },

    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/signin");
    },

    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .post("/users.json?auth=" + state.idToken, userData)
        .then(res => console.log(res))
        .then(res => console.log(res));
    },

    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }

      globalAxios
        .get("/users.json?auth=" + state.idToken)
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
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});
