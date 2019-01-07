<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <KittenComparator :kittenId1="this.opponentIds.firstId" :kittenId2="this.opponentIds.secondId" v-on:winner="handleRoundResult"/>
    <h2 class="subtitle" style="margin-bottom: 6px">The Current Rating:</h2>
    <KittenRankingStrip :kittensSortedByRating="allKittensSortedByTheirRating"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import KittenComparator from "@/components/KittenComparator.vue";
import KittenRankingStrip from "@/components/KittenRankingStrip.vue";
import { twoDifferentRandomIdsInRange } from "@/util/IdGeneratorUtil.js";

export default {
  name: "home",
  components: {
    KittenComparator,
    KittenRankingStrip
  },
  data() {
    return {
      opponentIds: twoDifferentRandomIdsInRange(1, 10)
    };
  },
  computed: {
    ...mapGetters(["allKittensSortedByTheirRating"])
  },
  ready() {
    this.startNextRound();
  },
  methods: {
    handleRoundResult(winnerId) {
      const firstId = this.opponentIds.firstId;
      const secondId = this.opponentIds.secondId;

      this.$store.commit("updateRating", { firstId, secondId, winnerId });
      this.startNextRound();
    },
    startNextRound() {
      this.opponentIds = twoDifferentRandomIdsInRange(1, 10);
    }
  }
};
</script>
