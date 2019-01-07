<template>
  <ul class="kittenRankingStrip">
    <li v-for="kitten in kittensSortedByRating" :key="kitten.name" style="display: inline-block">
      <img class="kittenRankingStripImage" :src="require(`../assets/kitten${kitten.id}.jpg`)" />
    </li> 
  </ul>  
</template>

<script>
export default {
  name: "KittenRankingStrip",
  props: {
    kittensSortedByRating: Array
  }
};
</script>

<style scoped>
.kittenRankingStripImage {
  width: 64px;
  padding: 1px;
  transition: width 0.2s;
}
.kittenRankingStripImage:hover {
  width: 100px;
  transition: width 0.1s;
}
</style>
