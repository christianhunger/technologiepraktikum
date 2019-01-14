<template>
  <ul class="rankingStrip">
    <li class="rankingStripContenderWrapper" v-for="contender in contendersSortedByRating" :key="contender.name">
      <img class="rankingStripContenderImage" :src="contender.imageUrl" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RankingStrip",
  props: {
    contendersSortedByRating: Array
  }
};
</script>

<style scoped>
.rankingStripContenderWrapper {
  display: inline-block;
}
.rankingStripContenderImage {
  width: 64px;
  padding: 1px;
  transition: width 0.2s;
}
.rankingStripContenderImage:hover {
  width: 100px;
  transition: width 0.1s;
}
</style>
