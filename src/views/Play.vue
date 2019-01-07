<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <Comparator :opponentId1="this.opponentIds.firstId" :opponentId2="this.opponentIds.secondId" v-on:winner="handleRoundResult"/>
    <h2 class="subtitle" style="margin-bottom: 6px">The Current Rating:</h2>
    <RankingStrip :opponentsSortedByRating="allOpponentsSortedByTheirRating"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import Comparator from "@/components/Comparator.vue";
import RankingStrip from "@/components/RankingStrip.vue";
import { twoDifferentRandomIdsInRange } from "@/util/IdGeneratorUtil.js";

export default {
  name: "home",
  components: {
    Comparator,
    RankingStrip
  },
  data() {
    return {
      opponentIds: twoDifferentRandomIdsInRange(1, 10)
    };
  },
  computed: {
    ...mapGetters(["allOpponentsSortedByTheirRating"])
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
