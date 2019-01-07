<template>
  <div class="columns">
    <div class="column">
      <img v-bind:src="imagePath(opponentId1)" />
      <a v-if="opponentId1" class="button is-primary is-large" v-on:click="$emit('winner', opponentId1)">Opponent A</a>
    </div>

    <div class="column">
      <img v-bind:src="imagePath(opponentId2)" />
      <a v-if="opponentId2" class="button is-primary is-large" v-on:click="$emit('winner', opponentId2)">Opponent B</a>
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
      if (opponentId) {
        return require(`../assets/kitten${opponentId}.jpg`);
      } else {
        return require(`../assets/loading.jpg`);
      }
    }
  }
};
</script>
