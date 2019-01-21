<template>
    <div id="app">
        <img src="logo.png" width="64"/>
        <div class="columns">
            <div class="column">
                A
            </div>

            <div class="column">
                B
            </div>
        </div>
    </div>
</template>

<script>
import { kittens } from "@/util/KittenTestdata.js";

export default {
  name: "App",
  components: {
    // Comparator
  },
  data() {
    return {
      currentContenders: kittens
    };
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
</style>
