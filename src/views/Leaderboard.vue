<template>
  <div class="about">
    <h1 class="title">Leaderbord</h1>
    <h2 class="subtitle">The Current Kitten Ranking</h2>

    <ul id="leaderbord">
      <li v-for="opponent in allOpponentsSortedByTheirRating" :key="opponent.name" style="padding-bottom: 16px">
        <img :width="imageWidthBasedOnRanking(opponent.rating)" :src="opponent.imageUrl" />
        <h2 class="subtitle">{{ opponent.name }}</h2>
        Rating: {{ opponent.rating }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "leaderbord",
  computed: {
    ...mapGetters(["allOpponentsSortedByTheirRating"])
  },
  methods: {
    imageWidthBasedOnRanking(rating) {
      const scalingFactor = 1 + (rating - 1000) / 160;
      return Math.floor(512 * scalingFactor);
    }
  }
};
</script>
