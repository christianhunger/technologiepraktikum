<template>
  <div id="app">
    Clicks: {{ counter }}
    <button @click="clickedHandler">++</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    clickedHandler() {
      this.counter++;
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
</style>
