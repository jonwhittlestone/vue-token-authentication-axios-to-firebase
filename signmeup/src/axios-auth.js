import axios from "axios";

const instance = axios.create({
  baseURL: "https://auth-vuejs-example.firebaseio.com"
});

instance.defaults.headers.common["SOMETHING"] = "something";

export default instance;
