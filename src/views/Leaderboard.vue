<template>
  <div class="about">
    <h1 class="title">Leaderboard</h1>
    <h2 class="subtitle">The Current Ranking</h2>

    <ul id="leaderboard">
      <transition-group name="flip-list" tag="ul">
        <li v-for="contender in allContendersSortedByTheirRating" :key="contender.name" class="leaderboard-entry">
          <img :width="imageWidthBasedOnRanking(contender.rating)" :src="contender.imageUrl" />
          <h2 class="subtitle">{{ contender.name }}</h2>
          Rating: {{ contender.rating }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "leaderboard",
  computed: {
    ...mapGetters(["allContendersSortedByTheirRating"])
  },
  methods: {
    imageWidthBasedOnRanking(rating) {
      const scalingFactor = 1 + (rating - 1000) / 160;
      return Math.floor(512 * scalingFactor);
    }
  }
};
</script>

<style scoped>
.leaderboard-entry {
  padding-bottom: 16px;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
