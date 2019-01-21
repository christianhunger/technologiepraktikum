<template>
  <div class="about">
    <h1 class="title">Leaderbord</h1>
    <h2 class="subtitle">The Current Kitten Ranking</h2>

    <ul id="leaderboard">
      <li v-for="contender in allContendersSortedByTheirRating" :key="contender.name" class="leaderboard-entry">
        <img :width="imageWidthBasedOnRanking(contender.rating)" :src="contender.imageUrl" />
        <h2 class="subtitle">{{ contender.name }}</h2>
        Rating: {{ contender.rating }}
      </li>
    </ul>
  </div>
</template>

<script>
import { sortContendersByTheirRating } from "@/util/contenders";

export default {
  name: "leaderboard",
  computed: {
    allContendersSortedByTheirRating() {
      return sortContendersByTheirRating(this.currentContenders);
    }
  },
  methods: {
    imageWidthBasedOnRanking(rating) {
      const scalingFactor = 1 + (rating - 1000) / 160;
      return Math.floor(512 * scalingFactor);
    }
  },
  props: {
    currentContenders: Object
  }
};
</script>

<style scoped>
.leaderboard-entry {
  padding-bottom: 16px;
}
</style>
