<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Play</router-link> |
      <router-link to="/leaderboard">Leaderboard</router-link>
    </div>
    <img src="logo.png" width="64"/>
    <router-view :currentContenders="kittens" @updateRating="handleUpdateRating"/>
  </div>
</template>

<script>
import { kittens } from "./util/KittenTestdata.js";
import { updateRating } from "./util/contenders";

export default {
  name: "App",
  data() {
    return {
      kittens
    };
  },
  methods: {
    handleUpdateRating(roundResult) {
      // create a new list of rated kittens based on the old kitten array and the round result
      this.kittens = updateRating(this.kittens, roundResult);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
