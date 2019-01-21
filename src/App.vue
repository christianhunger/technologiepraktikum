<template>
  <div id="app">
    <img src="logo.png" width="64"/>
    <play-component/>
  </div>
</template>

<script>
import PlayComponent from "@/views/Play";

export default {
  name: "App",
  components: {
    PlayComponent
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
