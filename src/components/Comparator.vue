<template>
  <div class="columns">
    <div class="column">
      <img v-bind:src="imagePath(opponentId1)" />
      <a class="button is-primary is-large" v-on:click="$emit('winner', opponentId1)">Opponent A</a>
    </div>

    <div class="column">
      <img v-bind:src="imagePath(opponentId2)" />
      <a class="button is-primary is-large" v-on:click="$emit('winner', opponentId2)">Opponent B</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comparator",
  props: {
    opponentId1: Number,
    opponentId2: Number
  },
  methods: {
    imagePath(opponentId) {
      // TODO: handle null values
      return opponentId ? require(`../assets/kitten${opponentId}.jpg`) : 1;
    }
  }
};
</script>
