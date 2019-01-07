<template>
  <ul class="rankingStrip">
    <li class="rankingStripOpponentWrapper" v-for="opponent in opponentsSortedByRating" :key="opponent.name">
      <img class="rankingStripOpponentImage" :src="require(`../assets/kitten${opponent.id}.jpg`)" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RankingStrip",
  props: {
    opponentsSortedByRating: Array
  }
};
</script>

<style scoped>
.rankingStripOpponentWrapper {
  display: inline-block;
}
.rankingStripOpponentImage {
  width: 64px;
  padding: 1px;
  transition: width 0.2s;
}
.rankingStripOpponentImage:hover {
  width: 100px;
  transition: width 0.1s;
}
</style>
