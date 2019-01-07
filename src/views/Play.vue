<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <KittenComparator :kittenId1="this.kittenId1" :kittenId2="this.kittenId2" v-on:winner="handleRoundResult"/>
    <h2 class="subtitle" style="margin-bottom: 6px">The Current Rating:</h2>
    <KittenRankingStrip :kittensSortedByRating="allKittensSortedByTheirRating"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import KittenComparator from "@/components/KittenComparator.vue";
import KittenRankingStrip from "@/components/KittenRankingStrip.vue";

export default {
  name: "home",
  components: {
    KittenComparator,
    KittenRankingStrip
  },
  data() {
    return {
      kittenId1: this.randomIntInRange(1, 10),
      kittenId2: this.randomIntInRange(1, 10)
    };
  },
  computed: {
    ...mapGetters(["allKittensSortedByTheirRating"])
  },
  ready() {
    this.startNextRound();
  },
  methods: {
    randomIntInRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      const result = Math.floor(Math.random() * (max - min)) + min;
      return result;
    },
    handleRoundResult(winnerId) {
      const kittenId1 = this.kittenId1;
      const kittenId2 = this.kittenId2;
      this.$store.commit("updateRating", { kittenId1, kittenId2, winnerId });
      this.startNextRound();
    },
    startNextRound() {
      this.kittenId1 = this.randomIntInRange(1, 10);
      this.kittenId2 = this.randomIntInRange(1, 10);
    }
  }
};
</script>
