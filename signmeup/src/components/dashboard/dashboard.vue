
<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Your Email Address {{email}}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: ""
    };
  },
  created() {
    axios
      .get("users.json")
      .then(res => {
        // console.log(res)
        const users = [];
        const data = res.data;
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        this.email = users[0].email;
      })
      .catch(error => console.log(error));
  }
};
</script>


<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>