<template>
  <div class="columns">
    <div class="column">
      <img v-bind:src="kittenImagePath(kittenId1)" />
      <a class="button is-primary is-large" v-on:click="$emit('winner', kittenId1)">Kitten A</a>
    </div>

    <div class="column">
      <img v-bind:src="kittenImagePath(kittenId2)" />
      <a class="button is-primary is-large" v-on:click="$emit('winner', kittenId2)">Kitten B</a>
    </div>  
  </div>
</template>

<script>
export default {
  name: "KittenComparator",
  props: {
    kittenId1: Number,
    kittenId2: Number
  },
  methods: {
    kittenImagePath(kittenId) {
      // TODO: handle null values
      return kittenId ? require(`../assets/kitten${kittenId}.jpg`) : 1;
    }
  }
};
</script>
