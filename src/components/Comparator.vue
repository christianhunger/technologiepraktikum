<template>
  <div class="columns">
    <div class="column">
      <img v-bind:src="imageUrl1" />
      <a v-if="id1" class="button is-primary is-large" v-on:click="$emit('winner', id1)">Opponent A</a>
    </div>

    <div class="column">
      <img v-bind:src="imageUrl2" />
      <a v-if="id2" class="button is-primary is-large" v-on:click="$emit('winner', id2)">Opponent B</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comparator",
  props: {
    id1: Number,
    id2: Number,
    imageUrl1: String,
    imageUrl2: String
  }
};
</script>
